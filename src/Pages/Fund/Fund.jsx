import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Fund = () => {
    return (
        <>
            <div className='my-44 flex justify-between items-center w-7/12 mx-auto'>
                <button className="btn btn-success bg-green-500 text-white p-4">Success</button>
            </div>
            <div className="w-2/6 mx-auto">
                <Elements stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>
            </div>
        </>
    );
};

export default Fund;