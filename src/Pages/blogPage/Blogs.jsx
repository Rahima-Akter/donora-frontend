import { useQuery } from '@tanstack/react-query';
import logo from '../../assets/logo.PNG'
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Spinner from '../../Components/Spinner';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { data: getblogs = [], isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/all-blog')
            return data;
        }
    });

    const blogs = getblogs.filter(blog => blog.status === 'published');

    if (isLoading) return <Spinner />
    return (
        <div className='md:mt-[130px] mt-24 lg:mb-96 my-[65px] w-11/12 mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    blogs.length === 0 ? <p className='font-bold drop-shadow-lg col-span-5 uppercase text-Red text-xl mb-4 text-center'>No data to show</p> : (
                        blogs?.map(blog => <div key={blog._id} className="max-w-[260px] mx-auto bg-red-50 rounded-lg shadow-lg dark:bg-gray-800 pb-0">
                            <div className="px-3 py-2">
                                <h1 className="text-lg font-bold text-Red uppercase dark:text-white">{blog.title.slice(0,29)}...</h1>
                                <p className="mt-1 text-sm text-gray-950 dark:text-gray-400">
                                    {blog.content.slice(0, 80)}....
                                </p>
                            </div>

                            <img
                                className="object-cover w-full h-[120px]"
                                src={blog.thumb}
                                alt="blog image"
                            />

                            <div className="flex items-center justify-between px-1 pr-4 py-1 bg-red-50">
                                <h1 className="text-lg font-bold text-white"><img src={logo} className='w-16 -ml-2' alt="" /></h1>
                                <button 
                                onClick={() => navigate(`/dashboard/view-blog/${blog._id}`)}
                                className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-Red rounded hover:bg-Racing-Red focus:bg-gray-400 focus:outline-none">
                                    View Blog
                                </button>
                            </div>
                        </div>)
                    )
                }
            </div>

        </div >
    );
};

export default Blogs;