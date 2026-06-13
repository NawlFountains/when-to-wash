import type {OpenMeteoResponse} from "../types/weather"

export async function fetchRawForecast(lat: number, lon: number): Promise<OpenMeteoResponse> {
	const baseUrl = 'https://api.open-meteo.com/v1/forecast';
	const params = new URLSearchParams({
		latitude: String(lat),
		longitude: String(lon),
		daily: [
			'precipitation_probability_max',
			'precipitation_sum',
			'windspeed_10m_max',
			'temperature_2m_max',
			'temperature_2m_min',
			'weathercode'
		].join(','),
		timezone: 'auto'
	})

	const response = await fetch(`${baseUrl}?${String(params)}`)
	if (!response.ok) throw new Error(`OpenMeteo API error with status ${response.status}`)

	const data: OpenMeteoResponse = await response.json()
	return data 
}
