import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { TbDropletFilled } from 'react-icons/tb';
import { CiMedicalCross } from 'react-icons/ci';
import { FaCheck } from 'react-icons/fa';
import { GiTireIronCross } from 'react-icons/gi';
import { TiPlus } from 'react-icons/ti';

const BloodCompatibilityChart = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    // Blood type compatibility data
    const compatibilityData = {
        "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
        "O+": ["O+", "A+", "B+", "AB+"],
        "A-": ["A-", "A+", "AB-", "AB+"],
        "A+": ["A+", "AB+"],
        "B-": ["B-", "B+", "AB-", "AB+"],
        "B+": ["B+", "AB+"],
        "AB-": ["AB-", "AB+"],
        "AB+": ["AB+"]
    };

    const bloodTypes = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];


    // Function to render compatibility check (✔ or ✘)
    const checkCompatibility = (donor, recipient) => {
        return compatibilityData[donor].includes(recipient);
    };

    return (
        <motion.div
            className="lg:w-11/12 w-full mx-auto px-6 md:py-20 py-16 dark:bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h2 className="md:text-3xl text-2xl font-bold text-center text-Red mb-5 drop-shadow-lg">Blood Compatibility Chart</h2>

            <div className="">
                <table className="min-w-full rounded-md table-auto text-center border-collapse bg-red-50 dark:bg-Red/30">
                    <thead>
                        <tr>
                            <th className="text-Red font-semibold dark:font-bold"></th>
                            {bloodTypes.map((type, index) => (
                                <th
                                    key={index}
                                    className="text-Red font-semibold py-4"
                                    data-aos="fade-up"
                                >
                                    <span>{type}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bloodTypes.map((rowType, rowIndex) => (
                            <motion.tr key={rowIndex} data-aos="fade-up" className="border-t">
                                <td className="py-2 md:px-3 px-1 text-Red font-semibold">
                                    <div>{rowType}</div>
                                </td>
                                {bloodTypes.map((colType, colIndex) => (
                                    <motion.td
                                        key={colIndex}
                                        className={`font-bold transition-all rounded-lg m-2 w-32 md:py-9 text-white dark:bg-Red/20 ${checkCompatibility(rowType, colType) ? "bg-white" : "bg-white"
                                            } transform hover:scale-110 hover:shadow-lg`}
                                        data-aos="fade-up"
                                    >
                                        <div className="relative">
                                            <TbDropletFilled
                                                className='text-Red absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:text-5xl text-3xl'
                                                // size={50}  // Adjusted size of the droplet
                                            />
                                            <span className="relative z-10">
                                                {checkCompatibility(rowType, colType) ? (
                                                    <FaCheck
                                                        className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:text-xl md:text-3xl text-sm"
                                                        // size={20}
                                                    />
                                                ) : (
                                                    <p
                                                        className="text-white font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:text-4xl text-2xl"
                                                        // size={30}
                                                    >×</p>
                                                )}
                                            </span>

                                        </div>
                                    </motion.td>
                                ))}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default BloodCompatibilityChart;
