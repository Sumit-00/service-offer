"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BrandDataType } from "@/constants/types";
import FireImg from "../../../public/fire.png";
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  increment,
  updateDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";

function BrandDetailsPage() {
  const router = useRouter();
  const [currData, setCurrData] = React.useState<BrandDataType | {}>({});
  const [toastVisible, setToastVisible] = React.useState<boolean>(false);

  const handleCopy = async () => {
    // Copy to clipboard logic
    navigator.clipboard
      .writeText((currData as BrandDataType).coupon)
      .then(() => {
        // Show toast message
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000); // Hide toast after 3 seconds
      })
      .catch((error) => {
        console.error("Unable to copy:", error);
      });

    await updateDoc(
      doc(db, "brand_data", String((currData as BrandDataType).id)),
      {
        redemption_count: increment(1),
      }
    );
    const currCategory = (currData as BrandDataType).category;
    try {
      // Query to check if the category exists
      const q = query(
        collection(db, "category_redeem_data"),
        where("category", "==", currCategory)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If the category exists, update the redemption_count
        querySnapshot.forEach(async (docSnapshot) => {
          const docRef = doc(db, "category_redeem_data", docSnapshot.id);
          await updateDoc(docRef, {
            redemption_count: docSnapshot.data().redemption_count + 1,
          });
        });
      } else {
        // If the category does not exist, add a new document
        await addDoc(collection(db, "category_redeem_data"), {
          category: currCategory,
          redemption_count: 1,
        });
      }
    } catch (error) {
      console.error("Error adding or updating document: ", error);
    }
  };

  React.useEffect(() => {
    const data = localStorage.getItem("brandData");
    if (data) {
      const parsedData = JSON.parse(data);
      setCurrData({ ...parsedData });
    }
  }, []);

  return (
    <section className="px-8 py-6 bg-gray-50 h-[90vh] flex flex-col justify-start">
      {/* Back to services list */}
      <div className="flex items-center mb-6">
        <ArrowLeft
          onClick={() => router.push("/")}
          className="cursor-pointer text-gray-600 hover:text-gray-800"
        />
        <p className="text-sm ml-2 text-gray-600 hover:text-gray-800 cursor-pointer">
          Back to services list
        </p>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        {/* Image */}
        <div className="lg:w-1/2 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={(currData as BrandDataType).productImage}
            alt="details image"
            height={600}
            width={900}
            layout="responsive"
            className="object-cover"
          />
        </div>

        {/* Details section */}
        <div className="lg:w-1/2 flex flex-col">
          {/* Brand and offer description */}
          <div className="flex items-center justify-between">
            <div className="flex items-center mb-4">
              {(currData as BrandDataType).brandLogo && (
                <Image
                  src={(currData as BrandDataType).brandLogo || ""}
                  alt="brand logo"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
              <p className="text-lg font-semibold ml-4 text-gray-800">
                {(currData as BrandDataType).offerDesc}
              </p>
            </div>
            {/* Unlock count */}
            <div className="flex items-center mb-4">
              <Image
                src={FireImg}
                alt="fire image"
                width={20}
                height={20}
                className="text-red-500"
              />
              <p className="text-sm ml-2 text-gray-600">
                <span className="font-semibold">
                  {(currData as BrandDataType).redemption_count}
                </span>{" "}
                times unlocked
              </p>
            </div>
          </div>

          {/* Key points */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-16 mt-16">
            <p className="font-bold mb-2 text-gray-800">KEY POINTS</p>
            <ul className="list-disc pl-4">
              {((currData as BrandDataType)?.terms || "")
                .split("-")
                .map((term: string, index: number) => (
                  <li key={index} className="text-base leading-8 text-gray-700">
                    {term}
                  </li>
                ))}
            </ul>
          </div>

          {/* Copy code section */}
          <div className="flex items-center bg-gray-200 rounded-lg p-3">
            <input
              type="text"
              value={(currData as BrandDataType).coupon || ""}
              className="flex-1 bg-transparent text-gray-800 font-semibold text-lg px-3 py-2 rounded-md cursor-not-allowed focus:outline-none"
              readOnly
            />
            <button
              className="ml-3 bg-[#00f] hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>
          <button className="bg-[#00f] w-[300px] p-[1rem] text-white font-bold m-auto mt-8">
            Redeem Offer
          </button>
        </div>
      </div>
      {toastVisible && (
        <div className="fixed bottom-4 right-4 bg-[#00f] text-white px-4 py-2 rounded-md shadow-md">
          Copied!
        </div>
      )}
    </section>
  );
}

export default BrandDetailsPage;
