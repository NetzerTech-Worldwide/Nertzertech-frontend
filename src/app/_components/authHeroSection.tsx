'use client';

import Image from 'next/image';
import React from 'react';

interface HeroSectionProps {
  imageSrc: string;
  heading: string;
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageSrc, heading, description }) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        }}
      />
      <div className="relative z-10 p-12 py-5 text-white h-full w-full">
        <div>
          <div>
            <Image src={imageSrc} alt="Hero Image" width={150} height={150} />
          </div>
          <div className="max-w-md absolute bottom-20">
            <h1 className="text-2xl font-bold mb-4 leading-tight">{heading}</h1>
            <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
