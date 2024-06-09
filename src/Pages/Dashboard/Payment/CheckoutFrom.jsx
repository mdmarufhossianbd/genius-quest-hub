import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


const CheckoutFrom = () => {
    const stripe = useStripe()
    const elements = useElements()
    const handleSubmit = async(event) => {
        event.preventDefault();
        if(!stripe || !elements){
            return
        }
        const card = elements.getElement(CardElement)
        if(card == null){
            return
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            console.log(error);
        } else{
            console.log(paymentMethod);
        }
    }
    return (
        <form className="lg:w-1/4 md:w-1/3 w-full mx-auto my-10" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit">
                Pay
            </button>            
        </form>
    );
};

export default CheckoutFrom;