import { Globe, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-none py-6 border-t-2 border-blue-500 transition-colors duration-200">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left Section - Info */}
          <div className="space-y-4">
            {/* College Info */}
            <div>
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                Training & Placement Cell
              </h3>
              <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                Government Engineering College, Siwan
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Empowering students with industry-ready skills and career opportunities.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Contact Us
              </h4>
              <div className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <MapPin
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400"
                />
                <p>Suta Mill Factory, Old, Mairwa Rd, Bhada Khurd, Siwan, Bihar 841436</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Phone size={18} className="flex-shrink-0 text-blue-600 dark:text-blue-400" />
                <a
                  href="tel:+916155242002"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  +91 6155 242 002
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Mail size={18} className="flex-shrink-0 text-blue-600 dark:text-blue-400" />
                <a
                  href="mailto:tpogecsiwan@gmail.com"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  tpogecsiwan@gmail.com
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/tpogecsiwan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.gecsiwan.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                  className="p-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Globe size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="p-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Section - Google Map */}
          <div className="h-[250px] lg:h-[280px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.1229134396644!2d84.32628237564055!3d26.225195489297683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992ff716c7b37ad%3A0x5737371d64c4aed1!2sGovernment%20Engineering%20College%2C%20Siwan!5e0!3m2!1sen!2sin!4v1767183171885!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GEC Siwan Location"
            ></iframe>
          </div>
        </div>

        {/* Copyright - Center Bottom */}
        <div className="mt-6 pt-4 border-t border-slate-300 dark:border-slate-700">
          <p className="text-xs text-center text-slate-600 dark:text-slate-400">
            © 2025 Training and Placement Cell, Government Engineering College, Siwan. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
