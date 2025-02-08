import BannerComponent from "../components/header/BannerComponent";
import CustomNavbar from "../components/header/CustomNavbar";
import HeroTail from "../components/tanıtım_page/Hero/HeroTail";
import SSFeatureComponent from "../components/tanıtım_page/SSFeatureComponent";
import LogoComponent from "../components/tanıtım_page/LogoComponent";
import CTASection from "../components/tanıtım_page/CTASection";

import NewsletterComponent from "../components/tanıtım_page/NewsletterComponent";
import FeatureComponent from "../components/tanıtım_page/FeatureComponent";

function HomePage() {
  return (
    <>
      <BannerComponent />
      <CustomNavbar />
      <HeroTail />
      <SSFeatureComponent />
      <FeatureComponent />
      <LogoComponent />
      <CTASection />

      <NewsletterComponent />
    </>
  );
}

export default HomePage;
