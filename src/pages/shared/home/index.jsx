// sections
import Hero from "../../../features/shared/home/Hero.jsx";
import Announcements from "../../../features/shared/home/Announcements.jsx";
import AcademicPrograms from "../../../features/shared/home/AcademicPrograms.jsx";
import Testimonials from "../../../features/shared/home/Testimonials.jsx";
import SelectedStudentSlider from "../../../features/shared/home/SelectedStudentSlider.jsx";
import PastRecruiters from "../../../features/shared/home/PastRecruiters.jsx";
import Faq from "../../../features/shared/home/Faq.jsx";
export default function Home() {
  return (
    <main className="overflow-hidden max-w-[1980px] m-auto min-h-screen bg-white dark:bg-zinc-900">
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
