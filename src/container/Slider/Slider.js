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
          <p>imagine incredible</p>
          <p>simply stunning</p>
          <p>innovative solutions</p>
          <p>state of the art</p>
          <p>best design</p>
        </div>
      </div>

      <div class="slider-description">
          <div class="slider-description-wrapper" ref={descripRef}>
              <p>This is a short description about the slider. It appears below the title 1.<br />come in the next line</p>
              <p>This is a short description about the slider. It appears below the title 2.<br />come in the next line</p>
              <p>This is a short description about the slider. It appears below the title 3.<br />come in the next line</p>
              <p>This is a short description about the slider. It appears below the title 4.<br />come in the next line</p>
              <p>This is a short description about the slider. It appears below the title 5.<br />come in the next line</p>

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