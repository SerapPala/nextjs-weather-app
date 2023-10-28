import React, { useState } from "react";
import { useRouter } from "next/router";
import TurkeyMap from "turkey-map-react";

export default function Weathers() {
    const router = useRouter();
    const [selectedCity, setSelectedCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [tooltipText, setTooltipText] = useState('');

    const updateWeatherData = async (cityName) => {
        setSelectedCity(cityName);
        setWeatherData(null);
        setError(null);
        try {
            const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                setWeatherData(data);
                setError(null);
            } else {
                setError('Hava durumu verisi bulunamadı.');
            }
        } catch (error) {
            console.error('Hava durumu verisi alınamadı:', error);
            setError('Hava durumu verisi alınamadı.');
        }
    };

    const handleCityClick = async ({ name }) => {
        const cityDetailUrl = `/weathers/${name}`;
        router.push(cityDetailUrl);
    };

    const handleCityHover = ({ name }) => {
        updateWeatherData(name);
        setTooltipText(
            weatherData
                ? `${name} ${weatherData.main?.temp || ""}°C ${
                    weatherData.weather?.[0]?.description || ""
                }`
                : 'Loading...'
        );
    };


    return (
        <div>
            <div className="bg-neutral-800 h-100">
                <div className="container mx-auto my-auto">
                    <div className="flex items-center  justify-center ">
                        <h1 className="my-7 flex px-3 py-2 rounded-lg bg-white dark:bg-neutral-900 text-sm font-semibold items-center justify-center min-w-max shadow-lg   dark:hover-bg-white dark:hover-text-neutral-900 text-3xl leading-[115%] md:text-5xl ">
                            Türkiye Hava Durumu Uygulaması
                        </h1>
                    </div>
                    <div>
                        <TurkeyMap
                            onClick={handleCityClick}
                            hoverable={true}
                            showTooltip={true}
                            customStyle={{ idleColor: "#f5f5f5", hoverColor: "#145AFF" }}
                            onCityHover={handleCityHover}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}
