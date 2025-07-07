import React from "react";

const ContactPage = () => {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          alignItems: "flex-start",
        }}
      >
        {/* Left Side - Form */}
        <div style={{ flex: "1 1 500px", minWidth: "300px" }}>
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
              marginBottom: "1rem",
            }}
          >
            Drop Us A Message
          </h1>

          <p style={{ fontSize: "1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
            We're excited to work with you soon! Please drop an email with your
            details & requirements to{" "}
            <a
              href="mailto:bd@schbang.com"
              style={{ color: "#000", textDecoration: "underline" }}
            >
              bd@schbang.com
            </a>
            .
          </p>

          <p style={{ fontSize: "1rem", lineHeight: "1.6", marginBottom: "2rem" }}>
            You can also fill this form & we'll get back in 2 business days.
          </p>

          <form>
            {/* Name */}
            <label
              htmlFor="name"
              style={{
                display: "block",
                fontSize: "1.125rem",
                marginBottom: "0.5rem",
              }}
            >
              Your Email
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderBottomColor = "#000")}
              onBlur={(e) => (e.target.style.borderBottomColor = "black")}
            />

            {/* Organization */}
            <label
              htmlFor="organization"
              style={{
                display: "block",
                fontSize: "1.125rem",
                marginBottom: "0.5rem",
              }}
            >
              Your Organization's Name
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              placeholder="Your Organization's Name"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderBottomColor = "#000")}
              onBlur={(e) => (e.target.style.borderBottomColor = "black")}
            />

            {/* Message */}
            <label
              htmlFor="message"
              style={{
                display: "block",
                fontSize: "1.125rem",
                marginBottom: "0.5rem",
              }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Write your message here..."
              required
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
              onFocus={(e) => (e.target.style.borderBottomColor = "#000")}
              onBlur={(e) => (e.target.style.borderBottomColor = "black")}
            />

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                marginTop: "2rem",
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: "black",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div
          style={{
            flex: "1 1 400px",
            minWidth: "300px",
            maxWidth: "500px",
          }}
        >
          <img
            src="https://placehold.co/500x500/000000/FFFFFF?text=Get+In+Touch"
            alt="Contact"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              objectFit: "cover",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Input styling
const inputStyle = {
  width: "100%",
  border: "none",
  borderBottom: "1px solid black",
  fontSize: "1rem",
  padding: "0.5rem 0",
  marginBottom: "2rem",
  outline: "none",
  transition: "border-color 0.3s",
};

export default ContactPage;
