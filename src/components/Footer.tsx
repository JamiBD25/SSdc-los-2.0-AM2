import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="developer-footer border-t border-[#3a2f29] mt-12 sm:mt-16 w-full max-w-full overflow-x-hidden">
      <div className="footer-credit-container max-w-7xl mx-auto px-3 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        
        {/* Left: Developer Profile Badge */}
        <div className="dev-profile flex items-center justify-center sm:justify-start gap-3">
          <img
            src="https://i.postimg.cc/nzkdMvhH/Jami-dev-artist.png"
            alt="Developer Avatar"
            className="dev-avatar shrink-0"
          />
          <div className="dev-info text-left">
            <span className="dev-title">Crafted with ♥ by</span>
            <span className="dev-name">Nafis Jami</span>
          </div>
        </div>

        {/* Center: Standard Copyright Notice */}
        <div className="footer-copyright text-xs sm:text-sm text-[#c9b8a7]">
          <p>&copy; 2026 SSDC &bull; League of Spars 2.0. All rights reserved.</p>
        </div>

        {/* Right: Actionable Web & Facebook Links */}
        <div className="dev-social-links flex flex-wrap justify-center gap-2.5">
          <a
            href="https://jamibd25.github.io/Nafis_portfolio-/"
            target="_blank"
            rel="noreferrer"
            className="dev-link web-link"
          >
            <span className="link-icon">
              <i className="fa-solid fa-globe"></i>
            </span>
            Website
          </a>

          <a
            href="https://www.facebook.com/share/1Fh25kzGGB/"
            target="_blank"
            rel="noreferrer"
            className="dev-link fb-link"
          >
            <span className="link-icon">
              <i className="fa-brands fa-facebook"></i>
            </span>
            Facebook
          </a>
        </div>

      </div>
    </footer>
  );
};
