import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../Components/Spinner";
import { format } from "date-fns";
import logo from "../../../assets/logo.PNG";
import useAuth from "../../../Hooks/useAuth";
import HandleStatus from "../../../Hooks/HandleStatus";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { HiArrowTurnDownRight } from "react-icons/hi2";

const Details = () => {
  const [handleStatus, status] = HandleStatus();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { data: details = {}, isLoading } = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/blood-request/${id}`);
      return data;
    },
  });

  const handleDonate = async (id) => {
    handleStatus(id, "inprogress", "/request-status");
    setIsOpen(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="xl:pt-10">
      <div className="flex justify-center items-center m-auto min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-black">
        <Helmet>
          <title>DONORA || Details</title>
        </Helmet>
        <div className="max-w-2xl w-full m-auto px-8 py-6 bg-white rounded-xl shadow-lg dark:shadow-gray-700/50 dark:bg-gray-900 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {format(new Date(details.donationDate), "P")} •{" "}
              {format(
                new Date(`1970-01-01T${details.donationTime}:00Z`),
                "hh:mm a"
              )}
            </span>
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 text-sm font-bold text-white transition-all duration-300 transform bg-gradient-to-r from-Red to-red-600 rounded-lg shadow-md hover:from-red-600 hover:to-pink-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              tabIndex="0"
              role="button"
            >
              Donate Now
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500 dark:text-red-400"
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
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {details.recipientName}
                  <span className="ml-2 text-Red">
                    ({details.bloodGroup})
                  </span>
                </h1>
              </div>
            </div>

            <div className="mt-4 pl-2 border-l-4 border-red-200 dark:border-red-900/50">
              <p className="text-gray-700 dark:text-gray-300">
                {details.details}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mt-1 mr-2 text-red-500 flex-shrink-0"
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
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {details.hospital}
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <HiArrowTurnDownRight className="text-2xl text-[#ef4444]" />
              <p className="text-gray-600 dark:text-gray-400">
                {details.fullAddress}
              </p>
            </div>

            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mt-1 mr-2 text-red-500 flex-shrink-0"
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
              <p className="text-gray-600 dark:text-gray-400">
                {details.upazila}, {details.district}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                details.status === "pending"
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
                  : details.status === "inprogress"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                  : details.status === "done"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
              }`}
            >
              {details.status}
            </span>

            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10 rounded-full object-cover mt-1"
                src={logo}
                alt="Donora logo"
              />
              <span className="font-bold text-Red -ml-2 text-xl">
                DONORA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="relative flex justify-center">
        {isOpen && (
          <div
            className="fixed inset-0 z-10 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen backdrop-blur-md px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <span
                className="hidden sm:inline-block sm:h-screen sm:align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                <h3
                  className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                  id="modal-title"
                >
                  Donate Blood To{" "}
                  <span className="text-Red uppercase">
                    {details.recipientName}
                  </span>
                </h3>

                <form className="mt-4" action="#">
                  <label
                    htmlFor="emails-list"
                    className="text-sm text-gray-700 dark:text-gray-200"
                  >
                    Email address
                  </label>

                  <label className="block mt-3" htmlFor="email">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={user?.displayName}
                      readOnly
                      className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    />
                  </label>

                  <label className="block mt-3" htmlFor="email">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={user?.email}
                      readOnly
                      className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    />
                  </label>

                  <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                    >
                      Cancel
                    </button>

                    <button
                      disabled={["canceled", "done", "inprogress"].includes(
                        details.status
                      )}
                      onClick={() => handleDonate(`${details._id}`)}
                      type="button"
                      className={`w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-Red rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-Racing-Red focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
                        ["canceled", "done", "inprogress"].includes(
                          details.status
                        )
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-Racing-Red focus:ring-blue-300 focus:ring-opacity-40"
                      }`}
                    >
                      DONATE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
