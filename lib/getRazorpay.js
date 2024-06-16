import Razorpay from 'razorpay';

let razorpayPromise;

const getRazorpay = () => {
  if (!razorpayPromise) {
    razorpayPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
          // Additional options can be provided here
        });
        resolve(razorpay);
      };
      script.onerror = (error) => {
        reject(error);
      };
      document.body.appendChild(script);
    });
  }

  return razorpayPromise;
}

export default getRazorpay;
