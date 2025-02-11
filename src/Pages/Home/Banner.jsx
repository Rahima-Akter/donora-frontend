import { Link } from 'react-router-dom';
import bannerImg from '../../assets/bannerBg.JPG';
import Button from '../../Shared/Button/Button';

const Banner = () => {
    return (
        <div className='lg:h-[75vh] md:h-[50vh] h-[55vh] md:mt-[82px] mt-[65px]' style={{
            // backgroundImage: `url(${bannerImg})`,
            backgroundImage: `url("https://i.pinimg.com/736x/01/60/c9/0160c9a03eff9cea0d3ba7b4980a59b4.jpg")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            // height: '70vh',
            width: '100%',
            position: 'relative',
            // marginTop: '82px'
        }}>
            <div className='z-0 absolute top-0 right-0 inset-0 bg-Crimson-Red/80'></div>
            {/* content div */}
            <div className='relative z-10 flex justify-center items-center'>
                <div className='text-white md:text-4xl lg:mt-32 md:mt-44 mt-28 lg:px-44 md:px-10 px-2'>
                    <p>Together, We Create a World Where No One Waits for Blood, Hope is Restored, and Lives are Saved</p>
                    <div className='space-x-4 mt-6'>
                        <Link to="/register"><Button buttonText="Join As A Doner"></Button></Link>
                        <Link to="search"><Button buttonText="Search Donor"></Button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;