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
    <>
      <div className="flex justify-center items-center m-auto min-h-screen bg-red-50 dark:bg-black">
        <Helmet>
          <title>DONORA || Details</title>
        </Helmet>
        <div className="max-w-2xl m-auto px-8 py-4 bg-white rounded-lg shadow-md dark:shadow-gray-700 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-sm font-light text-gray-600 dark:text-gray-400">
              {format(new Date(details.donationDate), "P")},{" "}
              <span>
                {format(
                  new Date(`1970-01-01T${details.donationTime}:00Z`),
                  "hh:mm a"
                )}
              </span>
            </span>
            <button
              onClick={() => setIsOpen(true)}
              className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-Red uppercase -mb-2 rounded cursor-pointer hover:bg-Racing-Red"
              tabIndex="0"
              role="button"
            >
              donate
            </button>
          </div>

          <div className="mt-2">
            <div className="flex items-center gap-1">
              <p
                className="text-xl font-bold text-gray-700 dark:text-Red hover:text-gray-600 dark:hover:text-Racing-Red hover:underline"
                tabIndex="0"
                role="link"
              >
                {details.recipientName}
              </p>
              <span className="font-semibold text-Red">
                ({details.bloodGroup})
              </span>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {details.details}
            </p>
          </div>
          <div className="mt-2 md:flex gap-1 items-center">
            <p
              className="text-lg font-bold text-Red hover:text-gray-600 dark:hover:text-Racing-Red"
              tabIndex="0"
              role="link"
            >
              {details.hospital},
            </p>
            <p className="mt-2 md:mt-0 text-gray-600 dark:text-gray-300">
              {details.fullAddress}
            </p>
          </div>
          <div className="mt-2">
            <p className="mt-2 md:mt-0 text-gray-600 dark:text-gray-300">
              {details.upazila},<span className="ml-1">{details.district}</span>
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p
              className={`text-lg font-normal ${
                (details.status === "pending" && "text-amber-500") ||
                (details.status === "inprogress" && "text-sky-500") ||
                (details.status === "done" && "text-emerald-500") ||
                (details.status === "canceled" && "text-red-500")
              }`}
              tabIndex="0"
              role="link"
            >
              {details.status}...
            </p>

            <div className="flex items-center">
              <img
                className="hidden object-cover w-10 h-10 sm:block"
                src={logo}
                alt="avatar"
              />
              <a
                href="/"
                className="font-bold -mt-1 -ml-1 text-Red uppercase cursor-pointer"
                tabIndex="0"
                role="link"
              >
                donora
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
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
    </>
  );
};

export default Details;
