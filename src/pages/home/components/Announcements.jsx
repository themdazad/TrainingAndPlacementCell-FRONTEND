import { BellDot } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { announcementsAPI } from '../../../api';

export default function Announcements() {
  return (
    <section className="news-notice-container section  grid grid-cols-1 ">
      <Notice />
    </section>
  );
}
export function Notice() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // 🔍 search

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await announcementsAPI.getPublicAnnouncements({ limit: 50 });
        setData(response.data.data.announcements || []);
      } catch (err) {
        setError(err?.message || 'Failed to fetch announcements');
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Filter notices by searchTerm
  const filteredNotices = data.filter((item) =>
    (item.title + (item.description || '')).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <section className="py-6">
      <motion.div
        initial={{ y: 10 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, delay: 1, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.2 }}
        className="latest-updates-section max-w-screen-2xl overflow-hidden m-auto px-[2%]"
      >
        <div className="bg-neutral-100 dark:bg-gray-900 min-w-full rounded-3xl max-md:border-y-4 md:border-x-4 border-blue-500 p-3 px-6 min-h-40 ">
          <div className="flex items-center max-md:justify-center justify-between">
            <h2 className="text-2xl text-nowrap font-semibold text-blue-500 flex flex-wrap justify-center items-center gap-2 ">
              <BellDot />
              Announcements
            </h2>
          </div>
          <div
            className="row-container box-border my-[1em] max-h-96 overflow-y-scroll  overflow-x-hidden"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 0%, black 50%, transparent 100%)',
            }}
          >
            {loading ? (
              <p className="text-slate-500 dark:text-slate-400 animate-pulse">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredNotices.length > 0 ? (
              filteredNotices.map((item) => (
                <a
                  key={item._id}
                  href={item.link || '#'}
                  target={item.link ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="group news-notice-row transition-all duration-300 flex items-center space-x-2"
                >
                  <span className="news-notice-card-tag text-[10px] backdrop-blur-lg bg-blue-500/10 rounded-3xl px-[1em] py-[0.5em] ">
                    {formatDate(item.publishDate)}
                  </span>
                  <p className="group-hover:text-blue-500 news-notice-card-content text-justify py-2 w-full overflow-ellipsis">
                    {item.title}
                  </p>
                </a>
              ))
            ) : (
              <p className="text-slate-500 dark:text-slate-400">No announcements available</p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
