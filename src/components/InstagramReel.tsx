"use client";

import React, { useEffect } from 'react';
import Head from 'next/head';

interface InstagramReelsProps {
  url: string;
}

const InstagramReels: React.FC<InstagramReelsProps> = ({ url }) => {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  return (
    <>
      <Head>
        <script async src="//www.instagram.com/embed.js"></script>
      </Head>
      <blockquote 
        className="instagram-media" 
        data-instgrm-permalink={url}
        data-instgrm-version="14"
      >
        {/* Fallback content */}
        <a href={url} target="_blank" rel="noopener noreferrer">
          View this post on Instagram
        </a>
      </blockquote>
    </>
  );
};

export default InstagramReels;
