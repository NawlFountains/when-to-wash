import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import LocationPicker from './components/LocationPicker'
import { useCarWasAdvisior } from './hooks/useCarWashAdvisor'

function App() {
	const { location,
		setLocation,
		forecast,
		daysToForecast,
		setDaysToForecast,
		recommendation,
		loading,
		error,
		handleRecommendation } = useCarWasAdvisior()

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

			    </MapContainer>
			    {location && (
			<div className='text-center'>
			Selected Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
			</div>
		      )}
		    </div>

		    <div className='p-2 bg-gruv-fg0 w-full shadow-lg shadow-gruv-bg2/40 mx-auto rounded-lg flex flex-col gap-4'>
			    <h2>
				Select want to know if it's useful to wash your car
			    </h2>

			    <div className='flex flex-col md:flex-row w-full gap-4'>
				<input className='bg-gruv-fg0 rounded-md text-center flex-1' placeholder='7' value={daysToForecast} onChange={(e) => setDaysToForecast(Number(e.target.value))} />
				<button 
					onClick={handleRecommendation}
					className='bg-gruv-orange text-gruv-fg1 p-2 px-4 rounded-sm flex-1 hover:bg-gruv-fg1 hover:text-gruv-bg2 cursor-pointer transition duration-200'>
					Calculate
				</button>
			    </div>
		    </div>
	    </div>
    </div>
    </>
  )
}

export default App
