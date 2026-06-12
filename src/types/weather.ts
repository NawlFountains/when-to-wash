export interface OpenMeteoResponse {
	latitude: number
	longitude: number
	daily: {
		time: string[]
		precipitation_probability_max: number[]
		precipitation_sum: number[]
		windspeed_10m_max: number[]
		temperature_2m_max: number[]
		temperature_2m_min: number[]
		weathercode: number[]
	}
}

export interface DayForecast {
	date: string
	precipitationProbability: number
	precipitationSum: number
	windspeedMax: number
	tempMax: number
	tempMin: number
	weatherCode: number
}
