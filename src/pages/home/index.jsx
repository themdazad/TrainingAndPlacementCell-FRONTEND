import Hero from "./components/Hero";
import PastRecruiters from "./components/PastRecruiters";
import Announcements from "./components/Announcements";
import Testimonials from "./components/Testimonials";
import FaqFeedbackForm from "./components/FaqFeedbackForm";
import HaveDoubts from "./components/HaveDoubts";

export default function Home() {
  return (
    <main className="dark:bg-gray-950">
      <section className="min-h-screen m-auto overflow-hidden max-w-screen-xl space-y-16 lg:space-y-24">
        <Hero />
        <PastRecruiters />
        <Announcements />
        <Testimonials />
        <FaqFeedbackForm />
        <HaveDoubts />
      </section>
    </main>
  );
}
