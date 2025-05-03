import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import Spinner from "../../Components/Spinner";
import useDistricts from "../../Hooks/useDistricts";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Search = () => {
  const { districts, upazilas } = useDistricts();
  const [searchBlood, setSearchBlood] = useState("");
  const [searchUpazila, setSearchUpazila] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: searches = [], isLoading } = useQuery({
    queryKey: ["search", searchBlood, searchUpazila, searchDistrict],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/search?searchBlood=${searchBlood}&searchUpazila=${searchUpazila}&searchDistrict=${searchDistrict}`
      );
      return data;
    },
    enabled: !!(searchBlood || searchUpazila || searchDistrict),
  });
//   console.log(searches);
  if (isLoading) return <Spinner />;
  return (
    <div className="min-h-screen pb-12 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-black">
      <Helmet>
        <title>DONORA || search</title>
      </Helmet>

      {/* Search Filters Section */}
      <div className="md:mt-[80px] my-[45px] w-11/12 mx-auto">
        <div className="w-full mx-auto pt-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-center text-Red mb-6">
              Find Blood Donors
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Blood Group Select */}
              <div className="relative group">
                {/* <label
                  htmlFor="bloodGroup"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Blood Type
                </label> */}
                <select
                  id="bloodGroup"
                  value={searchBlood}
                  onChange={(e) => setSearchBlood(e.target.value)}
                  className="w-full px-4 py-3 text-sm text-Red bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-Red focus:border-transparent transition-all duration-300 shadow-sm"
                >
                  <option value="">Select Blood Type</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (blood, idx) => (
                      <option key={idx} value={blood}>
                        {blood}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* District Select */}
              <div className="relative group">
                {/* <label
                  htmlFor="district"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  District
                </label> */}
                <select
                  id="district"
                  value={searchDistrict}
                  onChange={(e) => setSearchDistrict(e.target.value)}
                  className="w-full px-4 py-3 text-sm text-Red bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-Red focus:border-transparent transition-all duration-300 shadow-sm"
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila Select */}
              <div className="relative group">
                {/* <label
                  htmlFor="upazila"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Upazila
                </label> */}
                <select
                  id="upazila"
                  value={searchUpazila}
                  onChange={(e) => setSearchUpazila(e.target.value)}
                  className="w-full px-4 py-3 text-sm text-Red bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-Red focus:border-transparent transition-all duration-300 shadow-sm"
                >
                  <option value="">Select Upazila</option>
                  {upazilas.map((upazila) => (
                    <option key={upazila.id} value={upazila.name}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Cards Section */}
        <div className="mt-6">
          {searches.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <lottie-player
                src="https://assets2.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json"
                background="transparent"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                loop
                autoplay
              ></lottie-player>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-Red to-pink-600 text-center">
                Search for blood donors
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
                Select blood type and location to find donors
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searches.map((search) => (
                <div
                  key={search._id}
                  className="flex flex-col overflow-hidden bg-white rounded-xl shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1"
                >
                  {/* cards */}
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
                        {search.recipientName}
                      </h1>
                      <span className="ml-2 px-2 py-2 text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-md">
                        {search.bloodGroup}
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
                        <p className="text-sm break-words">{search.hospital}</p>
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
                        <p className="text-sm break-words">
                          {search.fullAddress}
                        </p>
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
                            new Date(`1970-01-01T${search.donationTime}:00Z`),
                            "hh:mm a"
                          )}
                          ,{format(new Date(search.donationDate), "P")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 -mb-2">
                      <div className="flex items-center">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            search.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : search.status === "Approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {search.status}
                        </span>
                        <button
                          onClick={() =>
                            navigate(`/dashboard/details/${search._id}`)
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
      </div>
    </div>
  );
};

export default Search;
