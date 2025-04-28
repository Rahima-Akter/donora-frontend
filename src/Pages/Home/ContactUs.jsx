import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaEnvelopeCircleCheck, FaMapLocation } from 'react-icons/fa6';

const ContactUs = () => {
    return (
        <div id='contact' className='lg:w-10/12 md:w-full w-11/12 mx-auto'>
            <section class=" dark:bg-gray-900">
                <div class="container px-6 py-12 mx-auto">
                    <div class="text-center">
                        <h1 class="mt-5 text-2xl font-bold text-Red md:text-3xl">Get in touch</h1>
                        <p class="mt-1 mb-4 text-Red/50 dark:text-Red/80">Our friendly team is always here to chat...</p>
                    </div>

                    <div class="grid grid-cols-1 lg:gap-12 md:gap-3 gap-12 mt-10 md:grid-cols-3">
                        <div class="flex flex-col items-center justify-center text-center group">
                            <div className='flex items-center justify-center gap-3'>
                                <span class="p-2 text-Red rounded-full bg-Red/20 dark:bg-gray-800 group-hover:scale-110 duration-500 ring-2 ring-Red/30 animate-pulse">
                                    <FaEnvelopeCircleCheck />
                                </span>
                                <h2 class="text-xl font-bold text-Red">Email</h2>
                            </div>
                            <p class="mt-2 text-Red/50 dark:text-Red/90 text-sm">Our friendly team is here to help.</p>
                            <p class="mt-2 text-Red">hello@donora.com</p>
                        </div>

                        <div class="flex flex-col items-center justify-center text-center group">
                            <div className='flex items-center justify-center gap-3'>
                                <span class="p-2 text-Red rounded-full bg-Red/20 dark:bg-gray-800 group-hover:scale-110 duration-500 ring-2 ring-Red/30 animate-pulse">
                                    <FaMapLocation />
                                </span>
                                <h2 class="text-xl font-bold text-Red">Office</h2>
                            </div>
                            <p class="mt-2 text-Red/50 dark:text-Red/90 text-sm">Come say hello at our office HQ.</p>
                            <p class="mt-2 text-Red">100 Smith Street Collingwood VIC 3066 AU</p>
                        </div>

                        <div class="flex flex-col items-center justify-center text-center group">
                            <div className='flex items-center justify-center gap-3'>
                                <span class="p-2 text-Red rounded-full bg-Red/20 dark:bg-gray-800 group-hover:scale-110 duration-500 ring-2 ring-Red/30 animate-pulse">
                                    <FaPhoneAlt />
                                </span>
                                <h2 class="text-xl font-bold text-Red">Phone</h2>
                            </div>
                            <p class="mt-2 text-Red/50 dark:text-Red/90 text-sm">Everyday 24/7</p>
                            <p class="mt-2 text-Red">+1 (555) 000-0000</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;