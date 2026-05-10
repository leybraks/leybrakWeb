import Hero        from '../components/Hero.jsx';
import Problems    from '../components/Problems.jsx';
import HowItWorks  from '../components/HowItWorks.jsx';
import Products    from '../components/Products.jsx';
import CTAFooter   from '../components/CTAFooter.jsx';

/**
 * Cada sección tiene un id para que useScrollTo pueda encontrarla.
 * Hero        → no necesita id (está arriba del todo)
 * HowItWorks  → id="how-it-works"
 * CTAFooter   → id="cta"
 */
const Landing = () => (
  <>
    <Hero />
    <Problems />
    <div id="how-it-works"><HowItWorks /></div>
    <Products />
    <div id="cta"><CTAFooter /></div>
  </>
);

export default Landing;