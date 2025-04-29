import React from "react";
import {
  FaClipboardCheck,
  FaUserMd,
  FaSyringe,
  FaHeart,
  FaGift,
} from "react-icons/fa";

const DonationProcess = () => {
  const steps = [
    {
      icon: <FaClipboardCheck className="text-3xl text-red-600" />,
      title: "Registration",
      desc: "Fill out a quick form with your basic details and health history.",
    },
    {
      icon: <FaUserMd className="text-3xl text-red-600" />,
      title: "Health Check",
      desc: "A mini-physical checks your temperature, hemoglobin, and blood pressure.",
    },
    {
      icon: <FaSyringe className="text-3xl text-red-600" />,
      title: "Donation",
      desc: "A sterile needle is used to collect blood (takes 8-10 minutes).",
    },
    {
      icon: <FaHeart className="text-3xl text-red-600" />,
      title: "Refreshment",
      desc: "Enjoy snacks and drinks to replenish energy before leaving.",
    },
    {
      icon: <FaGift className="text-3xl text-red-600" />,
      title: "Save Lives!",
      desc: "Your donation is tested, stored, and sent to hospitals in need.",
    },
  ];

  return (
    <section className="md:pb-16 pb-5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-9">
          <h2 className="md:text-4xl text-3xl font-bold text-Red dark:text-white mb-1 drop-shadow-md">
            The <span className="text-Red">Donation</span> Process
          </h2>
          <p className="md:text-lg text-sm text-Red max-w-2xl mx-auto">
            Donating blood is simple, safe, and saves lives. Here’s what to
            expect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-red-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="mb-4 p-3 bg-red-50 rounded-full ring-1 dark:ring-red-500 ring-red-200 animate-none"><span className="animate-pulse">
              {step.icon}</span></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
              <span className="mt-4 text-sm font-medium text-red-600">
                Step {index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationProcess;
