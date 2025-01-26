import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { TbFidgetSpinner } from 'react-icons/tb';

const CheckOutForm = ({ userName, userEmail, onCloseModal,refetch }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [isProcessing, setIsProcessing] = useState(false);

    const [donation, setDonation] = useState({
        name: userName || '',
        email: userEmail || '',
        amount: '',
    });

    const handleChange = (e) => {
        setDonation({ ...donation, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { name, email, amount } = donation;

        if (!name || !email || !amount) {
            toast.error("Please fill in all the fields.");
            return;
        }

        try {
            setIsProcessing(true);

            // Step 1: Create Payment Intent
            const { data: { clientSecret } } = await axiosSecure.post('/create-payment-intent', {
                price: parseInt(amount),
            });

            // Step 2: Confirm Payment
            const card = elements.getElement(CardElement);
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: donation.name,
                        email: donation.email,
                    },
                },
            });

            if (error) {
                toast.error(error.message);
                setIsProcessing(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                toast.success("Payment successful!");

                // Step 3: Save Donation Details
                await axiosSecure.post('/save-donation', {
                    name,
                    email,
                    amount,
                    date: new Date().toISOString(),
                    transactionId: paymentIntent.id,
                });
                setDonation({
                    name: userName || '',
                    email: userEmail || '',
                    amount: '',
                });
                refetch();
                onCloseModal();

            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="w-full my-12 backdrop-blur-lg">
            <form onSubmit={handleSubmit} className="border-gray-200 dark:shadow-gray-600 shadow-lg p-5 drop-shadow-sm dark:bg-gray-900 dark:rounded-lg">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-red-600">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={donation.name}
                        readOnly
                        className="w-full p-2 border rounded dark:bg-transparent dark:text-white dark:border-gray-500"
                        placeholder="Your Name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-red-600">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={donation.email}
                        readOnly
                        className="w-full p-2 border rounded dark:bg-transparent dark:text-white dark:border-gray-500"
                        placeholder="Your Email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-red-600">Donation Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={donation.amount}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-transparent dark:text-white dark:border-gray-500"
                        placeholder="Enter Amount"
                    />
                </div>
                <CardElement
                    className="border dark:border-gray-500 border-red-400 col-span-2 py-3 px-4 rounded-md mb-4"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#FF0000',
                                '::placeholder': { color: '#FF0000' },
                            },
                            invalid: { color: 'red' },
                        },
                    }}
                />
                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="btn btn-md w-full bg-red-600 text-white hover:bg-red-700"
                >
                    {isProcessing ? <TbFidgetSpinner className='animate-spin text-Red' /> : 'Donate'}
                </button>
            </form>
        </div>
    );
};

export default CheckOutForm;
