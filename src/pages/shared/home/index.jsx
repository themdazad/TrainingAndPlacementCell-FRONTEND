
// sections
import Hero from "./sections/Hero.jsx"
import Announcements from "./sections/Announcements.jsx";
import VisionMission from "./sections/VisionMission.jsx";
import Testimonials from "./sections/Testimonials.jsx";
import SelectedStudentSlider from "./sections/SelectedStudentSlider.jsx";
import PastRecruiters from "./sections/PastRecruiters.jsx";
import Faq from "./sections/Faq.jsx";
export default function Home() {
  return (
    <main className="overflow-hidden max-w-[1980px] m-auto min-h-screen bg-white dark:bg-gray-900">
      {/* Hero section  */}
      <Hero/>
      <section className="py-6 m-auto">     
          <Announcements />
      </section>

      <section className="py-6 m-auto">
        <VisionMission />
      </section>

      <section className="py-6 m-auto">
        <SelectedStudentSlider />
      </section>

      <section className="py-6 m-auto">
        <PastRecruiters />
      </section>

      <section className="py-6 m-auto">
        <Testimonials />
      </section>

      <section className="py-6 m-auto">
        <Faq />
      </section>
    </main>
  );
}
