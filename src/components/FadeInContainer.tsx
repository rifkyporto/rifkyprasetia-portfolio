"use client";

import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
  isReverse?: boolean;
};

const FadeInContainer = ({ children, className , isReverse}: LayoutProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={cn(
      "overflow-hidden h-full w-full",
      className
    )}>
      {!isReverse ? (
        <div
          className={` inset-0 transform transition-all duration-1000 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
          style={{ zIndex: 10 }}
        >
          {children}
        </div>
      ) : (
        // <div
        //   className={` inset-0 transform transition-all duration-1000 ease-out ${
        //     isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        //   }`}
        //   style={{ zIndex: 10 }}
        // >
        //   {children}
        // </div>
        <div className={`
          inset-0 transform transition-all ease-in
        `}
          style={{
            zIndex: 10,
            animation: isVisible ? 'dotsAnimationFade 1.5s forwards' : 'none'
          }}
        >
          {children}
        </div>
      )}
      
    </div>
  );
};

export default FadeInContainer;
