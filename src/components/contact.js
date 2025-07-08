 import React, { useState, useRef } from "react";
 const Contact_image = require("../Assests/contact_image.png");

const Contact= () => {
  const [form, setForm] = useState({
    email: "",
    organizationName: "",
    message: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    try {
      const res = await fetch("http://localhost:8000/api/auth/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          organizationName: form.organizationName,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.msg || "Message sent successfully!");
        setForm({ email: "", organizationName: "", message: "" });
        formRef.current.reset();
      } else {
        setSuccessMsg(data.msg || "Failed to send message.");
      }
    } catch {
      setSuccessMsg("Failed to send message.");
    }
    setLoading(false);
  };

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
            details 
          
            .
          </p>

        

          {successMsg && (
            <div
              style={{
                background: "#e6ffe6",
                color: "#006600",
                padding: "1rem",
                borderRadius: "4px",
                marginBottom: "1rem",
                border: "1px solid #b3ffb3",
              }}
            >
              {successMsg}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit}>
            {/* Email */}
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "1.125rem",
                marginBottom: "0.5rem",
              }}
            >
              Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              required
              style={inputStyle}
              value={form.email}
              onChange={handleChange}
              onFocus={(e) => (e.target.style.borderBottomColor = "#000")}
              onBlur={(e) => (e.target.style.borderBottomColor = "black")}
            />

            {/* Organization */}
            <label
              htmlFor="organizationName"
              style={{
                display: "block",
                fontSize: "1.125rem",
                marginBottom: "0.5rem",
              }}
            >
              Your Organization's Name
            </label>
            <input
              id="organizationName"
              name="organizationName"
              type="text"
              placeholder="Your Organization's Name"
              required
              style={inputStyle}
              value={form.organizationName}
              onChange={handleChange}
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
              value={form.message}
              onChange={handleChange}
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
                opacity: loading ? 0.6 : 1,
              }}
              disabled={loading}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
            >
              {loading ? "Sending..." : "Send Message"}
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
            src={Contact_image}
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

export default Contact;