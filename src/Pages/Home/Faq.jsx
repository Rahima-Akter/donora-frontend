import React from 'react';
import { TbDropletFilled } from 'react-icons/tb';

const Faq = () => {
    return (
        <section class="bg-white dark:bg-black w-11/12 mx-auto">
            <div class="container px-6 py-12 mx-auto">
                <h1 class="font-bold text-Red drop-shadow-lg text-3xl dark:text-white">Frequently Asked Questions.</h1>

                <div class="grid grid-cols-1 gap-8 mt-8 lg:mt-12 md:grid-cols-2 xl:grid-cols-3">
                    <div>
                        <div class="inline-block p-2 animate-pulse text-Red text-2xl bg-Red/40 rounded-lg">
                            <TbDropletFilled />
                        </div>

                        <div>
                            <h1 class="text-lg font-bold text-Red dark:text-white">What should I do to prepare for blood donation?</h1>

                            <p class="mt-2 text-sm text-Red/50 dark:text-gray-300">
                                Ensure you are well-hydrated, have eaten a healthy meal, and are well-rested before donating blood. Avoid alcohol and smoking at least 24 hours before donation.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div class="inline-block p-2 animate-pulse text-Red text-2xl bg-Red/40 rounded-lg">
                            <TbDropletFilled />
                        </div>

                        <div>
                            <h1 class="text-lg font-bold text-Red dark:text-white">How does Donora ensure my privacy?</h1>

                            <p class="mt-2 text-sm text-Red/50 dark:text-gray-300">
                                Donora takes your privacy seriously. All your personal information is stored securely and is only shared with verified recipients during urgent blood requests.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div class="inline-block p-2 animate-pulse text-Red text-2xl bg-Red/40 rounded-lg">
                            <TbDropletFilled />
                        </div>

                        <div>
                            <h1 class="text-lg font-bold text-Red dark:text-white">How can I become a donor on Donora?</h1>

                            <p class="mt-2 text-sm text-Red/50 dark:text-gray-300">
                                To become a donor, simply register on our website, complete your profile with accurate health information, and start responding to donation requests.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div class="inline-block p-2 animate-pulse text-Red text-2xl bg-Red/40 rounded-lg">
                            <TbDropletFilled />
                        </div>

                        <div>
                            <h1 class="text-lg font-bold text-Red dark:text-white"> Is blood donation safe?</h1>

                            <p class="mt-2 text-sm text-Red/50 dark:text-gray-300">
                                Yes, donating blood is completely safe. Sterile equipment is used for every donation, ensuring no risk of infections or diseases.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div class="inline-block p-2 animate-pulse text-Red text-2xl bg-Red/40 rounded-lg">
                            <TbDropletFilled />
                        </div>

                        <div>
                            <h1 class="text-lg font-bold text-Red dark:text-white">How often can I donate blood?</h1>

                            <p class="mt-2 text-sm text-Red/50 dark:text-gray-300">
                                Whole blood donations can be made every 56 days (8 weeks) for men and every 84 days (12 weeks) for women. However, donation intervals may vary for plasma or platelets.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div class="inline-block p-2 animate-pulse text-Red text-2xl bg-Red/40 rounded-lg">
                            <TbDropletFilled />
                        </div>

                        <div>
                            <h1 class="text-lg font-bold text-Red dark:text-white"> Who can donate blood?</h1>

                            <p class="mt-2 text-sm text-Red/50 dark:text-gray-300">
                                Healthy individuals aged 18-65, weighing at least 50 kg (110 lbs), and meeting the general health requirements can donate blood. Make sure you haven't donated blood in the last 8-12 weeks, depending on your country's guidelines.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;