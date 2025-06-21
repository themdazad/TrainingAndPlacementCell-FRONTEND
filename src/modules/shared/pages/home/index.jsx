import Hero from "../../components/home/hero-section.jsx";
import Announcements from "../../components/home/notice-section.jsx";
// import SelectedStudentSlider from "../../components/home/selected-students.jsx";
import PastRecruiters from "../../components/home/past-recruiters-companies.jsx";
import PlacementDrives from "../../components/home/placement-drives.jsx";
import WorkshopsTraining from "../../components/home/workshops-training.jsx";
import Testimonials from "../../components/home/Testimonials.jsx";
import FaqFeedbackForm from "../../components/home/faq-feedback-form.jsx";
import HaveDoubts from "../../components/home/have-doubts-section.jsx";

export default function Home() {
  return (
    <main className="dark:bg-neutral-900">
      <section className="min-h-screen overflow-hidden space-y-10 lg:space-y-40 py-10">
        <Hero />
        <Announcements />
        <PlacementDrives />
        <WorkshopsTraining />
        <PastRecruiters />
        <Testimonials />
        <FaqFeedbackForm />
        <HaveDoubts />
      </section>
    </main>
  );
}
