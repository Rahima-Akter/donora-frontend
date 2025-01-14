import React from 'react';

const ExtraSection1 = () => {
    return (
        <div className='lg:w-10/12 lg:h-[30vh] m-auto bg-Racing-Red lg:rounded-lg lg:py-4 py-8 px-10 flex md:flex-row flex-col justify-center items-center lg:gap-8 gap-4 lg:mt-20 mt-0'>
            <p className='bg-Red lg:h-[50%] lg:w-1/3 text-white rounded uppercase text-lg flex justify-center items-center animate-pulse px-3 py-2'>
                Donate Blood
            </p>
            <p className='bg-Red lg:h-[50%] lg:w-1/3 text-white rounded uppercase text-lg flex justify-center items-center animate-pulse px-3 py-2'>
                become a volunteer
            </p>
            <p className='bg-Red lg:h-[50%] lg:w-1/3 text-white rounded uppercase text-lg flex justify-center items-center animate-pulse px-3 py-2'>
                save lives
            </p>
        </div>
    );
};

export default ExtraSection1;