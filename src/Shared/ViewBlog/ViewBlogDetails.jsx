import { useLoaderData } from "react-router-dom";
import banner from "../../assets/detailBg.JPG";
import { format } from "date-fns";
import { FaCalendar } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ViewBlogDetails = () => {
  const detail = useLoaderData();
  return (
    <div className="md:mt-[82px] mt-[65px]">
      <Helmet>
        <title>DONORA || Blog</title>
      </Helmet>

      {/* Hero Section with Parallax + Glitch Effect */}
      <div className="relative h-[70vh] overflow-hidden group">
        <div
          className="w-full h-full absolute inset-0 bg-fixed bg-center bg-cover transition-all duration-1000 group-hover:scale-110"
          style={{ backgroundImage: `url(${banner})` }}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-red-900/30 to-transparent"></div>

          {/* Glitch text effect on hover */}
          <div className="w-10/12 mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl border border-red-500/30 hover:border-red-500 transition-all duration-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]">
              <h1
                className="font-bold text-4xl md:text-6xl text-center text-white glitch-text"
                data-text={detail.title}
              >
                {detail.title}
              </h1>
              <p className="mt-4 text-red-300 flex items-center justify-center gap-2 text-lg">
                <FaCalendar className="animate-pulse" />
                <span className="font-mono tracking-wider">
                  {format(new Date(detail.createdAt), "P")}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Floating blood cells animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-red-500/80 animate-float"
              style={{
                width: `${Math.random() * 12 + 8}px`,
                height: `${Math.random() * 12 + 8}px`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
                filter: `blur(${Math.random() * 2 + 1}px)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content & Image with Equal Heights */}
      <div className="relative py-10 px-6 md:px-16 flex xl:flex-row flex-col justify-center items-stretch group">
        {/* Text Content */}
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg p-8 rounded-tl-2xl rounded-bl-2xl shadow-2xl border-t border-l border-b border-gray-200 dark:border-red-900/50 xl:w-1/2 flex flex-col min-h-[400px]">
          <div className="relative overflow-hidden flex-grow">
            {/* Scrolling content with fade effect */}
            <div className="h-full overflow-y-auto pr-4 custom-scrollbar">
              <p className="font-semibold text-lg dark:text-gray-300 typewriter">
                {detail.content}
              </p>
            </div>

            {/* Gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/90 dark:from-gray-900/90 to-transparent pointer-events-none"></div>
          </div>

          {/* Decorative blood drip at bottom */}
          <div className="relative h-4 mt-4">
            <div className="absolute -bottom-2 left-0 right-0 h-4 bg-red-500 rounded-b-lg opacity-20"></div>
            <div className="absolute -bottom-4 left-1/4 w-2 h-6 bg-red-500 rounded-t-full opacity-60"></div>
            <div className="absolute -bottom-3 right-1/3 w-3 h-5 bg-red-500 rounded-t-full opacity-40"></div>
          </div>
        </div>

        {/* Image Container */}
        <div className="xl:w-1/2 flex items-center min-h-[400px] overflow-hidden relative">
          <div className=" w-full h-full perspective-1000">
            {/* Main Image with 3D tilt effect */}
            <img
              src={detail.thumb}
              alt=""
              className="w-full h-full object-cover rounded-tr-2xl rounded-br-2xl shadow-xl border-t-4 border-r-4 border-b-4 border-red-500/20 transform transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:border-red-500/40 overflow-hidden"
            />

            {/* Reflection effect */}
            <div className="absolute -bottom-6 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl"></div>

            {/* Floating label */}
          </div>
        </div>
        <div className="absolute top-6 right-8 bg-red-500 text-white px-3 py-1 rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <span className="font-bold text-sm">DONORA BLOG</span>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx global>{`
        /* Glitch text effect */
        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }
        .glitch-text::before {
          color: #f43f5e;
          z-index: -1;
          animation: glitch-effect 3s infinite;
        }
        .glitch-text::after {
          color: #3b82f6;
          z-index: -2;
          animation: glitch-effect 2s infinite reverse;
        }
        @keyframes glitch-effect {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-3px, 3px);
          }
          40% {
            transform: translate(-3px, -3px);
          }
          60% {
            transform: translate(3px, 3px);
          }
          80% {
            transform: translate(3px, -3px);
          }
          100% {
            transform: translate(0);
          }
        }

        /* Floating animation */
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0) rotate(360deg);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }

        /* Typewriter effect */
        .typewriter {
          overflow: hidden;
          border-right: 3px solid #f43f5e;
          white-space: pre-wrap;
          animation: typing 3.5s steps(40, end),
            blink-caret 0.75s step-end infinite;
        }
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: #f43f5e;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewBlogDetails;
