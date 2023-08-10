import { Link } from 'react-router-dom'
import Section from './Section'
import { useEffect, useState } from 'react'
import { AiFillDownCircle, AiFillUpCircle } from "react-icons/ai"

const HeroLayout = () => {

  const isLoggedIn = Boolean(localStorage.getItem('loggedIn'))
  const [scrollSection, setScrollSection] = useState(2)

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -0; // Adjust the offset as needed
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      if(scrollSection === 1) setScrollSection(2)
      if(scrollSection === 2) setScrollSection(3)
      if(scrollSection === 3) setScrollSection(4)
    }
  }
  const scrollToTop = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -0; // Adjust the offset as needed
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      if(scrollSection === 4) setScrollSection(3)
      if(scrollSection === 3) setScrollSection(2)
      if(scrollSection === 2) setScrollSection(1)
    }
  }
  console.log("scrollSection", scrollSection);
  return (
    <div className='hero-layout'>
      <AiFillUpCircle id='scroll-btn2' onClick={() => scrollToTop(`section${scrollSection}`)}/>
      <AiFillDownCircle id='scroll-btn' onClick={() => scrollToSection(`section${scrollSection}`)}/>
      <Section id='section1'>
          <h1 className='main-heading'>SkillSwap: Share knowledge, unlock untapped potential.</h1>
          <Link to={isLoggedIn ? 'profile/user' : 'login'}><button className='btn-primary'>Start Today</button></Link>
      </Section>
      <Section id='section2'>
        <div className="flex-content">
          <div className="img">
            <img src="../Assets/Image/img1.jpg" alt="" />
          </div>
          <div className="content flex-column">
            <h1 className="main-heading">Join SkillSwap, the Ultimate Knowledge Exchange Platform</h1>
            <p>SkillSwap brings together curious minds and dedicated learners, all waiting to share their unique skills and expertise. Dive into our diverse community, swap knowledge, and watch your skill set multiply like never before.</p>
          </div>
        </div>
      </Section>
      <Section id='section3'>
        <div className="flex-reverse">
          <div className="img">
              <img src="../Assets/Image/img2.jpg" alt="" />
            </div>
            <div className="content flex-column" >
              <h1 className="main-heading">Learn from the Best, Teach the Rest</h1>
              <p>With SkillSwap, you can connect directly with experts in various fields, unlocking a treasure trove of wisdom and experience. Best of all? You can share your own expertise with others, helping to grow our thriving community.</p>
            </div>
        </div>
      </Section>
      <Section id='section4'>
        <h1 className="main-heading">Get Started</h1>
        <div className="center">
          <p>Don't let your expertise gather dust. Join SkillSwap today and step into a world of endless learning possibilities. Sign up now and let the knowledge-sharing adventure begin!</p>
        </div>
        <Link to={isLoggedIn ? 'profile/user' : 'login'}><button className='btn-primary'>Sign Up</button></Link>
      </Section>
    </div>
  )
}

export default HeroLayout