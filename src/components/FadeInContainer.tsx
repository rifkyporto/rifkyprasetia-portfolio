"use client";

import React, { useState, useEffect } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const FadeInContainer = ({ children }: LayoutProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className=" overflow-hidden h-full w-full">
      <div
        className={` inset-0 transform transition-all duration-1000 ease-out ${
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
