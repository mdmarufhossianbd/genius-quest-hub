import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFrom from "./CheckoutFrom";
const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Key)
    return (
        <div>
            <h2 className="text-center font-semibold text-3xl my-10">Complete your payment for Registration.</h2>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutFrom></CheckoutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;