import { useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { divIcon } from 'leaflet'
import LocationPicker from './components/LocationPicker'
import { useCarWasAdvisior } from './hooks/useCarWashAdvisor'
import WashDayGrid from './components/WashDayGrid'

function App() {
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
	const { location,
		setLocation,
		recommendations,
		loading,
		optimalWashDay,
		error,
		handleRecommendations } = useCarWasAdvisior()

  return (
    <>
    <div className='bg-gruv-fg2 min-h-screen px-4 font-inter'>
	    <div className='flex flex-col w-full md:w-1/2 py-4 gap-4 mx-auto'>
		    <div>
		    <h1 className='text-xl text-center'>
			Select your location
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
			    <h2>
				Select want to know if it's useful to wash your car
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
		    {optimalWashDay && (
			<div>
			Optimal wash day is {optimalWashDay.forecast.date}
			</div>
		    )}
		    {recommendations && (
			<WashDayGrid washDays={recommendations}/>
		    )}
	    </div>
    </div>
    </>
  )
}

export default App
