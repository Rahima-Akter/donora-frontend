import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { TbDropletFilled } from "react-icons/tb";
import { CiMedicalCross } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { GiTireIronCross } from "react-icons/gi";
import { TiPlus } from "react-icons/ti";

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
    "AB+": ["AB+"],
  };

  const bloodTypes = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

  // Function to render compatibility check (✔ or ✘)
  const checkCompatibility = (donor, recipient) => {
    return compatibilityData[donor].includes(recipient);
  };

  return (
    <motion.div
      className="w-full mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      data-aos="fade-in"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="text-center mb-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <motion.h2
            className="text-4xl font-bold text-red-600 dark:text-red-500 mb-1"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Blood Compatibility Guide
          </motion.h2>
          <p
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Find out which blood types can donate to or receive from others
          </p>
        </div>

        <div
          className="overflow-x-auto"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <table className="w-full rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
            <thead>
              <tr className="bg-red-600 dark:bg-red-700 text-white">
                <th
                  className="p-4 text-left font-bold text-lg"
                  data-aos="fade-right"
                  data-aos-delay="400"
                >
                  Donor →<br />
                  Recipient ↓
                </th>
                {bloodTypes.map((type, index) => (
                  <motion.th
                    key={index}
                    className="p-4 font-bold text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    data-aos="fade-down"
                    data-aos-delay={400 + index * 100}
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-xl">{type}</span>
                    </div>
                  </motion.th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloodTypes.map((rowType, rowIndex) => (
                <motion.tr
                  key={rowIndex}
                  className={`border-t border-gray-200 dark:border-gray-700 ${
                    rowIndex % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-700/30"
                      : "bg-white dark:bg-gray-800"
                  }`}
                  whileHover={{ backgroundColor: "rgba(220, 38, 38, 0.05)" }}
                  transition={{ duration: 0.3 }}
                  data-aos="fade-up"
                  data-aos-delay={500 + rowIndex * 50}
                >
                  <td
                    className="p-4 font-semibold text-red-600 dark:text-red-400"
                    data-aos="fade-right"
                    data-aos-delay={550 + rowIndex * 50}
                  >
                    <div className="flex items-center">
                      <TbDropletFilled className="mr-2 text-xl" />
                      {rowType}
                    </div>
                  </td>
                  {bloodTypes.map((colType, colIndex) => (
                    <motion.td
                      key={colIndex}
                      className={`p-2 text-center ${
                        checkCompatibility(rowType, colType)
                          ? "bg-green-50 dark:bg-green-900/20"
                          : "bg-red-50 dark:bg-red-900/20"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      data-aos="zoom-in"
                      data-aos-delay={600 + rowIndex * 30 + colIndex * 20}
                    >
                      <div className="relative h-16 w-16 mx-auto flex items-center justify-center">
                        <TbDropletFilled
                          className={`absolute text-4xl ${
                            checkCompatibility(rowType, colType)
                              ? "text-green-500/20"
                              : "text-red-500/20"
                          }`}
                        />
                        {checkCompatibility(rowType, colType) ? (
                          <FaCheck className="text-green-600 dark:text-green-400 text-2xl z-10" />
                        ) : (
                          <span className="text-red-600 dark:text-red-400 font-bold text-2xl z-10">
                            ×
                          </span>
                        )}
                      </div>
                    </motion.td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="mt-8 flex flex-wrap justify-center gap-4"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Compatible</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm">Not Compatible</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BloodCompatibilityChart;
