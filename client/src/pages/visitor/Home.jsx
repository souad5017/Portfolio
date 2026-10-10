import Hero from '../../components/visitor/Hero.jsx';
import About from '../../components/visitor/About.jsx';
import Skills from '../../components/visitor/Skills.jsx';
import Projects from '../../components/visitor/Projects.jsx';
import Experience from '../../components/visitor/Experience.jsx';
import Education from '../../components/visitor/Education.jsx';
import Certificates from '../../components/visitor/Certificates.jsx';
import CVSection from '../../components/visitor/CVSection.jsx';
import Contact from '../../components/visitor/Contact.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certificates />
      <CVSection />
      <Contact />
    </>
  );
}