import axios from 'axios';

interface CityFields {
  name: string;
  country: string;
  timezone: string;
  population: number;
}

interface CityRecord {
  fields: CityFields;
}

interface ApiResponse {
  records: CityRecord[];
}



export const fetchCities = async (page: number): Promise<CityFields[]> => {
  const response = await axios.get<ApiResponse>(
    `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=50&start=${page * 50}`
  );

  // Extract and map the data according to the defined types
  return response.data.records.map(record => ({
    name: record.fields.name,
    country: record.fields.country,
    timezone: record.fields.timezone,
    population: record.fields.population,
  }));
};
