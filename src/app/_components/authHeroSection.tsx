'use client';

import Image from 'next/image';
import type { StaticImageData } from 'next/image';


interface HeroSectionProps {
  imageSrc: StaticImageData | string;
  heading: string;
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageSrc, heading, description }) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">

      <div className="absolute inset-0">
        <Image 
          src={imageSrc} 
          alt="Hero Image" 
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="absolute top-1 left-5 z-20">
        <Image
          src='/_assets/logo.png'
          alt="Logo"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      <div className="relative z-10 p-12 py-5 text-white w-full h-full">
        <div className="max-w-md absolute bottom-20">
          <h1 className="text-3xl font-bold mb-4 leading-tight">{heading}</h1>
          <p className="text-gray-300 font-semibold text-[20px] leading-relaxed">{description}</p>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
