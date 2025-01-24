import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import Spinner from "../../Components/Spinner";
import useDistricts from "../../Hooks/useDistricts";
import { format } from "date-fns";

const Search = () => {
    const { districts, upazilas } = useDistricts();
    const [searchBlood, setSearchBlood] = useState('');
    const [searchUpazila, setSearchUpazila] = useState('');
    const [searchDistrict, setSearchDistrict] = useState('');
    const axiosSecure = useAxiosSecure();
    const [x, setX] = useState([])
    const { data: searches = [], isLoading } = useQuery({
        queryKey: ['search', searchBlood, searchUpazila, searchDistrict],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/search?searchBlood=${searchBlood}&searchUpazila=${searchUpazila}&searchDistrict=${searchDistrict}`)
            if(!searchBlood,!searchUpazila,!searchDistrict){
                return setX([])
            } else{
                return setX(data)
            }
            // return data;
        }
    });
    console.log(x)
    if (isLoading) return <Spinner />
    return (
        <div className="min-h-screen pb-12">
            <div className="md:mt-[80px] my-[65px] w-11/12 mx-auto">
                <div className="w-2/3 mx-auto pt-10 flex justify-between items-center gap-5">
                    {/* blood group */}
                    <select id="bloodGroup"
                        value={searchBlood}
                        onChange={(e) => setSearchBlood(e.target.value)}
                        className="block w-full px-4 py-2 text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:outline-none focus:ring focus:ring-Racing-Red">
                        <option value=''>Select Blood Type</option>
                        {
                            (["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).map((blood, idx) => (
                                <option key={idx} value={blood}>
                                    {blood}
                                </option>
                            ))
                        }

                    </select>
                    {/* district */}
                    <select
                        id="district"
                        value={searchDistrict}
                        onChange={(e) => setSearchDistrict(e.target.value)}
                        className="block w-full px-4 py-2 text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:outline-none focus:ring focus:ring-Racing-Red">
                        <option value=""> Select District </option>
                        {districts.map((district) => (
                            <option key={district.id} value={district.name}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                    {/* district */}
                    <select
                        id="upazila"
                        value={searchUpazila}
                        onChange={(e) => setSearchUpazila(e.target.value)}
                        className="block w-full px-4 py-2 text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:outline-none focus:ring focus:ring-Racing-Red">
                        <option value=""> Select District </option>
                        {upazilas.map((upazila) => (
                            <option key={upazila.id} value={upazila.name}>
                                {upazila.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* donation cards */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 h-full">
                    {
                        x.length === 0 ? <p className='font-bold drop-shadow-lg col-span-5 uppercase text-Red text-xl mb-4 text-center mt-12'>Search for donation....</p> : (
                            x.map(search => (
                                <div key={search._id} className="flex flex-col max-w-sm overflow-hidden bg-red-50 rounded-lg shadow-lg dark:bg-gray-800 border border-red-100">
                                    <div className="p-4 md:py-4 md:px-5 w-full flex flex-col flex-grow">
                                        <h1 className="text-xl font-bold text-Red dark:text-white">{search.recipientName} ({search.bloodGroup})</h1>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            {search.hospital}, {search.fullAddress}
                                        </p>

                                        <div className="flex mt-2 items-center mb-2">
                                            {format(new Date(`1970-01-01T${search.donationTime}:00Z`), "hh:mm a")}, {format(new Date(search.donationDate), 'P')}
                                        </div>

                                        {/*  */}
                                        <div className="flex items-center mt-auto">
                                            <h1 className="text-xs font-bold text-Red dark:text-gray-200 md:text-sm">{search.status}....</h1>
                                            <button
                                                onClick={() => navigate(`/dashboard/details/${search._id}`)}
                                                className="ml-auto px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-Red rounded dark:bg-gray-700 hover:bg-red-600 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Search;