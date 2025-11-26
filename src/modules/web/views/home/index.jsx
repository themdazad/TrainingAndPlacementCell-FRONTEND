import Hero from "../../components/home/hero-section.jsx";
import Announcements from "../../components/home/notice-section.jsx";
import PastRecruiters from "../../components/home/past-recruiters-companies.jsx";
import Testimonials from "../../components/home/Testimonials.jsx";
import FaqFeedbackForm from "../../components/home/faq-feedback-form.jsx";
import HaveDoubts from "../../components/home/have-doubts-section.jsx";
import AcademicPrograms from "../../components/about-us/AcademicPrograms.jsx";

export default function Home() {
  return (
    <main className="dark:bg-gray-950">
      <section className="min-h-screen m-auto overflow-hidden max-w-screen-xl space-y-16 lg:space-y-24">
        <Hero />
        <PastRecruiters />
        <Announcements />
        <AcademicPrograms/>
        <Testimonials />
        <FaqFeedbackForm />
        <HaveDoubts />
      </section>
    </main>
  );
}
