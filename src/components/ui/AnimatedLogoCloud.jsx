
const logos = [
  {
    name: "prithivi pratap buildcon",
    url: "https://prithivipratapbuildcon.com/image/logo.png",
  },

  {
    name: "QSpider/JSpider",
    url: "https://placements.pyspiders.com/sites/default/files/s1600-w664-3_1.jpeg",
  },
  {
    name: "TCS",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTPAWYqoR1E-YMPwd869I0X2WuToOjTrPXgQ&s",
  },
];

const AnimatedLogoCloud = () =>{
  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
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
                    <img
                      key={key}
                      src={logo.url}
                      className="max-h-16 px-2 mix-blend-multiply saturate-0 transition-all duration-500 hover:scale-110 hover:saturate-100"
                      alt={`${logo.name}`}
                    />
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