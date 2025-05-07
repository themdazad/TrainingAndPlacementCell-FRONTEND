
const logos = [
  {
    name: "prithivi pratap buildcon",
    link: "https://prithivipratapbuildcon.com/",
    url: "https://prithivipratapbuildcon.com/image/logo.png",
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

const AnimatedLogoCloud = () => {
  return (
    <div className="mx-auto w-full flex justify-center px-4">
      <div className="flex w-full flex-col  items-center justify-center gap-6 px-4 md:px-8">
        <div className="font-medium uppercase ">Our Recruiters</div>
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
                        className="max-h-12 px-2 mix-blend-multiply transition-all duration-500 hover:scale-110 saturate-0 hover:saturate-100 dark:invert"
                        alt={`${logo.name}`}
                      />
                    </a>
                    //   brightness-0 dark:invert
                  ))}
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogoCloud;