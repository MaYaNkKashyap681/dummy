import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { like, like2 } from '../assets/feed-page-icons';
import confetti from '../assets/lottie/confetti.json';

const TempPage = () => {
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLiked, setIsLiked] = useState(false)

  //hovering effect
  const handleHoverEnter = () => {
    setIsHovered(true);
  };

  const handleHoverLeave = () => {
    setIsHovered(false);
  };


  // button click effect
  const handleButtonClick = () => {
    setIsClicked(true);
    setIsAnimationVisible(true);
    setIsLiked(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimationVisible(false);
    setIsClicked(false)

  };

  return (
    <div className="pt-[6rem] mx-auto w-full items-center justify-center flex">
      <div
        className={`relative group transform transition-all duration-200 cursor-pointer ${isHovered ? '' : '' // Dim on hover
          }`}
        // onMouseEnter={handleHoverEnter}
        // onMouseLeave={handleHoverLeave}
      >
        <img
          src={isLiked ? like2 : like}
          className={`w-8 ${isClicked ? 'clickbutton' : '' // Shrink on click
            } transform transition-all duration-200 ${isHovered ? 'opacity-50' : ''}`}
          onClick={handleButtonClick}
          onMouseEnter={handleHoverEnter}
          onMouseLeave={handleHoverLeave}
        />
        {isAnimationVisible && (
          <Lottie
            animationData={confetti}
            loop={false}
            onComplete={handleAnimationComplete}
            className={`absolute w-[80px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ${isClicked ? '' : '' // Scale up during animation
              }`}
          />
        )}
      </div>
    </div>
  );
};

export default TempPage;