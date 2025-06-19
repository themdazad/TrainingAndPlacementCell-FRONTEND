import Hero from "../../components/home/Hero.jsx";
import Announcements from "../../components/home/Announcements.jsx";
import Testimonials from "../../components/home/Testimonials.jsx";
import SelectedStudentSlider from "../../components/home/SelectedStudentSlider.jsx";
import PastRecruiters from "../../components/home/PastRecruiters.jsx";
import FaqFeedbackForm from "../../components/home/faq-feedback-form.jsx";
import HaveDoubts from "../../components/home/HaveDoubts.jsx";
import PlacementDrives from "../../components/home/placement-drives.jsx";
import WorkshopsTraining from "../../components/home/workshops-training.jsx";

export default function Home() {
  return (
    <main className="dark:bg-neutral-900">
      <section className="min-h-screen overflow-hidden space-y-10 lg:space-y-24 py-10">
        <Hero />
        <Announcements />
        <PlacementDrives />
        <WorkshopsTraining />
        <SelectedStudentSlider />
        <PastRecruiters />
        <Testimonials />
        <FaqFeedbackForm />
        <HaveDoubts />
      </section>
    </main>
  );
}
