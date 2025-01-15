

const Testimonial = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-6xl px-6 py-10 mx-auto">
                <p className="text-4xl drop-shadow-lg font-bold text-Red">Testimonials</p>

                <main className="bg-Crimson-Red rounded-lg lg:py-12 w-full mt-6 md:flex md:items-center xl:mt-12">
                    {/* <div className="absolute w-full bg-blue-600 -z-10 md:h-96 rounded-2xl"></div> */}

                    <div className="w-full lg:p-6 p-6 md:py-6 lg:flex lg:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-5 md:justify-evenly">
                        <img className="h-40 w-full md:w-[60%] mx-auto md:mt-8 lg:mx-6 lg:rounded-md object-cover shadow-md md:h-56 lg:h-60 lg:w-[30rem]" src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="client photo" />

                        <div className="mt-2 md:mx-6">
                            <div>
                                <p className="text-4xl font-bold tracking-tight text-white">Ema Watson</p>
                                <p className="text-xs mt-1 text-white">One of Our Regular Donor</p>
                            </div>

                            <p className="mt-4 text-sm leading-relaxed text-white md:text-sm"> “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda”.</p>

                            <div className="flex items-center justify-between mt-6 lg:justify-center">
                                <button title="left arrow" className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button title="right arrow" className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default Testimonial;