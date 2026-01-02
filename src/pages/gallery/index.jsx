import { Image } from '@heroui/react';
import { galleryData } from '../../data/galleryData.js';

export default function Gallery() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <div className="m-auto max-w-screen-xl px-[5%] sm:px-[4%] space-y-10 lg:space-y-20 py-10">
        {/* 📸 Banner Section */}
        <div className="relative overflow-hidden rounded-3xl shadow-md">
          <img
            src="/gallery/2025/others/banner.jpg"
            alt="Gallery Banner"
            className="w-full aspect-[21/9] max-md:aspect-video object-cover object-center"
          />
          <div className="max-md:hidden absolute inset-0 bg-gradient-to-t from-slate-200/70 to-slate-200/0 dark:from-slate-800/70 dark:to-slate-800/0  py-10  flex flex-col justify-end text-center px-4">
            <h1 className="text-md sm:text-4xl font-bold py-4 drop-shadow">
              Government Engineering College, Siwan
            </h1>
            <blockquote>
              The dedicated faculty of Government Engineering College Siwan stand united, shaping
              the future with knowledge, care, and commitment.
            </blockquote>
          </div>
        </div>

        {/* 📅 Year-wise Gallery Section */}
        {galleryData.map((yearBlock, i) => (
          <section key={i} className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold border-b pb-2 border-slate-300 dark:border-slate-700">
              Year {yearBlock.year}
            </h2>

            {yearBlock.events.map((event, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-500 dark:text-blue-300">
                  {event.title}
                </h3>

                {/* Uploaded Images: Masonry Layout */}
                {event.type === 'upload' && (
                  <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                    {event.images.map((src, imgIdx) => (
                      <div
                        key={imgIdx}
                        className="break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white dark:bg-slate-800"
                      >
                        <Image
                          src={src}
                          alt={`${event.title} ${imgIdx + 1}`}
                          className="w-full h-auto object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Embedded Posts */}
                {event.type === 'embed' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {event.embeds.map((url, embedIdx) => (
                      <div key={embedIdx} className="w-full aspect-[4/3]">
                        <iframe
                          src={url}
                          title={`embed-${embedIdx}`}
                          className="w-full h-full border rounded-xl"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
