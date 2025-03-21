import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import './Slider.css';
import { images_slide } from '../../constants';
import { AppWrap } from '../../wrapper';



const Slider = () => {
  const [currentImg, setCurrentImg] = useState(1);
  const sliderImagesRef = useRef(null);
  const counterRef = useRef(null);
  const titlesRef = useRef(null);
  const descripRef = useRef(null);

  const totalSlides = 5;

  const animateSlide = (direction) => {
  
    const slideImg = document.createElement("div");
    slideImg.classList.add("img");
  
    const slideImgElem = document.createElement("img");
    slideImgElem.src = images_slide[`img${currentImg}`];
  
    slideImg.appendChild(slideImgElem);
  
    // Purana slide hatao
    sliderImagesRef.current.innerHTML = "";
    
    // Naya slide add karo
    sliderImagesRef.current.appendChild(slideImg);
  };
  

  // 🔹 Auto Loop Functionality
  let autoSlideInterval;

  const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
      if (currentImg < totalSlides) {
        setCurrentImg((prev) => prev + 1); // Using setState to update currentImg
      } else {
        setCurrentImg(1); // Reset to the first image
      }
    }, 5000); // Slide change after 3 seconds
  };

  useEffect(() => {
    gsap.to(".slider-indicators p", {
      rotation: "+=180",  // Change the rotation degree if needed
      duration: .5,
      ease: "power2.inOut",
    });
  }, [currentImg]);
  
  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1");


    startAutoSlide(); // Start auto-slide when page loads

    // Cleanup function to clear interval when component unmounts or updates
    return () => {
      clearInterval(autoSlideInterval);
    };
  }, [currentImg]); // Effect will run whenever currentImg changes

  // Triggering the animateSlide when currentImg changes
  useEffect(() => {
    if (currentImg > 0) {
      animateSlide(currentImg > 1 ? "right" : "left"); // Call animateSlide when currentImg changes

      // Animate counter and titles when the image changes
      const updateCounterandTitlePosition = () => {
        const counterY = -18 * (currentImg - 1);
        const titleY = -110 * (currentImg - 1);
        const descripY = -60 * (currentImg - 1);

        gsap.to(counterRef.current, { y: counterY, duration: 1, ease: "hop" });
        gsap.to(titlesRef.current, { y: titleY, duration: 1, ease: "hop" });
        gsap.to(descripRef.current, { y: descripY, duration: 1, ease: "hop" });
      };

      updateCounterandTitlePosition(); // Add this line to animate the counter and titles
    }
  }, [currentImg]);

  // Handle clicks on the left and right portions of the slider
  const handleSliderClick = (e) => {
    const sliderWidth = e.target.closest('.slider').offsetWidth;
    const clickPosition = e.clientX;

    if (clickPosition < sliderWidth / 2) {
      // Clicked on the left side of the slider
      if (currentImg > 1) {
        setCurrentImg(currentImg - 1);
      } else {
        setCurrentImg(totalSlides); // Go to the last image if on the first image
      }
    } else {
      // Clicked on the right side of the slider
      if (currentImg < totalSlides) {
        setCurrentImg(currentImg + 1);
      } else {
        setCurrentImg(1); // Go to the first image if on the last image
      }
    }
  };

  return (
    <div className="slider" onClick={handleSliderClick}>
      <div className="slider-images" ref={sliderImagesRef}>
        <div className="img"><img src={images_slide.img1} alt="image1" /></div>
      </div>

      <div className="slider-title">
        <div className="slider-title-wrapper" ref={titlesRef}>
          <p>Global Design</p>
          <p>Freelance Flexibility</p>
          <p>Residential & Commercial Specialists</p>
          <p>Client-Centric</p>
          <p>Innovation Meets Functionality</p>
        </div>
      </div>

      <div className="slider-description">
          <div className="slider-description-wrapper" ref={descripRef}>
              <p>Design Without Borders – We bring world-class architecture and interior design to<br />clients globally, breaking geographical barriers with remote yet highly personalized <br/>solutions.
              </p>
              <p>Freelance Flexibility, Studio-Grade Quality – With over 4 years of experience<br />Fiverr & Upwork, we combine the agility of a freelancer with the structured <br/>expertise of a top-tier design firm.
              </p>
              <p>Residential & Commercial Specialists – Whether it's a modern home, office, retail <br />space, or hospitality project, we craft functional, aesthetic, and impactful <br/>environments tailored to each client’s needs.</p>
              <p>Client-Centric, Detail-Driven – We work one-on-one with clients, ensuring a<br />collaborative process where every design decision reflects their vision, lifestyle, and <br/>business goals.</p>
              <p>Innovation Meets Functionality – Our designs are more than just beautiful<br />they integrate practicality, sustainability, and the latest trends to create spaces that stand <br/>out and stand the test of time</p>

              </div>  
      </div>


      <div className="slider-counter">
        <div className="counter" ref={counterRef}>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
        <div><p>&mdash;</p></div>
        <div><p>5</p></div>
      </div>
      <div className="slider-indicators">
        <p>+</p>
        <p>+</p>
      </div>
    </div>
  );
};

export default AppWrap(Slider, 'home', '', false,false);