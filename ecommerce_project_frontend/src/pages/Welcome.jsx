import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

const Welcome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <div>
        <section id="aboutus">
          <AboutUs />
        </section>
        <section id="faq">
          <Faq />
        </section>
        <section id="contactus">
          <ContactUs />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Welcome;
