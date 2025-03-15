import React from "react";

export default function StatusTitles() {
  return (
    <div className="flex gap-[52px] mb-[30px]">
      <div className="w-[381px] h-[54px] rounded-[10px] flex justify-center items-center bg-primary-yellow text-[20px] text-white">
        დასაწყები
      </div>
      <div className="w-[381px] h-[54px] rounded-[10px] flex justify-center items-center bg-primary-orange text-[20px] text-white">
        პროგრესში
      </div>
      <div className="w-[381px] h-[54px] rounded-[10px] flex justify-center items-center bg-primary-pink text-[20px] text-white">
        მზად ტესტირებისთვის
      </div>
      <div className="w-[381px] h-[54px] rounded-[10px] flex justify-center items-center bg-primary-blue text-[20px] text-white">
        დასრულებული
      </div>
    </div>
  );
}
