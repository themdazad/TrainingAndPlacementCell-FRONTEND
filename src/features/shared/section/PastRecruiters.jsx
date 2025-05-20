
const logos = [
  {
    name: "prithivi pratap buildcon",
    link: "https://prithivipratapbuildcon.com/",
    url: "https://prithivipratapbuildcon.com/image/logo.png",
  },
  {
    name: "high-technext engineering & telecom pvt ltd",
    link: "https://high-technext.com/",
    url: "https://blogger.googleusercontent.com/img/a/AVvXsEhrpjspiyfkKTXyAVTyuK7w8CcTYv1O-o8trPlYN0a1z3kMbnxZc01rJVFaQTnxRJHsl4Nwau_NWroWWHxwbnuADKpK4ObApMVmSEiVAiHwMaZk1aiZxOeQMpW6ZxeoH9d0bJ1v4edV5rAKlCd5ULSBoWUnYUTuf8GVSNyG9wptaLhLvL5U0QnHCiVJLg",
  },
  {
    name: "QSpider/JSpider",
    url: "https://placements.pyspiders.com/sites/default/files/s1600-w664-3_1.jpeg",
  },
  {
    name: "Salesforge",
    link: "https://www.salesforce.com/in/",
    url: "https://logodix.com/logo/86351.png",
  },
  {
    name: "TCS",
    link: "https://www.tcs.com/",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTPAWYqoR1E-YMPwd869I0X2WuToOjTrPXgQ&s",
  },
  {
    name: "BHEL",
    url: "https://th.bing.com/th/id/OIP.rQXXfTaHvqmBjhOjGJFyfAHaEA?rs=1&pid=ImgDetMain",
  },
  {
    name: "Rinex Logo",
    link: "https://rinex.ai/",
    url: "https://www.sret.edu.in/images/Placement/logo/RInex.png",
  },
  {
    name: "Ecospace infra",
    link: "https://www.ecospaceinfra.com/wp-content/uploads/2019/06/LOGO-3.png",
    url: "https://www.ecospaceinfra.com/wp-content/uploads/2019/06/LOGO-3.png",
  },
  {
    name: "Subros limited",
    link: "https://subros.com/",
    url: "https://tse4.mm.bing.net/th?id=OIP.MxbqpqV51-L4PNVOIR_BGwHaB1&rs=1&pid=ImgDetMain",
  },
  {
    name: "argumentik software private limited",
    link: "https://agumentiksoftware.com/",
    url: "https://th.bing.com/th/id/R.ba2981bc542e78ac8b5188ae54f74191?rik=FJ%2fblXUhmQ%2fUtA&riu=http%3a%2f%2fagumentiksoftware.com%2fimages%2fSOFTWARERED%26BLACK.png&ehk=Lbw42WINhMkZEZCN8X0hf74K2l1ccyrNOky38md6viU%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    name: "nissi engineering solution pvt ltd",
    link: "https://nissi.co.in/",
    url: "https://th.bing.com/th/id/OIP.uHxfZSoiW2LbqQ6CEWGsPgHaC-?rs=1&pid=ImgDetMain",
  },
  {
    name: "CISCO",
    link: "https://www.cisco.com/",
    url: "https://1000logos.net/wp-content/uploads/2016/11/Cisco-logo.png",
  },
];

const PastRecruiters2 = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900 text-center overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-10">
        Past Recruiters
      </h2>

      <div
        className="relative max-h-[360px] overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to top, transparent 0%, black 30%, black 70%, transparent 95%)",
          WebkitMaskImage:
            "linear-gradient(to top, transparent 0%, black 30%, black 70%, transparent 95%)",
        }}
      >
        <div className="animate-scroll-up w-[80%] md:w-[70%] lg:w-[50%] m-auto space-y-12">
          {[...Array(2)].map((_, repeatIndex) => (
            <div
              key={repeatIndex}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-y-3 justify-items-center"
            >
              {logos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="w-32 h-20 flex items-center justify-center"
                >
                  {logo.link ? (
                    <a
                      href={logo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={logo.url}
                        alt={logo.name}
                        className="max-h-16 object-contain transition"
                      />
                    </a>
                  ) : (
                    <img
                      src={logo.url}
                      alt={logo.name}
                      className="max-h-16 object-contain grayscale hover:grayscale-0 transition"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">and more</p>
    </section>
  );
};
const PastRecruiters = () => {
  return (
    <div className="mx-auto w-full flex justify-center px-4">
      <div className="flex flex-col items-center justify-center gap-6 px-4 md:px-8">
        {/* title */}
        <div className="py-[24px] text-2xl md:text-[32px] font-extrabold">
          Past Recruiters
        </div>
        {/* logos */}
        <div
          className="group relative flex justify-center gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map(
              (
                _,
                index // Use the second argument of map for the index
              ) => (
                <div
                  key={index}
                  className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
                >
                  {logos.map((logo, key) => (
                    <a href={`${logo.link}`} target="_blank">
                      <img
                        key={key}
                        src={logo.url}
                        className="max-h-12 px-2 mix-blend-multiply saturate-0 hover:saturate-100 transition-all duration-500 hover:scale-110 dark:invert"
                        alt={`${logo.name}`}
                      />
                    </a>
                    
                  ))}
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default PastRecruiters;