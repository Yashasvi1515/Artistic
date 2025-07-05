import React,{useEffect,useState} from "react";
import './Hero.css';
import front from '../Assets/pink5.png';
import background from '../Assets/pink4.png';
//import front2 from '../Assets/pink3.png';
 import front3 from '../Assets/pink6.png';
//import front4 from '../Assets/pink7.jpg';
 

const Hero = () => {
     const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  const mountainTranslate = -scrollY * 0.3; 
    return (
        <div className="hero">
         <section>
              <img src={background} alt="" id="background"  style={{ transform: `translateY(${mountainTranslate}px)` }} />
              <h2 id="text">Kalakriti</h2>
           <img src={front} alt=""  id="front"   style={{ transform: `translateY(${mountainTranslate}px)` }}/>
           <img src={front3} alt=""  id="front2"   style={{ transform: `translateY(${mountainTranslate}px)` }}/>
           <img src={front3} alt=""  id="front3"   style={{ transform: `translateY(${mountainTranslate}px)` }}/>
         
         </section>
        </div>
    );
}
export default Hero;