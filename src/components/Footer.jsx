import React, { useState, useEffect, useCallback } from 'react';
import '../styles/footer.css';

const Footer = () => {
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // LoveCounter State
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(true);

  const STORAGE_KEY = 'naqi_portfolio_liked_v1';
  const API_NAMESPACE = 'naqi-portfolio-prod';
  const API_KEY = 'likes-v1';

  const createCounter = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.countapi.xyz/create?namespace=${API_NAMESPACE}&key=${API_KEY}&value=0`
      );
      const data = await response.json();
      if (data && data.value !== undefined) {
        setLikeCount(data.value);
      }
    } catch {
      console.log('Failed to create counter');
      setLikeCount(0);
    }
  }, [API_NAMESPACE, API_KEY]);

  const fetchCount = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.countapi.xyz/get/${API_NAMESPACE}/${API_KEY}`
      );
      const data = await response.json();
      if (data && data.value !== undefined && data.value !== null) {
        setLikeCount(data.value);
      } else {
        await createCounter();
      }
    } catch {
      console.log('CountAPI unavailable - starting at 0');
      setLikeCount(0);
    } finally {
      setIsLikeLoading(false);
    }
  }, [createCounter, API_NAMESPACE, API_KEY]);

  // Check localStorage and fetch count on mount
  useEffect(() => {
    const liked = localStorage.getItem(STORAGE_KEY);
    if (liked === 'true') {
      setHasLiked(true);
    }
    fetchCount();
  }, [fetchCount]);

  const incrementCount = async () => {
    if (hasLiked) return;

    setIsLikeAnimating(true);
    setHasLiked(true);
    localStorage.setItem(STORAGE_KEY, 'true');

    try {
      const response = await fetch(
        `https://api.countapi.xyz/hit/${API_NAMESPACE}/${API_KEY}`
      );
      const data = await response.json();
      if (data && data.value !== undefined) {
        setLikeCount(data.value);
      } else {
        setLikeCount((prev) => prev + 1);
      }
    } catch {
      console.log('Failed to update count - applying local increment');
      setLikeCount((prev) => prev + 1);
    }

    setTimeout(() => setIsLikeAnimating(false), 600);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setSubmitStatus('');
      }, 3000);
    }, 1500);
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/m-naqi-haider-8b6772322',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Naqi-Haider',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/naqi_ryou',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014 3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    }
  ];

  return (
    <section className="section-card contact-card" id="contact">
      <div className="contact-container">
        {/* Section labels */}
        <span className="section-label">Contact</span>
        <h2 className="section-title">Get In Touch</h2>

        {/* Highlight quote */}
        <div className="contact-quote-bar">
          <p className="contact-quote">"Let's build something meaningful."</p>
        </div>

        {/* Embedded Love Counter */}
        <div className="love-counter-box">
          <span className="love-prompt">Enjoyed this portfolio? Show some support!</span>
          <button
            className={`love-hit-button ${hasLiked ? 'liked' : ''} ${isLikeAnimating ? 'animating' : ''}`}
            onClick={incrementCount}
            disabled={hasLiked}
            aria-label={hasLiked ? 'Already liked' : 'Like this portfolio'}
          >
            <span className="heart-svg">
              {hasLiked ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              )}
            </span>
            <span className="love-count-num">
              {isLikeLoading ? '...' : likeCount.toLocaleString()}
            </span>
          </button>
          {hasLiked && <span className="love-thanks">Thank you! 💛</span>}
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Left Column - Socials & Location */}
          <div className="contact-meta-pane">
            <div className="inner-brutal-card card-socials">
              <h3>Connect with Me</h3>
              <div className="socials-flex">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-box"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-details-row">
              <div className="inner-brutal-card details-box">
                <span className="details-header">Email</span>
                <a href="mailto:naqi073@gmail.com" className="details-value">
                  naqi073@gmail.com
                </a>
              </div>
              <div className="inner-brutal-card details-box">
                <span className="details-header">Location</span>
                <span className="details-value">Pakistan</span>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="inner-brutal-card card-form">
            <h3>Send a Message</h3>
            <form className="form-element" onSubmit={handleSubmit}>
              <div className="form-fields-row">
                <div className="form-input-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-input-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn-submit-brutal"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="btn-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>
              {submitStatus === 'success' && (
                <div className="form-success-banner">
                  ✓ Message sent successfully!
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer Bottom copyright banner */}
        <div className="footer-copyright-bar">
          <p>
            © {new Date().getFullYear()} <strong>Muhammad Naqi Haider</strong>. All rights reserved.
          </p>
          <p className="footer-credits">
            Built with React & Space Grotesk
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
