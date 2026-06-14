import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { divIcon } from 'leaflet'
import LocationPicker from './components/LocationPicker'
import { useCarWasAdvisor } from './hooks/useCarWashAdvisor'
import WashDayGrid from './components/WashDayGrid'
import ForecastCard from './components/ForecastCard'

const pinIcon= divIcon({
		html: `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
			<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#d65d0e" stroke="#7c5200" stroke-width="1"/>
		<circle cx="12" cy="9" r="2.5" fill="#fbf1c7"/>
		</svg>
		`,
		className: '',
		iconSize: [32, 32],
		iconAnchor: [16, 32],
})

function App() {
	
	const { location,
		setLocation,
		recommendations,
		loading,
		optimalWashDay,
		error,
		handleRecommendations } = useCarWasAdvisor()

  return (
    <>
    <div className='bg-gruv-fg2 min-h-screen px-4 font-inter'>
	    <div className='flex flex-col w-full md:w-1/2 py-4 gap-4 mx-auto'>
		    <div>
		    <h1 className='text-xl text-center'>
		    	Want to know the best day to wash your car this week?
		    </h1>
		    </div>

		    <div className='p-2 bg-gruv-fg0 w-full shadow-lg shadow-gruv-bg2/40 mx-auto rounded-lg'>
			    <MapContainer className='h-[500px] w-full rounded-lg' center={[-37.505, -65.09]} zoom={5} scrollWheelZoom={false}>
				    <TileLayer
				    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
				    />
				    <LocationPicker onLocationSelect={setLocation} />
				    {location && (<Marker position={[location.lat, location.lng]} icon={pinIcon} />)}

			    </MapContainer>
			    {location && (
				    <div className='text-center p-2'>
				    Selected Lat: {location.lat.toFixed(4)}, Lon: {location.lng.toFixed(4)}
				    </div>
			    )}
		    </div>

		    <div className='p-2 bg-gruv-fg0 w-full shadow-lg shadow-gruv-bg2/40 mx-auto rounded-lg flex flex-col gap-4'>
			    <h2 className='text-center'>
			    	Select your location on the map and then click Calculate
			    </h2>

			    <div className='flex flex-col md:flex-row w-full gap-4'>
				<button 
					onClick={handleRecommendations}
					disabled={loading}
					className={`${loading ? 'bg-gruv-fg2 text-gruv-bg1' : 'bg-gruv-orange text-gruv-fg1' } p-2 px-4 rounded-sm flex-1 hover:bg-gruv-fg1 hover:text-gruv-bg2 cursor-pointer transition duration-200`}>
					{loading ? 'Calculating' : 'Calculate'}
				</button>
			    </div>
		    </div>
		    {error && (<p className='text-gruv-red'>{error}</p>)}
		    {recommendations && (
			    <div className='flex flex-col gap-4'>
			    <div className='text-center'>
			    {optimalWashDay ? (
				    <div className='flex flex-col bg-gruv-fg0 rounded-lg p-2 w-full gap-4'>
				    <p>
				    Optimal wash day is 
				    </p>
				    <div className='w-40 mx-auto border border-gruv-fg3 rounded-xl'>
				    <ForecastCard dayForecast={optimalWashDay.forecast}/>
				    </div>
				    </div>
			    ) : (
				<p>It's not a good week to wash your car</p>	
			    )}
			    </div>
			    <WashDayGrid washDays={recommendations}/>
			    </div>
		    )}
	    </div>
    </div>
    </>
  )
}

export default App
