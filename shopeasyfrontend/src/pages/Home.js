import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero"
import Categories from "../components/home/Categories"
import FeaturedProducts from "../components/home/FeaturedProduct"
import OfferBanner from "../components/home/OfferBanner";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/common/Footer";
function Home(){
    return(
        <>
        <Navbar/>
        <Hero/>
        <Categories/>
        <FeaturedProducts/>
        <OfferBanner></OfferBanner>
        <WhyChooseUs></WhyChooseUs>
        <Newsletter/>
        <Footer/>
        </>
    )
}
export default Home;