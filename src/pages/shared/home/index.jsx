// sections
import Hero from "./sections/Hero.jsx";
import Announcements from "./sections/Announcements.jsx";
import AcademicPrograms from "./sections/AcademicPrograms.jsx";
import Testimonials from "./sections/Testimonials.jsx";
import SelectedStudentSlider from "./sections/SelectedStudentSlider.jsx";
import PastRecruiters from "./sections/PastRecruiters.jsx";
import Faq from "./sections/Faq.jsx";
export default function Home() {
  return (
    <main className="overflow-hidden max-w-[1980px] m-auto min-h-screen bg-white dark:bg-stone-900">
      <Hero />
      <Announcements />
      <AcademicPrograms />
      <SelectedStudentSlider />
      <PastRecruiters />
      <Testimonials />
      <Faq />
    </main>
  );
}
