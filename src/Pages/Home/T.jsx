import Marquee from "react-fast-marquee";

const T = () => {
  return (
    <div>
      <section className="pt-8">
        <div className=" px-4 lg:w-10/12 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 drop-shadow-md">Trusted By</h2>
          <div className="overflow-hidden">
            <Marquee pauseOnHover={true} className="flex justify-center gap-8">
              <img
                src="https://thafd.bing.com/th?q=Hospital+Logo+Design+PNG&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-WW&cc=BD&setlang=en&adlt=moderate&t=1&mw=247"
                alt="Hospital A"
                className="w-16 h-16 object-cover rounded-full opacity-70 hover:opacity-100 transition mx-6"
              />
              <img
                src="https://thafd.bing.com/th/id/OIP.CqhsknUMsep1K0lrmWrBpQHaHa?w=146&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                alt="Hospital B"
                className="w-16 h-16 object-cover rounded-full opacity-70 hover:opacity-100 transition mx-6"
              />
              <img
                src="https://static.vecteezy.com/system/resources/previews/011/640/711/original/simple-modern-hospital-logo-with-healthcare-medical-template-vector.jpg"
                alt="NGO X"
                className="w-16 h-16 object-cover rounded-full opacity-70 hover:opacity-100 transition mx-6"
              />
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.w8u-q6Ye_00Biw2014R2wgHaIE?rs=1&pid=ImgDetMain"
                alt="Hospital A"
                className="w-16 h-16 object-cover rounded-full opacity-70 hover:opacity-100 transition mx-6"
              />
              <img
                src="https://www.doctorspedia.co/uploads/hospital/64c53273eec91.png"
                alt="Hospital B"
                className="w-16 h-16 object-cover rounded-full opacity-70 hover:opacity-100 transition mx-6"
              />
              <img
                src="https://tse3.mm.bing.net/th/id/OIP.-09Jb-SbjYoYTvusi7HusQAAAA?pid=ImgDet&w=178&h=173&c=7&dpr=1.5"
                alt="NGO X"
                className="w-16 h-16 object-cover rounded-full opacity-70 hover:opacity-100 transition mx-6"
              />
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.w8u-q6Ye_00Biw2014R2wgHaIE?rs=1&pid=ImgDetMain"
                alt="Hospital A"
                className="w-16 h-16 object-cover rounded-full opacity-70 hover:opacity-100 transition mx-6"
              />
              <img
                src="https://www.doctorspedia.co/uploads/hospital/64c53273eec91.png"
                alt="Hospital B"
                className="w-16 h-16 object-cover rounded-full opacity-70 hover:opacity-100 transition mx-6"
              />
              <img
                src="https://tse3.mm.bing.net/th/id/OIP.-09Jb-SbjYoYTvusi7HusQAAAA?pid=ImgDet&w=178&h=173&c=7&dpr=1.5"
                alt="NGO X"
                className="w-16 h-16 object-cover rounded-full opacity-70 hover:opacity-100 transition mx-6"
              />
              <img
                src="https://static.vecteezy.com/system/resources/previews/011/640/711/original/simple-modern-hospital-logo-with-healthcare-medical-template-vector.jpg"
                alt="NGO X"
                className="w-16 h-16 object-cover rounded-full opacity-70 hover:opacity-100 transition mx-6"
              />
            </Marquee>
            <marquee behavior="" direction=""></marquee>
          </div>
        </div>
      </section>
    </div>
  );
};

export default T;
