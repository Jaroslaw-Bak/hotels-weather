import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

function App() {
	const [map, setMap] = useState(/** @type google.maps.Map */ (null));
	const [geo, setGeo] = useState(undefined);
	const [weatherbyDay, setWeatherByDay] = useState('');
	const [loadingData, setLoadingData] = useState(true);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response = await axios.get('http://localhost:3005');
		const lat = Number(response.data.hotel.lat);
		const lng = Number(response.data.hotel.lon);
		setGeo({ lat, lng });
		const weather = response.data.weather.list;
		const weatherDay = [
			[weather[1].main.temp, weather[1].dt_txt.slice(0, 10)],
			[weather[9].main.temp, weather[9].dt_txt.slice(0, 10)],
			[weather[17].main.temp, weather[17].dt_txt.slice(0, 10)],
			[weather[25].main.temp, weather[25].dt_txt.slice(0, 10)],
			[weather[33].main.temp, weather[33].dt_txt.slice(0, 10)],
		];
		setWeatherByDay(weatherDay);
		console.log(weatherDay);
		console.log(weather);
		setLoadingData(false);
	};

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});

	if (!isLoaded) {
		return <h1>O</h1>;
	}

	return (
		!loadingData && (
			<div>
				<div className='App'>
					{console.log(geo)}
					<GoogleMap
						center={geo}
						zoom={6}
						mapContainerStyle={{ width: '100%', height: '75vh' }}
						options={{
							zoomControl: false,
							streetViewControl: false,
							mapTypeControl: false,
							fullscreenControl: false,
						}}
						onLoad={(map) => setMap(map)}
					>
						<MarkerF position={geo} />
					</GoogleMap>
				</div>
				<div className='center'>
					<button onClick={() => window.location.reload(false)}>Losuj ponownie</button>
					<p>Pogoda:</p>
					<div className='flex'>
						{weatherbyDay.map((element) => (
							<div>
								<p>{element[1]}</p>
								<p>{element[0]}°C</p>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	);
}

export default App;
