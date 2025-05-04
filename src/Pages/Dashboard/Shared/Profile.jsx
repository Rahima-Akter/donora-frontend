import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useDistricts from "../../../Hooks/useDistricts";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner from "../../../Components/Spinner";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { districts, upazilas } = useDistricts();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditable, setIsEditable] = useState(false);

  const {
    data: users = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/single-user/${user?.email}`);
      return data;
    },
    onSuccess: (data) => reset(data),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bloodGroup: users.bloodGroup || "",
    },
  });

  const onSubmit = async (data) => {
    setIsEditable(false);
    let image = users.image;
    if (data.image && data.image.length > 0) {
      const photo = data.image[0];
      const formData = new FormData();
      formData.append("image", photo);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_SECRET_KEY
          }`,
          formData
        );
        image = response.data.data.display_url;
      } catch (err) {
        console.error("Image upload failed:", err.message || err);
        toast.error("Failed to upload image. Please try again.");
        return;
      }
    }

    const userData = {
      name: data.name || users.name,
      image,
      bloodGroup: data.bloodGroup || users.bloodGroup,
      district: data.district || users.district,
      upazila: data.upazila || users.upazila,
    };

    try {
      const res = await axiosSecure.patch(
        `/update-user/${user?.email}`,
        userData
      );
      if (res.data.modifiedCount) {
        refetch();
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Profile update failed!");
      }
    } catch (err) {
      console.error("Error updating profile:", err.message || err);
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-black opacity-95"></div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 opacity-20 dark:opacity-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-red-400 dark:bg-red-500 animate-float"
            style={{
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <Helmet>
        <title>Dashboard || Profile</title>
      </Helmet>

      {/* Profile container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700/50">
          {/* Profile header */}
          <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700/50 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
              {users.name}'s Profile
            </h1>
            {!isEditable && (
              <button
                onClick={() => setIsEditable(true)}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-Red text-white font-medium hover:from-Red hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-red-500/30 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile content */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={users.name}
                    {...register("name")}
                    disabled={!isEditable}
                    className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={users?.email}
                    readOnly
                    {...register("email")}
                    disabled={!isEditable}
                    className="w-full px-4 py-3 bg-gray-100/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-300 cursor-not-allowed"
                  />
                </div>

                <div className="flex xl:flex-row flex-col gap-5 justify-center items-center xl:col-span-2">
                  {/* Profile Picture */}
                  <div className="md:col-span-2 space-y-4 xl:w-[30%]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-6">
                      <div className="relative group">
                        <img
                          src={users.image}
                          className="xl:h-40 xl:w-56 rounded-xl object-cover border-2 border-gray-300 dark:border-gray-600 group-hover:border-red-400 transition-all duration-300"
                          alt="Profile"
                        />
                        {isEditable && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                            <span className="text-white text-xs font-medium">
                              Change
                            </span>
                          </div>
                        )}
                      </div>
                      {isEditable && (
                        <div className="flex-1">
                          <input
                            type="file"
                            id="image"
                            accept="image/*"
                            {...register("image")}
                            className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-500/10 dark:file:bg-red-500/20 file:text-red-500 dark:file:text-red-400 hover:file:bg-red-500/20 dark:hover:file:bg-red-500/30 transition-colors"
                          />
                          {errors.image && (
                            <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-2">
                              {errors.image.message}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center gap-5 xl:w-[70%]">
                    {/* District */}
                    <div className="space-y-2 w-full">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        District
                      </label>
                      <select
                        {...register("district")}
                        disabled={!isEditable}
                        className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 disabled:opacity-60"
                      >
                        <option value="">
                          {users.district || "Select district"}
                        </option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Upazila */}
                    <div className="space-y-2 w-full">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Upazila
                      </label>
                      <select
                        {...register("upazila")}
                        disabled={!isEditable}
                        className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 disabled:opacity-60"
                      >
                        <option value="">
                          {users.upazila || "Select upazila"}
                        </option>
                        {upazilas.map((upazila) => (
                          <option key={upazila.id} value={upazila.name}>
                            {upazila.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Blood Group */}
                <div className="md:col-span-2 space-y-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Blood Type
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (type) => (
                        <label key={type} className="relative">
                          <input
                            type="radio"
                            name="bloodGroup"
                            value={type}
                            {...register("bloodGroup")}
                            disabled={!isEditable}
                            defaultChecked={type === users.bloodGroup}
                            className="peer absolute opacity-0"
                          />
                          <div className="h-14 flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 peer-checked:border-red-500 dark:peer-checked:border-red-400 peer-checked:bg-red-500/10 dark:peer-checked:bg-red-500/20 peer-checked:text-red-600 dark:peer-checked:text-white peer-checked:ring-2 peer-checked:ring-red-500/30 dark:peer-checked:ring-red-500/30 transition-all duration-200 cursor-pointer hover:border-red-400/50">
                            {type}
                          </div>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              {isEditable && (
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditable(false)}
                    className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-Red text-white font-medium hover:from-Red hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-red-500/30 flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Profile;
