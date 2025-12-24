import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Github, Film, Popcorn, Ticket } from 'lucide-react';
import AppLogo from '../../assets/AppLogo.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-base-300 to-base-200 px-6 py-2 sm:px-6 md:px-10 lg:px-20 border-t border-primary/20">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        {/* Cinema-themed decorative elements */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 text-primary/30">
            <Film className="size-6" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <Popcorn className="size-6" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <Ticket className="size-6" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="text-center lg:text-left">
            <img src={AppLogo} alt="CineBook Logo" className="w-50 mx-auto lg:mx-0" />
            <p className="mt-4 max-w-xs text-base-content/70 mx-auto lg:mx-0">
              🎬 CineBook - Your premier destination for movie tickets. Experience cinema like never before with our seamless booking platform!
            </p>

            <div className="mt-8 flex justify-center lg:justify-start gap-6">
              <a href="#" rel="noreferrer" target="_blank" 
                 className="text-base-content/60 hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-lg">
                <Facebook className="size-6" strokeWidth={2} />
              </a>
              <a href="#" rel="noreferrer" target="_blank" 
                 className="text-base-content/60 hover:text-secondary transition-all duration-300 hover:scale-110 hover:drop-shadow-lg">
                <Instagram className="size-6" strokeWidth={2} />
              </a>
              <a href="#" rel="noreferrer" target="_blank" 
                 className="text-base-content/60 hover:text-accent transition-all duration-300 hover:scale-110 hover:drop-shadow-lg">
                <Twitter className="size-6" strokeWidth={2} />
              </a>
              <a href="#" rel="noreferrer" target="_blank" 
                 className="text-base-content/60 hover:text-info transition-all duration-300 hover:scale-110 hover:drop-shadow-lg">
                <Github className="size-6" strokeWidth={2} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-bold text-primary text-lg mb-2 flex items-center gap-2">
                <Film className="size-5" />
                Our Services
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><Link to="/movies" className="text-base-content/80 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block">🎭 Movie Tickets</Link></li>
                <li><Link to="/showtimes" className="text-base-content/80 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block">⏰ Showtimes</Link></li>
                <li><Link to="/owner/" className="text-base-content/80 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block">🏛️ Theater Listings</Link></li>
                <li><Link to="/offers" className="text-base-content/80 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block">🎁 Special Offers</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-primary text-lg mb-2 flex items-center gap-2">
                <Popcorn className="size-5" />
                Company
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><Link to="/about-us" className="text-base-content/80 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block">🎪 About Us</Link></li>
                <li><Link to="/careers" className="text-base-content/80 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block">💼 Careers</Link></li>
                <li><Link to="/partners" className="text-base-content/80 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block">🤝 Our Partners</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-primary text-lg mb-2 flex items-center gap-2">
                <Ticket className="size-5" />
                Support
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><Link to="/contact" className="text-base-content/80 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block">📞 Contact Us</Link></li>
                <li><Link to="/faq" className="text-base-content/80 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block">❓ FAQs</Link></li>
                <li><Link to="/support" className="text-base-content/80 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block">🎧 Customer Support</Link></li>
                <li><Link to="/owner/" className="text-base-content/80 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block">🎬 Theater Owner Portal</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-primary text-lg mb-2">Legal</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><Link to="/terms" className="text-base-content/80 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block">📋 Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-base-content/80 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block">🔒 Privacy Policy</Link></li>
                <li><Link to="/accessibility" className="text-base-content/80 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block">♿ Accessibility</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section with cinema flair */}
        <div className="border-t border-primary/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-base-content/60">
              © 2025 CineBook. All rights reserved. 🎬 Made with ❤️ for movie lovers
            </p>
            <div className="flex items-center gap-2 mt-4 sm:mt-0 text-xs text-base-content/40">
              <span>Powered by</span>
              <span className="text-primary font-semibold">React</span>
              <span>•</span>
              <span className="text-secondary font-semibold">Node.js</span>
              <span>•</span>
              <span className="text-accent font-semibold">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
