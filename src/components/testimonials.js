import React from "react";

const testimonials = [
  {
    company: "Growth Alliance",
    text: "We no longer have to ask ourselves, where did that PDF go?",
    link: "#",
  },
  {
    company: "AVENUE / SYSTEMS",
    text: "How David finally unified communication across his team and external stakeholders",
    link: "#",
  },
  {
    company: "canny",
    text: "I would hate going back to Gmail because I would lose so many superpowers.",
    link: "#",
  },
  {
    company: "trauc",
    name: "Jeremy",
    text: "How Jeremy finally found a shared inbox his team was willing to adopt",
    link: "#",
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7b20556b-0ff2-49c6-add5-3897d1fb041c.png",
  },
  {
    company: "smplrspace",
    text: "From customer support tool to foundation for the whole business",
    link: "#",
  },
  {
    company: "smplrspace",
    text: "From endless email forwarding to increased productivity",
    link: "#",
  },
];

export default function TestimonialsPage() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", maxWidth: 960, margin: "auto", padding: "3rem 1rem", color: "#444" }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .testimonial-grid {
            animation: fadeIn 0.8s ease-out forwards;
          }

          .testimonial-card {
            transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
          }

          .testimonial-card:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
          }
        `}
      </style>
      <h1 style={{ fontWeight: "700", fontSize: "2.25rem", marginBottom: "0.25rem" }}>
        Hear from customers like you
      </h1>
      <p style={{ fontWeight: "500", fontSize: "1rem", marginBottom: "2rem", color: "#7a7a7a" }}>
        Learn what led them to Missive, what else they tried, and what their work looks like today.
      </p>

      <div
        className="testimonial-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="testimonial-card"
            style={{
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgb(0 0 0 / 0.1)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 160,
            }}
          >
            {t.image && (
              <img
                src={t.image}
                alt={
                  t.name
                    ? `Portrait photo of ${t.name}`
                    : `${t.company} representative`
                }
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginBottom: "1rem",
                  alignSelf: "center",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/83108f31-2e4d-48ef-9d84-68d4951b9880.png";
                }}
              />
            )}
            <strong
              style={{
                fontWeight: "700",
                fontSize: "0.85rem",
                color: "#555",
                marginBottom: "0.75rem",
              }}
            >
              {t.company}
            </strong>
            <p
              style={{
                fontWeight: t.name ? "600" : "500",
                fontSize: "1rem",
                color: t.name ? "#101010" : "#333",
                flexGrow: 1,
                marginBottom: "1rem",
              }}
            >
              {t.text}
            </p>
            <a
              href={t.link}
              style={{
                color: "#2563eb",
                fontWeight: "600",
                fontSize: "0.9rem",
                textDecoration: "none",
                alignSelf: "flex-start",
              }}
            >
              Read story
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
