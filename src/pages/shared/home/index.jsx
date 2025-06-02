// sections
import Hero from "../../../components/shared/home/Hero.jsx";
import Announcements from "../../../components/shared/home/Announcements.jsx";
import AcademicPrograms from "../../../components/shared/home/AcademicPrograms.jsx";
import Testimonials from "../../../components/shared/home/Testimonials.jsx";
import SelectedStudentSlider from "../../../components/shared/home/SelectedStudentSlider.jsx";
import PastRecruiters from "../../../components/shared/home/PastRecruiters.jsx";
import Faq from "../../../components/shared/home/Faq.jsx";
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
