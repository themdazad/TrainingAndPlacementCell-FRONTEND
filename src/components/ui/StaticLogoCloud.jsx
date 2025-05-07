const logos = [
  {
    name: "nielit gov",
    link: "https://nielit.gov.in/",
    url: "https://nielit.gov.in/images/NIELIT_logo.jpg",
  },
  {
    name: "Internshala",
    link: "https://internshala.com",
    url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Internshala_company_logo.png/250px-Internshala_company_logo.png",
  },
];

const StaticLogoCloud = () => {
  return (
    <div className="w-full py-12">
      <div className="flex w-full flex-col items-center justify-center gap-6 px-4 md:px-8">
        <div className="font-medium uppercase">Internship Partners</div>
        <div className="grid grid-cols-3 gap-x-6 md:grid-cols-5 lg:grid-cols-6">
          {logos.map((logo, key) => (
            <a href={`${logo.link}`} target="_blank" key={key}>
            <img
              src={logo.url}
              className="h-10 w-28 px-2 saturate-0 hover:saturate-100 dark:invert"
              alt={`${logo.name}`}
            />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaticLogoCloud;
