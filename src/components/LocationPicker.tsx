import { useMapEvents } from 'react-leaflet'

export default function LocationPicker({ onLocationSelect }) {
	useMapEvents({
		click(e) {
			onLocationSelect(e.latlng)
		}
	})
	return null
}
