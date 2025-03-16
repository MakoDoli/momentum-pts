"use client";
import { usePathname } from "next/navigation";
import React, { createContext, useState, useEffect, useContext } from "react";

export const FilterContext = createContext();

export function useFilters() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    setIsClient(true);
    const savedFilters = localStorage.getItem("filters");
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
    if (pathName !== "/") {
      localStorage.removeItem("filters");
      setFilters([]);
    }
  }, [pathName]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("filters", JSON.stringify(filters));
    }
  }, [filters, isClient]);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
