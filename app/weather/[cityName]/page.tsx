import React from 'react';
import Weather from '@/components/Weather';

const WeatherPage = ({ params }: { params: { cityName: string } }) => {
    console.log(params,"params")
  const { cityName } = params;

  return (
    <div>
      <Weather cityName={cityName} />
    </div>
  );
};

export default WeatherPage;
