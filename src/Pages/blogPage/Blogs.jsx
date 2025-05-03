import { useQuery } from "@tanstack/react-query";
import logo from "../../assets/logo.PNG";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Spinner from "../../Components/Spinner";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FacebookShareButton } from "react-share";

const Blogs = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { data: getblogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-blog");
      return data;
    },
  });

  const blogs = getblogs.filter((blog) => blog.status === "published");

  if (isLoading) return <Spinner />;
  return (
    <div className="md:mt-[130px] mt-24 lg:mb-96 my-[65px] w-11/12 mx-auto">
      <Helmet>
        <title>DONORA || Blogs</title>
      </Helmet>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.length === 0 ? (
          <div className="col-span-4 flex flex-col items-center justify-center">
            <img
              src="https://media1.tenor.com/m/YvOjHMyFlH0AAAAd/empty-box.gif"
              alt="No blogs available"
              className="w-full max-w-md mx-auto"
            />
            <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-Red to-pink-600 text-2xl my-6 text-center">
              No blogs to show
            </p>
          </div>
        ) : (
          blogs?.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col overflow-hidden bg-white rounded-xl shadow-lg dark:bg-gray-900 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
            >
              <div className="relative">
                <img
                  className="object-cover w-full h-40 group-hover:scale-105 overflow-hidden duration-700"
                  src={blog.thumb}
                  alt="blog thumbnail"
                />
                {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h1 className="text-lg font-bold text-white">
                    {blog.title.slice(0, 29)}...
                  </h1>
                </div> */}
              </div>

              <div className="p-4 flex-grow">
                <p className="text-gray-700 dark:text-gray-300">
                  {blog.content.slice(0, 80)}...
                </p>
              </div>

              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-600">
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full object-cover mt-1"
                    src={logo}
                    alt="Donora logo"
                  />
                  <span className="font-bold text-Red -ml-3 text-lg">
                    DONORA
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/dashboard/view-blog/${blog._id}`)}
                  className="px-4 py-2 text-xs font-bold text-white transition-all duration-300 transform bg-gradient-to-r from-Red to-red-600 rounded-lg shadow-md hover:from-red-600 hover:to-Red hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  View Blog
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs;
