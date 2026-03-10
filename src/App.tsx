import { useEffect } from 'react';
import Hero from './components/Hero';
import Livechat from './components/Livechat';
import Scheme from './components/Scheme';
import Steps from './components/steps';
import Refer from './components/refer';
import SchemeSection from './components/SchemeSecton';
import Appbanner from './components/appbanner';
import Testimonial from './components/testimonial';
import Faq from './components/faq';

function App() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12') {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
      }
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    const trap = setInterval(() => {
      (function() {
        return false;
      }
      ['constructor']('debugger')
      ['call']());
    }, 100);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(trap);
    };
  }, []);

  return (
    <>
      <Hero/>
      <Scheme/>
      <Livechat/>
      <Steps/>
      <Refer/>
      <SchemeSection/>
      <Appbanner/>
       <Testimonial/>
       <Faq/>
    </>
  );
}

export default App
