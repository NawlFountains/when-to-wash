import { fetchRawForecast } from "../api/openMeteo";
import type {DayForecast} from "../types/weather";

export async function getForecast(lat: number, lon: number): Promise<DayForecast[]> {
	const data = await fetchRawForecast(lat, lon)
	const formattedForecast: DayForecast[] = data.daily.time.map((timeString, index) => {
		return {
			date: timeString,
			precipitationProbability: data.daily.precipitation_probability_max[index],
			precipitationSum: data.daily.precipitation_sum[index],
			windspeedMax: data.daily.windspeed_10m_max[index],
			tempMax: data.daily.temperature_2m_max[index], 
			tempMin: data.daily.temperature_2m_min[index], 
			weatherCode: data.daily.weathercode[index] 
		}
	})

	return formattedForecast
}

