import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Spinner from "../../Components/Spinner";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

const DonationRequests = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: pendingRequests = [], isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-blood-requests");
      return data;
    },
  });
  const requests = pendingRequests.filter((req) => req.status === "pending");

  if (isLoading) return <Spinner />;

  return (
    <div className="md:mt-[130px] my-[65px] w-11/12 mx-auto">
      <Helmet>
        <title>DONORA || donation requests</title>
      </Helmet>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <img
            src="https://media1.tenor.com/m/YvOjHMyFlH0AAAAd/empty-box.gif"
            alt="No requests found"
            className="w-1/2 max-w-md mx-auto"
          />
          <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600 text-2xl my-6 text-center">
            No donation requests available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="flex flex-col h-full overflow-hidden bg-white rounded-xl shadow-lg dark:bg-gray-900 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-center">
                  <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-600 dark:text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h1 className="ml-3 text-xl font-bold text-gray-800 dark:text-white">
                    {request.recipientName}
                  </h1>
                  <span className="ml-2 px-2 py-2 text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-md">
                    {request.bloodGroup}
                  </span>
                </div>

                <div className="mt-4 space-y-3 flex-grow border-b border-gray-100 dark:border-gray-700 pb-3">
                  {/* Hospital Row */}
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="flex-shrink-0 h-5 w-5 mr-2 text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-full w-full"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <p className="text-sm break-words">{request.hospital}</p>
                  </div>

                  {/* Address Row */}
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="flex-shrink-0 h-5 w-5 mr-2 text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-full w-full"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm break-words">{request.fullAddress}</p>
                  </div>

                  {/* Time Row */}
                  <div className="flex items-start text-gray-600 dark:text-gray-300">
                    <div className="flex-shrink-0 h-5 w-5 mr-2 text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-full w-full"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm">
                      {format(
                        new Date(`1970-01-01T${request.donationTime}:00Z`),
                        "hh:mm a"
                      )}
                      ,{format(new Date(request.donationDate), "P")}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-4 -mb-2">
                  <div className="flex items-center">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : request.status === "Approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {request.status}
                    </span>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/details/${request._id}`)
                      }
                      className="ml-auto px-2 py-1 text-xs font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
