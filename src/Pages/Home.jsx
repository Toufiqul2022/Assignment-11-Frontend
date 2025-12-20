import React from "react";
import { useNavigate } from "react-router";
import Donate from "../assets/Donate.jpg";
import Card1 from "../assets/Card_1.jpg";
import Card2 from "../assets/Card_2.jpg";
import Card3 from "../assets/Card_3.png";
import Footer from "../components/Footer";

const Home = ({ user }) => {
  const navigate = useNavigate();

  const features = [
    {
      img: Card1,
      title: "Support Campaigns",
      desc: "Discover and participate in donation drives and special initiatives that save lives.",
    },
    {
      img: Card2,
      title: "Blood Donation Facts",
      desc: "Learn blood types, eligibility, and how a single donation can help multiple patients.",
    },
    {
      img: Card3,
      title: "Success Stories",
      desc: "Real stories from donors and recipients—see the impact you can make today.",
    },
  ];

  return (
    <div className="font-sans text-slate-800 bg-slate-50">
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.65),rgba(0,0,0,.65)), url(${Donate})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-28 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Donate Blood, Save Lives
          </h1>
          <p className="text-lg md:text-xl text-rose-100 max-w-2xl mx-auto mb-10">
            Join a trusted community connecting blood donors with patients in
            need—fast, safe, and impactful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              aria-label="Join as donor"
              onClick={() => navigate("/register")}
              className="px-8 py-3 rounded-xl bg-white text-red-600 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition focus:ring-2 focus:ring-white"
            >
              Join as a Donor
            </button>
            <button
              aria-label="Search donors"
              onClick={() => navigate("/search")}
              className="px-8 py-3 rounded-xl border border-white/60 bg-white/10 backdrop-blur text-white font-semibold hover:bg-white/20 transition focus:ring-2 focus:ring-white"
            >
              Search Donors
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-red-600 mb-14">
            Our Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-white shadow-sm hover:shadow-xl transition p-6 text-center"
              >
                <div className="mx-auto mb-5 h-40 flex items-center justify-center">
                  <img
                    src={f.img}
                    alt={f.title}
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-red-600 transition">
                  {f.title}
                </h3>
                <p className="text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            Why Donate Blood?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Save Lives",
                desc: "Every donation can save up to three lives—your help truly matters.",
              },
              {
                title: "Healthy & Safe",
                desc: "Donating blood is safe and beneficial when done responsibly.",
              },
              {
                title: "Community Impact",
                desc: "Be part of a growing movement supporting patients across the country.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition text-center"
              >
                <h3 className="text-xl font-semibold mb-3 text-red-600">
                  {c.title}
                </h3>
                <p className="text-slate-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-rose-600 to-red-600 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <form className="bg-white text-slate-800 rounded-2xl shadow-xl p-8 space-y-4">
            <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
              Get in Touch
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" className="input" placeholder="First Name" />
              <input type="text" className="input" placeholder="Last Name" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input type="email" className="input" placeholder="Email" />
              <input type="tel" className="input" placeholder="Phone" />
            </div>

            <input type="text" className="input w-full" placeholder="Address" />
            <textarea
              className="input w-full h-14"
              placeholder="Your Message"
            />

            <button className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition">
              Send Message
            </button>
          </form>

          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-3xl font-bold">Contact Us</h3>
            <p className="text-rose-100">
              Want to make a difference? Reach out to find donation events near
              you.
            </p>
            <p>
              <strong>Email:</strong> info@bloodbridge.com
            </p>
            <p>
              <strong>Support:</strong> (+880) 123 456 586
            </p>
            <p>
              <strong>Address:</strong> Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Home;
