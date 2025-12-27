import { PastRecruitersData } from "../../../data/past-recruiters-data";

const PastRecruiters = () => {
  return (
    <section className="max-w-screen-2xl mx-auto px-[2%] py-6 flex flex-col items-center gap-8">
     
      {/* Auto-scrolling logos */}
      <div
        className="relative flex overflow-hidden p-2"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%)",
        }}
      >
        {Array.from({ length: 5 }).map((_, loopIndex) => (
          <div
            key={loopIndex}
            className="flex shrink-0 animate-logo-cloud gap-6"
          >
            {PastRecruitersData.map((logo, logoIndex) => (
              <a
                href={logo.link}
                key={`${loopIndex}-${logo.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="max-h-12 saturate-0 contrast-150 px-2 object-contain mix-blend-multiply transition-transform duration-500 hover:scale-110"
                />
              </a>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PastRecruiters;
