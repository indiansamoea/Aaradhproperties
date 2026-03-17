# Backend Setup for Razorpay Payment Processing

## 1. Node.js/Express Server Example
```javascript
const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: 'rzp_live_SSIUQLBgFOF2M7',
    key_secret: 'YOUR_SECRET'
});

app.post('/create-order', async (req, res) => {
    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: req.body.receipt
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
});

app.post('/verify-payment', (req, res) => {
    // Payment verification logic here
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

## 2. PHP Backend Example
```php
<?php
require 'vendor/autoload.php'; 
use Razorpay\Api; // Require Razorpay SDK

$api = new Api('rzp_live_SSIUQLBgFOF2M7', 'YOUR_SECRET');

$orderData = [
    'receipt'         => 3456,
    'amount'          => 50000,
    'currency'       => 'INR'
];
$order = $api->order->create($orderData);

echo json_encode($order);
?>
```

## 3. Python/Flask Example
```python
from flask import Flask, request
import razorpay

app = Flask(__name__)
razorpay_client = razorpay.Client(auth=('rzp_live_SSIUQLBgFOF2M7', 'YOUR_SECRET'))

@app.route('/create-order', methods=['POST'])
def create_order():
    data = request.json
    order_id = razorpay_client.order.create(data)
    return order_id

@app.route('/verify-payment', methods=['POST'])
def verify_payment():
    # Payment verification logic here

if __name__ == '__main__':
    app.run(debug=True)
```

## 4. Environment Variables Setup
- **Razorpay Key ID**: `rzp_live_SSIUQLBgFOF2M7`
- **Razorpay Key Secret**: Store securely (e.g., .env file)

## 5. API Endpoints
- **Create Order**: `POST /create-order`
- **Verify Payment**: `POST /verify-payment`

## 6. Security Best Practices
- Always verify webhook calls from Razorpay to ensure authenticity.
- Do not expose secret keys in your codebase.
- Use HTTPS for all transactions.

## 7. Testing Instructions with Razorpay Test Credentials
- Use the Razorpay test credentials provided in Razorpay's dashboard for development and testing.

## 8. Production Deployment Guide
- Use a cloud service provider or a dedicated server.
- Ensure all environment variables are set and secured.
- Monitor server health and transaction logs regularly.
