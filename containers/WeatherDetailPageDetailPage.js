import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Head from "next/head";

export default function WeatherDetailPage() {
    const router = useRouter();
    const {id} = router.query;
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${id}&appid=${apiKey}&units=metric`;

                const response = await fetch(apiUrl);
                const data = await response.json();

                if (response.ok) {
                    setWeatherData(data);
                } else {
                    return;
                }
            } catch (error) {
                console.error("Hava durumu verisi alınamadı:", error);
            }
        };

        if (id) {
            fetchWeatherData();
        }
    }, [id]);

    const descriptions = [
        "Sıcaklık (°C)",
        "Hissedilen Sıcaklık (°C)",
        "Rüzgar Hızı (km/s)",
        "Güneşin Doğuş Zamanı",
        "Ayın Doğuş Zamanı",
    ];

    return (
        <>
          <Head>
                <title>{id} Hava Durumu</title>
            </Head>
            <Breadcrumb id={id}/>
            {weatherData ? (
                <div className={"my-auto"}>
                    <div className={`grid-container `}>
                        {descriptions.map((description, index) => (
                            <div key={index}
                                 className={"card my-10 py-3 px-3 rounded-lg bg-white dark:bg-neutral-900 text-sm font-semibold items-center justify-center min-w-max shadow-lg hover:bg-neutral-900 hover:text-white dark:hover-bg-white dark:hover-text-neutral-900 text-3xl leading-[115%] md:text-5xl"}>
                                <div className={"card__title"}>{description}</div>
                                <p className={"card__description"}>
                                    {index === 0
                                        ? weatherData.main.temp
                                        : index === 1
                                            ? weatherData.main.feels_like
                                            : index === 2
                                                ? weatherData.wind.speed
                                                : index === 3
                                                    ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('tr-TR')
                                                    : new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('tr-TR')}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            ) : (
                <div className="absolute bg-white dark:bg-neutral-900 p-2 rounded-lg shadow-lg">
                    <p className="text-center text-gray-700">Loading...</p>
                </div>
            )}
        </>
    );
}
