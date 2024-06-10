import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useContestSummery from "../../../Hooks/useContestSummery";

const CheckoutFrom = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const nagivate = useNavigate()
    const { user } = useAuth()
    const [clientSecret, setClientSecret] = useState('');
    const [bookingContest] = useContestSummery();
    const contestDeadline = bookingContest[0]?.contestDeadline || '';
    const contestId = bookingContest[0]?.contestId || '';
    const contestImage = bookingContest[0]?.contestImage || '';
    const contestName = bookingContest[0]?.contestName || '';
    const contestPrize = bookingContest[0]?.contestPrize || '';
    const contestPublishDate = bookingContest[0]?.contestPublishDate || '';
    const contestRegistrationFee = bookingContest[0]?.contestRegistrationFee || 0;
    const creatorEmail = bookingContest[0]?.creatorEmail || '';
    const creatorName = bookingContest[0]?.creatorName || '';
    const userEmail = bookingContest[0]?.email || '';
    const userName = bookingContest[0]?.name || '';
    const contestType = bookingContest[0]?.contestType || '';

    const regFee = bookingContest[0]?.contestRegistrationFee;
    useEffect(() => {
        axiosSecure.post('/create-payment', { regFee: regFee || 0.5 })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, regFee])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setError(error.message)
            console.log(error);
        } else {
            setError('')
            console.log(paymentMethod);
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error', confirmError);
        } else {
            console.log('paymentIntent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                const paymentInfo = {
                    contestId, contestDeadline, contestImage, contestName, contestPrize, contestPublishDate, contestRegistrationFee, creatorEmail, creatorName, 
                    userEmail, userName, contestType,
                    regDate: new Date(),
                    transactionId: paymentIntent.id,                    
                }
                axiosSecure.post(`/registered-contest?email=${user.email}`, paymentInfo)
                toast.success('Your payment confimed successfully', {duration: 6000})
                nagivate('/dashboard')
            }
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
            <button disabled={!clientSecret || !stripe} className="btn btn-sm btn-primary my-4" type="submit">
                Pay
            </button>
            <p>{error}</p>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </form>
    );
};

export default CheckoutFrom;