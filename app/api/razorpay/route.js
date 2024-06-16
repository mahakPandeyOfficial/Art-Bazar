import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
});

export const POST = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { cart, userId } = req.body;

  const amount = cart.reduce((total, item) => total + item.price * 100 * item.quantity, 0); // Calculate the total amount in paise

  const options = {
    amount: amount,
    currency: 'INR',
    receipt: `receipt_${userId}_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error('Razorpay error:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
};
