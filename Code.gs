const SHEET_NAME = 'Orders'; 
const EXPECTED_SECRET = 'my_custom_secret_brunchmunch123'; // Must match frontend VITE_APPS_SCRIPT_SECRET

function doPost(e) {
  const lock = LockService.getScriptLock();
  // Wait for up to 30 seconds for other processes to finish.
  if (lock.tryLock(30000)) {
    try {
      const output = handleRequest(e);
      return output;
    } catch (err) {
      Logger.log('Error in doPost: ' + err.message);
      return jsonResponse({ success: false, error: err.message });
    } finally {
      lock.releaseLock();
    }
  } else {
    return jsonResponse({ success: false, error: 'Server is busy, please try again.' }, 503);
  }
}

function handleRequest(e) {
  const raw = e.postData?.contents || '{}';
  const payload = JSON.parse(raw);

  // Validate secret
  if (EXPECTED_SECRET && payload.secret !== EXPECTED_SECRET) {
    return jsonResponse({ success: false, error: 'Invalid secret' }, 403);
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Add headers - Structure for Robustness
    const headers = [
      'Order ID',          // Column A: Unique PK
      'Timestamp',         // Column B
      'Status',            // Column C
      'Customer Name',     // Column D
      'Phone',             // Column E
      'Address / Location',// Column F
      'GPS Coordinates',   // Column G: Combined Lat,Lng
      'Delivery Date',     // Column H
      'Delivery Time',     // Column I
      'Items Ordered',     // Column J: Human readable string
      'Special Requests',  // Column K
      'Delivery Method',   // Column L: Pickup or Delivery
      'Total Amount',      // Column M
      'Delivery Fee',      // Column N
      'Payment Status',    // Column O (Manually updated usually)
      'Heard From',        // Column P: Marketing source
      'Raw Data (Debug)'   // Column Q: JSON dump (Hidden/Optional)
    ];
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }

  const customer = payload.customer || {};
  const orderTotal = payload.orderTotal || {};
  const items = payload.items || [];
  
  // 1. Use Order ID sent from frontend (frontend generates it to ensure consistency with WhatsApp)
  const orderId = payload.orderId || generateOrderId(); // fallback to generate if missing
  
  // 2. Combine GPS
  let gpsString = '';
  if (customer.gpsCoords && customer.gpsCoords.lat && customer.gpsCoords.lng) {
    gpsString = `${customer.gpsCoords.lat}, ${customer.gpsCoords.lng}`;
  }

  // 3. Format Items nicely
  // Uses the 'itemsSummary' sent from frontend if available, OR rebuilds it here for safety
  let itemsString = payload.itemsSummary; 
  if (!itemsString) {
     itemsString = items.map(item => `${item.name} (x${item.quantity})`).join(', ');
  }

  const row = [
    orderId,
    new Date().toISOString(),
    'new', // Initial Status
    customer.name || '',
    "'" + (customer.phone || ''), // Force string for phone numbers to prevent scientific notation
    customer.location || '',
    gpsString,
    customer.date || '',
    customer.time || '',
    itemsString,
    customer.specialRequests || '',
    payload.deliveryMethod || 'Not specified', // Delivery Method
    orderTotal.total || 0,
    orderTotal.deliveryFee || 0,
    'Pending', // Payment Status (default)
    customer.hearAboutUs || '',
    JSON.stringify(payload) // Raw Data for debugging/recovery
  ];

  sheet.appendRow(row);
  
  return jsonResponse({ success: true, message: 'Order saved successfully', orderId: orderId });
}

function generateOrderId() {
  const now = new Date();
  const dateStr = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyyMMdd');
  // Generate a random 4-char string
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, 1, O, 0 to avoid confusion
  let randomStr = '';
  for (let i = 0; i < 4; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ORD-${dateStr}-${randomStr}`;
}

function jsonResponse(obj, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
  // Note: Apps Script Web Apps always return 200 OK to the browser, 
  // custom status codes must be handled in the response body if needed by a sophisticated client,
  // but standard fetch will just see the text.
  return output;
}

// TEST FUNCTION (Run this in editor to verify)
function testDoPost() {
  const testPayload = {
    secret: EXPECTED_SECRET,
    orderId: 'ORD-20260210-TEST',
    customer: {
      name: 'Simulated User',
      phone: '0555555555',
      location: 'Test House, Accra',
      gpsCoords: { lat: 5.6037, lng: -0.1870 },
      date: '2026-02-14',
      time: '12:00 PM',
      specialRequests: 'Extra spicy',
      hearAboutUs: 'Instagram',
      deliveryMethod: 'Delivery'
    },
    items: [
      { name: 'Jollof Rice', quantity: 2, price: 50 },
      { name: 'Fried Chicken', quantity: 1, price: 30 }
    ],
    itemsSummary: 'Jollof Rice (x2), Fried Chicken (x1)',
    deliveryMethod: 'Delivery',
    orderTotal: {
      subtotal: 130,
      deliveryFee: 20,
      tax: 0,
      total: 150
    }
  };

  const e = {
    postData: {
      contents: JSON.stringify(testPayload)
    }
  };

  const result = doPost(e);
  Logger.log(result.getContent());
}
