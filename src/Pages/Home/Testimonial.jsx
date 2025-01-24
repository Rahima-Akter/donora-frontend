import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Testimonial = () => {

    const testimonials = [
        {
            id: 1,
            name: "Ema Watson",
            role: "One of Our Regular Donors",
            photo: "https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            testimonial: "Organizing blood donation drives is an incredibly fulfilling job. It’s inspiring to see people come together to help save lives. Each time we host an event, I feel proud knowing that we’re making a real difference in the community. It’s amazing how people come together to help those in need, and I’m thankful for all the generous donors who make it possible.."
        },
        {
            id: 2,
            name: "John Doe",
            role: "Recipient of Blood Donation",
            photo: "https://www.profilebakery.com/wp-content/uploads/2024/03/professional-headshot-with-dark-gray-background-blue-suit.jpg",
            testimonial: "I’ve been donating blood for years, and I can’t explain how rewarding it feels to know that my donations are directly saving lives. It’s comforting to know that I’m part of a cause that can truly make an impact. The process is always smooth and quick, and I always leave feeling proud of contributing to something so meaningful."
        },
        {
            id: 3,
            name: "Emily Stone",
            role: "Blood Donation Advocate",
            photo: "https://images.squarespace-cdn.com/content/v1/5921ed39d482e93bf8242f65/1658538940245-HYIA3MHLKLG8X5L647ZC/Don+Evans+Photography+in+Greensboro+business+professional+in+a+green+blouse+with+poses+for+her+in-studio+professional+headshot.jpg?format=500w",
            testimonial: "Every blood donation matters, and we often forget how impactful it can be. When you're healthy and able, donating blood is one of the simplest yet most powerful ways to make a difference. It’s a quick and safe process, and every drop can potentially save someone's life. I urge anyone who is able to donate, to consider it—you never know who you might be helping."
        },
        {
            id: 4,
            name: "Michael Harris",
            role: "First-Time Blood Donor",
            photo: "https://static.vecteezy.com/system/resources/thumbnails/024/354/252/small/businessman-isolated-illustration-ai-generative-free-photo.jpg",
            testimonial: "Donating blood for the first time was a rewarding experience. At first, I was nervous, but the process was so straightforward and reassuring. After learning more about how crucial blood donations are, I felt proud knowing that my donation could make a difference in someone’s life. It’s a small time commitment with an enormous impact, and I plan to donate again."
        },
        {
            id: 5,
            name: "Linda Baker",
            role: "Blood Donation Event Organizer",
            photo: "https://images.squarespace-cdn.com/content/v1/54c6eb0ce4b0f6cdd67c1196/1642223720668-I2XL35T6SMPTDZPOTRFJ/DCP_0085.jpg",
            testimonial: "Organizing blood donation drives is an incredibly fulfilling job. It’s inspiring to see people from all walks of life come together for one cause: saving lives. Each donation is a small yet profound act of kindness. Watching individuals donate, knowing that they are making a life-saving difference, always reminds me why this work is so meaningful and important."
        }
    ]


    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-6xl px-6 py-10 mx-auto">
                <p className="text-4xl drop-shadow-lg font-bold text-Red">Testimonials</p>

                <main className="bg-Crimson-Red rounded-lg lg:py-12 w-full mt-6 md:flex md:items-center xl:mt-12">
                    {/* Swiper component */}
                    <Swiper
                        cssMode={true}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                        className="mySwiper"
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="w-full lg:p-6 p-6 md:py-6 lg:flex lg:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-5 md:justify-evenly">
                                    <img className="h-40 w-full md:w-[60%] mx-auto md:mt-8 lg:mx-6 lg:rounded-md object-cover shadow-md md:h-56 lg:h-60 lg:w-[30rem]" src={testimonial.photo} alt={`${testimonial.name} photo`} />
                                    <div className="mt-2 md:mx-6 md:pl-9 lg:pl-0 pl-0">
                                        <div>
                                            <p className="text-4xl font-bold tracking-tight text-white">{testimonial.name}</p>
                                            <p className="text-xs mt-1 text-white">{testimonial.role}</p>
                                        </div>
                                        <p className="mt-4 text-sm leading-relaxed text-white md:text-sm">{testimonial.testimonial}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <div>
                        <button
                            title="left arrow"
                            className="swiper-button-prev p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-Red mb-5 md:mr-0 mr-6"
                        >
                            <IoIosArrowBack />
                        </button>

                        <button
                            title="right arrow"
                            className="swiper-button-next p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-Red"
                        >
                            <IoIosArrowForward />
                        </button>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default Testimonial;
