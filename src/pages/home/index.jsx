import Hero from './components/Hero';
import PastRecruiters from './components/PastRecruiters';
import Announcements from './components/Announcements';
import Testimonials from './components/Testimonials';
import HaveDoubts from './components/HaveDoubts';

export default function Home() {
  return (
    <main className="dark:bg-gray-950 relative overflow-hidden">
      {/* Grid background pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(120,120,120,0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,120,120,0.13) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
        }}
      />
      <section className="relative z-10 min-h-screen m-auto overflow-hidden max-w-screen-xl space-y-16 lg:space-y-24">
        <Hero />
        <Announcements />
        <PastRecruiters />
        <Testimonials />
        <HaveDoubts />
      </section>
    </main>
  );
}
