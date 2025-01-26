import { useLoaderData } from 'react-router-dom';
import banner from '../../assets/detailBg.JPG'
import { format } from 'date-fns';
import { FaCalendar } from 'react-icons/fa';

const ViewBlogDetails = () => {
    const detail = useLoaderData();
    return (
        <div className='md:mt-[82px] mt-[65px]'>
            <div className='relative'>
                <div className='w-full h-[60vh]' style={{
                    backgroundImage: `url(${banner})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                    <div className='w-10/12 mx-auto lg:h-[60%] md:h-[45%] bg-white bg-opacity-50 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] rounded-md'>
                        <div className='flex flex-col justify-center items-center lg:py-7 md:py-14 lg:px-3 md:px-5 py-4 px-1'>
                            <h1 className='font-semibold md:text-5xl text-2xl text-gray-950 text-center'>
                                {detail.title}</h1>
                            <p className='mt-3 text-gray-600 flex gap-2 items-center'>
                                <span>
                                    <FaCalendar />
                                </span>
                                {format(new Date(detail.createdAt), 'P')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* text content */}
            <p className='font-semibold px-6 md:px-16 py-8 dark:text-gray-300'>{detail.content}</p>

            <div className='w-[100%] h-[20%] mb-16 mt-3'>
                <img src={detail.thumb} alt="" className='object-fill mx-auto' />
            </div>

        </div>
    );
};

export default ViewBlogDetails;