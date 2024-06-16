import User from '@models/User';
import { connectToDB } from '@mongodb/database';

const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET
});

// Function to verify the signature of the webhook
function verifyRazorpaySignature(rawBody, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(rawBody);
  const digest = hmac.digest('hex');
  return digest === signature;
}

// Function to get order items (assuming metadata is used to store product info)
async function getOrderItems(order_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await razorpay.orders.fetch(order_id);
      const items = order.notes.items ? JSON.parse(order.notes.items) : [];
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
}

export const POST = async (req, res) => {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    // Verify the Razorpay webhook signature
    const isVerified = verifyRazorpaySignature(rawBody, signature, process.env.RAZORPAY_WEBHOOK_SECRET);
    if (!isVerified) {
      return new Response('Invalid signature', { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === 'order.paid') {
      const { payload: { payment: { entity } } } = event;

      const order_id = entity.order_id;
      const user_id = entity.notes.user_id; // Assuming user_id is stored in notes during order creation

      // Fetch order items from Razorpay order notes
      const orderItems = await getOrderItems(order_id);
      const amountPaid = entity.amount / 100;

      const orderData = {
        id: entity.id,
        user: user_id,
        orderItems,
        amountPaid,
      };

      await connectToDB();
      const user = await User.findById(user_id);
      user.cart = [];
      user.orders.push(orderData);
      await user.save();

      return new Response(JSON.stringify({ received: true }), { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return new Response('Failed to create order', { status: 500 });
  }
};
