import { Button, Image } from "@heroui/react";
import { TPOCoordinators } from "./TPOCoordinators";
import { FaDownload } from "react-icons/fa6";
import { FacultyInCharge } from "./FacultyInCharge";

export default function ContactUs(){
    return (
        <section className="max-w-[1920px] m-auto  md:px-[10%] px-[5%] gap-y-12 py-8 ">
          <div className="space-y-[80px]">
            <div className="qr_code max-w-[200px] m-auto">
              <a
                href="https://www.linkedin.com/company/tpogecsiwan/posts/?feedView=all"
                target="_blank"
              >
                <Image src="/assets/linkedin_qr.png" alt="Likedin_qr_code" />
              </a>
            </div>
            <div className="_contents text-center grid">
              <h2 className="text-xl md:text-2xl font-semibold">
                <span className="text-sky-600">About</span> Taining and Placement
                Cell
              </h2>
              <p className="my-3">
                The Training and Placement Cell of Government Engineering College,
                Siwan is dedicated to enhancing the career prospects of students by
                providing industry-relevant training, skill development, and campus
                placement opportunities. We facilitate campus recruitment drives,
                workshops, and internships, helping students bridge the gap between
                academics and the professional world. Our strong industry ties
                ensure that students are well-prepared to secure successful
                placements in top companies across various sectors.
              </p>
              <Button
                className="place-self-center"
                variant="bordered"
                radius="full"
                size=""
                color="warning"
              >
                {" "}
                Download Brochure <FaDownload />
              </Button>
            </div>
          </div>
          <FacultyInCharge />
          <TPOCoordinators />
        </section>
      );
}


export const Contact_Section = () => {
  return (
    <>
      <section className="max-w-[1440px] m-auto space-y-[80px]">
        <div className="qr_code max-w-[200px] m-auto">
          <a href="https://www.linkedin.com/company/tpogecsiwan/posts/?feedView=all">
            <Image src="/assets/linkedin_qr.png" alt="Likedin_qr_code" />
          </a>
        </div>

        <div className="_contents text-center grid">
          <h2 className="text-xl md:text-2xl font-semibold">
            <span className="text-sky-600">About</span> Taining and Placement
            Cell
          </h2>
          <p className="my-3">
            The Training and Placement Cell of Government Engineering College,
            Siwan is dedicated to enhancing the career prospects of students by
            providing industry-relevant training, skill development, and campus
            placement opportunities. We facilitate campus recruitment drives,
            workshops, and internships, helping students bridge the gap between
            academics and the professional world. Our strong industry ties
            ensure that students are well-prepared to secure successful
            placements in top companies across various sectors.
          </p>
          <Button
            className="place-self-center"
            variant="bordered"
            radius="full"
            size=""
            color="primary"
          >
            {" "}
            Download Brochure <FaDownload />
          </Button>
        </div>
      </section>
    </>
  );
};
