import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFrom from "./CheckoutFrom";
const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Key)
    return (
        <div>
            <h2>payemnt</h2>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutFrom></CheckoutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;