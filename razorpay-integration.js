// razorpay-integration.js

// Initialize Razorpay
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET'
});

// Function to create an order
const createOrder = async (amount) => {
    const options = {
        amount: amount, // amount in paise
        currency: 'INR',
        receipt: 'receipt#1',
        payment_capture: true
    };

    try {
        const order = await razorpay.orders.create(options);
        return order;
    } catch (error) {
        console.error('Error while creating order:', error);
        throw error;
    }
};

// Function to verify payment
const verifyPayment = (paymentId, orderId, signature) => {
    const crypto = require('crypto');

    const generatedSignature = crypto.createHmac('sha256', 'YOUR_KEY_SECRET').update(orderId + '|' + paymentId).digest('hex');

    return generatedSignature === signature;
};

module.exports = { createOrder, verifyPayment };