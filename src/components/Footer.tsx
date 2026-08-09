import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="developer-footer border-t border-[#3a2f29] mt-16">
      <div className="footer-credit-container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Left: Developer Profile Badge */}
        <div className="dev-profile">
          <img
            src="https://i.postimg.cc/nzkdMvhH/Jami-dev-artist.png"
            alt="Developer Avatar"
            className="dev-avatar"
          />
          <div className="dev-info">
            <span className="dev-title">Crafted with ♥ by</span>
            <span className="dev-name">Nafis Jami</span>
          </div>
        </div>

        {/* Center: Standard Copyright Notice */}
        <div className="footer-copyright">
          <p>&copy; 2026 SSDC. All rights reserved.</p>
        </div>

        {/* Right: Actionable Web & Facebook Links */}
        <div className="dev-social-links">
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
