import Hero from "../../components/home/hero-section.jsx";
import Announcements from "../../components/home/notice-section.jsx";
import PastRecruiters from "../../components/home/past-recruiters-companies.jsx";
import PlacementDrives from "../../components/home/placement-drives-section.jsx";
import Testimonials from "../../components/home/Testimonials.jsx";
import FaqFeedbackForm from "../../components/home/faq-feedback-form.jsx";
import HaveDoubts from "../../components/home/have-doubts-section.jsx";

export default function Home() {
  return (
    <main className="dark:bg-neutral-900">
      <section className="min-h-screen overflow-hidden space-y-16 lg:space-y-32">
        <Hero />
        <Announcements />
        <PlacementDrives />
        <PastRecruiters />
        <Testimonials />
        <FaqFeedbackForm />
        <HaveDoubts />
      </section>
    </main>
  );
}
