import React, { useState } from "react";
import "../styles/Contact.css";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: "Please fill out all fields."
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: "Please enter a valid email address."
      });
      return;
    }

    // Set submitting state
    setFormStatus({
      submitting: true,
      submitted: false,
      error: null
    });

    try {
      // For demonstration, we're simulating an API call
      // In a real implementation, you would use a service like EmailJS, Formspree, or your own backend
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success!
      setFormStatus({
        submitting: false,
        submitted: true,
        error: null
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({
          ...prev,
          submitted: false
        }));
      }, 5000);

    } catch (error) {
      // Error handling
      setFormStatus({
        submitting: false,
        submitted: false,
        error: "Something went wrong. Please try again later."
      });
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <p className="contact-subheading">What's Next?</p>
        <h2 className="contact-heading">{t("contact")}</h2>

        <p className="contact-description">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
          I'll try my best to get back to you!
        </p>

        <a href="mailto:your.email@example.com" className="primary-button contact-button">
          Say Hello
        </a>

        <div className="contact-methods">
          <div className="contact-method">
            <div className="contact-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Email</h3>
            <p><a href="mailto:your.email@example.com">your.email@example.com</a></p>
          </div>

          <div className="contact-method">
            <div className="contact-icon">
              <i className="fas fa-phone"></i>
            </div>
            <h3>Phone</h3>
            <p>+1 (123) 456-7890</p>
          </div>

          <div className="contact-method">
            <div className="contact-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Location</h3>
            <p>Your City, Country</p>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            {formStatus.submitted && (
              <div className="form-success">
                <i className="fas fa-check-circle"></i>
                <p>Thank you for your message! I'll get back to you soon.</p>
              </div>
            )}

            {formStatus.error && (
              <div className="form-error">
                <i className="fas fa-exclamation-circle"></i>
                <p>{formStatus.error}</p>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                disabled={formStatus.submitting}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={formStatus.submitting}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className="form-control"
                rows="5"
                placeholder="Your message here..."
                value={formData.message}
                onChange={handleChange}
                disabled={formStatus.submitting}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={`primary-button submit-btn ${formStatus.submitting ? 'submitting' : ''}`}
              disabled={formStatus.submitting}
            >
              {formStatus.submitting ? (
                <>
                  <span className="button-spinner"></span>
                  Sending...
                </>
              ) : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
