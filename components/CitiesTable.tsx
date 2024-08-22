"use client";
import React, { useState, useEffect } from "react";
import { City } from "@/types/page";
import { fetchCities } from "@/utils/api";

const CitiesTable: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredCities, setFilteredCities] = useState<City[]>([]);

  useEffect(() => {
    const loadCities = async () => {
      const newCities = await fetchCities(page);
      setCities((prevCities) => [...prevCities, ...newCities]);
    };
    loadCities();
  }, [page]);

  useEffect(() => {
    if (search) {
      setFilteredCities(
        cities.filter((city) =>
          city.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredCities(cities);
    }
  }, [search, cities]);

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search cities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full p-2 border border-gray-300 rounded"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="px-4 py-2 border-b text-center">City Name</th>
              <th className="px-4 py-2 border-b text-center">Country</th>
              <th className="px-4 py-2 border-b text-center">Timezone</th>
              <th className="px-4 py-2 border-b text-center">Population</th>
            </tr>
          </thead>
          <tbody>
            {filteredCities.map((city, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-center">
                  <a
                    href={`/weather/${city.name}`}
                    className="text-blue-600 hover:underline"
                  >
                    {city.name}
                  </a>
                </td>
                <td className="px-4 py-2 border-b text-center">{city.timezone}</td>
                <td className="px-4 py-2 border-b text-center">{city.country}</td>
                <td className="px-4 py-2 border-b text-center">{city.population}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Load More
      </button>
    </div>
  );
};

export default CitiesTable;
