"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  id: Number | string;
  brandTitle: string;
  offerName: string;
  category: string;
  validity: Date;
  locations: Array<string>;
  termsConditions: string;
  offerDesc: string;
  brandLogo: string;
  productImage: string;
  brandColor: string;
  brandName?: string;
}

function Card(props: CardProps) {
  const {
    brandTitle,
    offerDesc,
    productImage,
    brandColor,
    brandLogo,
    brandName,
  } = props;

  const router = useRouter();

  const handleCardClick = () => {
    localStorage.setItem("brandData", JSON.stringify(props));
    router.push(`/${props.brandName}`);
  };

  return (
    <section
      className="relative w-80 p-6 rounded-lg shadow-lg hover:cursor-pointer transition-transform transform hover:scale-105"
      style={{ background: `linear-gradient(135deg, ${brandColor}, #ffffff)` }}
      onClick={handleCardClick}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent to-black opacity-20 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center mb-4">
        <h2 className="text-2xl font-bold text-white">{brandName}</h2>
        <h3 className="text-xl text-gray-200">{brandTitle}</h3>
        <p className="text-sm text-gray-300">{offerDesc}</p>
      </div>

      {/* Product Image */}
      <div className="relative z-20 flex justify-center mb-4">
        <div className="relative w-36 h-36">
          <Image
            src={productImage}
            alt="Product Image"
            width={150}
            height={150}
            className="rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>

      {/* Brand Logo */}
      <div className="relative z-20 flex justify-center">
        <Image
          src={brandLogo}
          alt="Brand Logo"
          width={50}
          height={50}
          className="rounded-full border-2 border-white shadow-sm"
        />
      </div>
    </section>
  );
}

export default Card;
