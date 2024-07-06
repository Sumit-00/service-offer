"use client";
import Card from "@/components/Card";
import { BrandDataType } from "@/constants/types";
import SearchBar from "@/components/Search";
import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { CATEGORY, LOCATIONS } from "@/constants/enums";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = React.useState<CATEGORY>(
    CATEGORY.ALL
  );
  const [allBrandsList, setAllBrandsList] = React.useState<BrandDataType[]>([]);
  const [brandsList, setBrandsList] = React.useState<BrandDataType[]>([]);

  const handleSearch = (value: string) => {
    if (value.trim() === "") {
      setBrandsList(allBrandsList);
    } else {
      const filteredResults = brandsList.filter((brand) =>
        brand.brandName.toLowerCase().includes(value.toLowerCase())
      );
      setBrandsList(filteredResults);
    }
  };

  const handleCategoryClick = (category: CATEGORY) => {
    setSelectedCategory(category);
    if (category === CATEGORY.ALL) {
      setBrandsList(allBrandsList);
    } else {
      const filtered = allBrandsList.filter(
        (item) => item.category === category
      );
      setBrandsList(filtered);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const query = await getDocs(collection(db, "brand_data"));
      const data: BrandDataType[] = [];
      query.forEach((doc) => {
        const docData = doc.data() as Omit<BrandDataType, "id">; // Exclude id initially
        data.push({
          ...docData,
          id: doc.id,
          isExpired: new Date(docData?.validity) < new Date(),
        }); // Include id here
      });
      setBrandsList(data as BrandDataType[]);
      setAllBrandsList(data as BrandDataType[]);
    };
    fetchData();
  }, []);

  return (
    <section className="p-12">
      <h1 className="text-center font-semibold text-2xl">Service Offer</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="flex space-x-2 mt-8">
        {Object.values(CATEGORY).map((category) => (
          <div
            key={category}
            className={`px-3 py-1 rounded-full text-sm uppercase font-bold cursor-pointer ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "border border-blue-500 text-blue-500 hover:bg-blue-100"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 mt-8 overflow-auto gap-y-8 pt-8 pb-[300px] h-[80vh]">
        {brandsList.length > 0 ? (
          brandsList.map((brand: BrandDataType) =>
            brand.isExpired ? null : <Card {...brand} key={String(brand.id)} />
          )
        ) : (
          <p>No Results</p>
        )}
      </div>
    </section>
  );
}
