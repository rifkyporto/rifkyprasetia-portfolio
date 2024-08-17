"use client";

import React, { useState, useEffect } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const FadeInContainer = ({ children }: LayoutProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component mounts
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay for the transition effect

    return () => clearTimeout(timeoutId); // Clean up timeout
  }, []);

  return (
    // <div
    //   className={`transform transition-all duration-1000 ease-out z-0 ${
    //     isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
    //   }`}
    // >
    //   {children}
    // </div>
    <div className="relative overflow-hidden h-full w-full">
      <div
        className={`absolute inset-0 transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
        style={{ zIndex: 10 }}
      >
        {children}
      </div>
    </div>
  );
};

export default FadeInContainer;
