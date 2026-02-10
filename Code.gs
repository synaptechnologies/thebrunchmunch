const SHEET_NAME = 'Orders'; // Change if your sheet has a different name
const EXPECTED_SECRET = 'my_custom_secret_brunchmunch123'; // Must match frontend VITE_APPS_SCRIPT_SECRET

function doPost(e) {
  try {
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
      // Add headers
      const headers = [
        'Timestamp',
        'Name',
        'Phone',
        'Location',
        'GPS Lat',
        'GPS Lng',
        'Date',
        'Time',
        'Special Requests',
        'Items (JSON)',
        'Item Names',
        'Subtotal',
        'Delivery Fee',
        'Tax',
        'Total',
        'Status',
        'Source'
      ];
      sheet.appendRow(headers);
    }

    const customer = payload.customer || {};
    const itemsJson = JSON.stringify(payload.items || []);
    const orderTotal = payload.orderTotal || {};
    const simpleItemString = (payload.items || []).map(item => item.name).join(", ");

    const row = [
      new Date().toISOString(),
      customer.name || '',
      customer.phone || '',
      customer.location || '',
      (customer.gpsCoords && customer.gpsCoords.lat) || '',
      (customer.gpsCoords && customer.gpsCoords.lng) || '',
      customer.date || '',
      customer.time || '',
      customer.specialRequests || '',
      itemsJson,
      simpleItemString,
      orderTotal.subtotal || '',
      orderTotal.deliveryFee || '',
      orderTotal.tax || '',
      orderTotal.total || '',
      'new',
      'brunch-munch-web'
    ];

    sheet.appendRow(row);
    
    Logger.log('Order saved: ' + customer.name + ' at ' + new Date().toISOString());
    return jsonResponse({ success: true, message: 'Order saved to sheet' });
    
  } catch (err) {
    Logger.log('Error in doPost: ' + err.message);
    return jsonResponse({ success: false, error: err.message });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Add this function to test the Apps Script manually
function testDoPost() {
  const testPayload = {
    secret: EXPECTED_SECRET,
    customer: {
      name: 'Test User',
      phone: '+233 555 123 4567',
      location: 'Test Location',
      gpsCoords: { lat: 5.6037, lng: -0.1870 },
      date: '2026-02-10',
      time: '10:00 AM',
      specialRequests: 'No onions'
    },
    items: [
      { id: 1, name: 'Waffle', quantity: 2, price: 50 }
    ],
    orderTotal: {
      subtotal: 100,
      deliveryFee: 5,
      tax: 10.5,
      total: 115.5
    }
  };

  const e = {
    postData: {
      contents: JSON.stringify(testPayload)
    }
  };

  const result = doPost(e);
  Logger.log('Test result: ' + result.getContent());
}
