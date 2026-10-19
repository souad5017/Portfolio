import { useOutletContext } from 'react-router-dom';
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
  const profile = useOutletContext();

  return (
    <>
      <Hero profile={profile} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certificates />
      <CVSection profile={profile} />
      <Contact profile={profile} />
    </>
  );
}