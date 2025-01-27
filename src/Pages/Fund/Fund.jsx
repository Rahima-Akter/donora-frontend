import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { IoCloseCircle } from "react-icons/io5";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Spinner from "../../Components/Spinner";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Fund = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
    const { data: donations = [], isLoading, refetch } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/donations')
            return data;
        }
    });
    if (isLoading) return <Spinner />
    return (
        <>
            {/* table */}
            <section className="md:mt-[130px] mt-24 my-[65px] md:w-9/12 w-full mx-auto">
                <Helmet>
                    <title>DONORA || Funds</title>
                </Helmet>
                <div className='flex justify-between items-center lg:mb-0 px-2 lg:px-0'>
                    <p className='font-semibold uppercase text-Red md:text-lg mb-3 text-xs'>All funds</p>
                    <div>
                        <button onClick={() => document.getElementById('my_modal_5').showModal()} to="/dashboard/my-donation-requests" className='bg-Red dark:bg-red-800 hover:bg-Racing-Red rounded-lg px-3 py-1 text-white font-semibold -ml-2 md:-ml-0 mb-3'>Donate?</button>
                    </div>
                </div>
                {
                    donations.length === 0 && <div>
                        <img src="https://media1.tenor.com/m/YvOjHMyFlH0AAAAd/empty-box.gif" alt="" className='w-full h-full' />
                        <p className='font-bold drop-shadow-lg uppercase text-Red text-xl my-4 text-center '>No data to show</p>
                    </div> || (
                        <div className="min-w-full">
                            <div className="overflow-hidden bg-white shadow rounded-lg dark:rounded-none dark:bg-gray-900">
                                <div className="overflow-x-auto">
                                    <table className="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-300">
                                        <thead className="text-xs text-Red uppercase bg-Red/10 dark:bg-gray-800 dark:text-white dark:border dark:border-gray-500">
                                            <tr>
                                                <th scope="col" className="text-center px-4 py-4 whitespace-nowrap">Donor Name</th>
                                                <th scope="col" className="text-center px-4 py-4 whitespace-nowrap">Donation_Amount</th>
                                                <th scope="col" className="text-center px-4 py-4 whitespace-nowrap">Donation_Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                donations.map(donation => <tr key={donation._id} className="text-center font-semibold border-b border-gray-100 dark:border-gray-500 dark:border">
                                                    <td className="py-4">{donation.name}</td>
                                                    <td className="py-4">${donation.amount}</td>
                                                    <td className="py-4">{format(new Date(donation.date), 'P')}</td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )
                }
            </section>


            {/* modal */}
            {
                user && (
                    <dialog id="my_modal_5" className="modal modal-middle backdrop-blur-sm">
                        <div className="modal-box overflow-hidden dark:bg-gray-800">
                            <Elements stripe={stripePromise}>
                                <CheckOutForm userName={user?.displayName} userEmail={user?.email} refetch={refetch} onCloseModal={() => document.getElementById('my_modal_5').close()} />
                            </Elements>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="absolute top-3 right-5"><IoCloseCircle className="text-Red text-3xl" /></button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                )
            }
        </>
    );
};

export default Fund;