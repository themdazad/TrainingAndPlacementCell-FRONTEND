import { Image } from '@heroui/react';

export default function Alumni() {
  return (
    <main className="about-us">
      <div className="m-auto max-w-screen-xl px-4 space-y-10 lg:space-y-24 py-10">
        <section className="grid grid-cols-1 place-items-center">
          <Image
            src="/images/logos/alumni-community-logo.png"
            height={500}
            alt={'gec-siwan-alumnies'}
          />
        </section>
      </div>
    </main>
  );
}
