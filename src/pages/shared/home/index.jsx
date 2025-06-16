import Hero from "../../../components/shared/home/Hero.jsx";
import Announcements from "../../../components/shared/home/Announcements.jsx";
import Testimonials from "../../../components/shared/home/Testimonials.jsx";
import SelectedStudentSlider from "../../../components/shared/home/SelectedStudentSlider.jsx";
import PastRecruiters from "../../../components/shared/home/PastRecruiters.jsx";
import FaqFeedbackForm from "../../../components/shared/home/faq-feedback-form.jsx";
import HaveDoubts from "../../../components/shared/home/HaveDoubts.jsx";
import Workshops from "../../../components/shared/home/workshops.jsx";

export default function Home() {
  return (
    <main className="dark:bg-neutral-900">
      <section className="min-h-screen overflow-hidden space-y-10">
        <Hero />
        <Announcements />
        <Workshops/>
        <SelectedStudentSlider />
        <PastRecruiters />
        <Testimonials />
        <FaqFeedbackForm />
        <HaveDoubts />
      </section>
    </main>
  );
}
