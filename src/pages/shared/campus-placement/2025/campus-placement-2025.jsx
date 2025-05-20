import { motion } from "framer-motion";
import Slider from "react-slick";
import { Image } from "@heroui/react";

export default function CampusPlacements2025() {
  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    ltr: true,
  };
  return (
    <section className="min-h-[100dvh] m-auto max-w-[1980px] px-[5%] space-y-12">
      {/* Heading  */}
      <motion.div
        className="tracking-tight font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="block text-3xl md:text-5xl lg:text-6xl">
          Campus <br /> Placement 2025
        </p>
      </motion.div>

      {/* Placement Students*/}
      <div className="placed-student p-3 rounded-xl ">
        <div className="student-profile-container border-1 rounded-xl p-3">
          <div className="student-profile flex gap-3 flex-wrap">
            <Image
              className="min-h-[100px] max-h-[400px]"
              src="https://media.licdn.com/dms/image/v2/D5622AQEzwjsOXFH1fA/feedshare-shrink_800/B56ZZ6Lp4yHUAg-/0/1745806601545?e=1749081600&v=beta&t=HxfA4uB_pz-ptygdirtcVnpb0cFkhbU8f5M4exHtcJc"
            />
            <Image
              className="min-h-[100px] max-h-[400px]"
              src="https://media.licdn.com/dms/image/v2/D4E22AQGECyUT2jXRRQ/feedshare-shrink_800/B4EZVkUmz.GYAg-/0/1741144924975?e=1749081600&v=beta&t=_LcnTJpmll5MBdKYenvG8AY85--TdeKbSCPtl99uJ2s"
            />
            <Image
              className="min-h-[100px] max-h-[400px]"
              src="https://media.licdn.com/dms/image/v2/D4E22AQH6Ywpjz_dNYw/feedshare-shrink_800/B4EZT1PtyVH0Ag-/0/1739281331162?e=1749081600&v=beta&t=0jqY6oA-9l_n-TYJJJK-V9jryQfTqDb8EEdCFDz5Jgk"
            />
            <Image
              className="min-h-[100px] max-h-[400px]"
              src="https://media.licdn.com/dms/image/v2/D4E22AQFEGRpNtDafYQ/feedshare-shrink_800/B4EZPZgeZGHsAg-/0/1734521000826?e=1749081600&v=beta&t=G4l1UHWW2jLfnvF94kOW-lB52B2oUBFdj6OKGKSWCOA"
            />
            <Image
              className="min-h-[100px] max-h-[400px]"
              src="https://media.licdn.com/dms/image/v2/D4E22AQHzE5cWP-yVlw/feedshare-shrink_800/B4EZPJVHQAH0Ag-/0/1734249584313?e=1749081600&v=beta&t=M2oC8NYxJZoXWrQRc6VDkv32M-YaAxP4tfUar4z91Ss"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
