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
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: donations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/donations");
      return data;
    },
  });
  if (isLoading) return <Spinner />;
  return (
    <>
      {/* table */}
      <section className="md:mt-[130px] mt-24 my-[65px] md:w-9/12 w-full mx-auto">
        <Helmet>
          <title>DONORA || Funds</title>
        </Helmet>
        <div className="flex justify-between items-center lg:mb-0 px-2 lg:px-0">
          <p className="font-semibold uppercase text-Red md:text-lg mb-3 text-xs">
            All funds
          </p>
          <div>
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="bg-gradient-to-r from-Red to-red-600 hover:from-red-600 hover:to-Red text-white font-semibold rounded-lg px-3 py-1 shadow-md hover:shadow-lg transition-all duration-300 mb-3"
            >
              Donate Now
            </button>
          </div>
        </div>

        {donations.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="relative w-full max-w-md">
              <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_kcsr6fcp.json"
                background="transparent"
                speed="1"
                style={{ width: "100%", height: "300px" }}
                loop
                autoplay
              ></lottie-player>
              <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-Red to-pink-600 text-2xl text-center mt-4">
                No donations yet
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
                Be the first to contribute to our cause!
              </p>
            </div>
          </div>
        ) : (
          <div className="min-w-full">
            <div className="overflow-hidden bg-white shadow-lg rounded-xl dark:rounded-none dark:bg-gray-950 border border-gray-100 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                  <thead className="text-xs uppercase bg-gradient-to-r from-Red/10 to-red-100 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 whitespace-nowrap text-center text-Red"
                      >
                        Donor Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 whitespace-nowrap text-center text-Red"
                      >
                        Donation Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 whitespace-nowrap text-center text-Red"
                      >
                        Donation Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {donations.map((donation) => (
                      <tr
                        key={donation._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
                          {donation.name}
                        </td>
                        <td className="px-6 py-4 text-center text-Red font-bold">
                          ${donation.amount}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                          {format(new Date(donation.date), "P")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* modal */}
      {user && (
        <dialog id="my_modal_5" className="modal modal-middle backdrop-blur-sm">
          <div className="modal-box overflow-hidden dark:bg-gray-800 max-w-md">
            <Elements stripe={stripePromise}>
              <CheckOutForm
                userName={user?.displayName}
                userEmail={user?.email}
                refetch={refetch}
                onCloseModal={() =>
                  document.getElementById("my_modal_5").close()
                }
              />
            </Elements>
            <div className="modal-action">
              <form method="dialog">
                <button className="absolute top-3 right-5 hover:scale-110 transition-transform">
                  <IoCloseCircle className="text-Red text-3xl" />
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Fund;
