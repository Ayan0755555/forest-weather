import axios from 'axios';

export const fetchCities = async (page: number) => {
  const response = await axios.get(
    `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=50&start=${page * 50}`
  );
  return response.data.records.map((record: any) => ({
    name: record.fields.name,
    country: record.fields.country,
    timezone: record.fields.timezone,
    population: record.fields.population,
  }));
};
