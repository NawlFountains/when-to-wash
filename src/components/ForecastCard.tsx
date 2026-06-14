import { getWeatherEmoji } from "../utils/weatherUtils"
import type { DayForecast } from "../types/weather"

interface ForecastCardProps {
	dayForecast: DayForecast
}



export default function ForecastCard({ dayForecast }: ForecastCardProps) {
	const weatherEmoji = getWeatherEmoji(dayForecast.weatherCode)
	const formattedDate = dayForecast.date.split('-').reverse().join('/')
	return (
		<div className="flex flex-col bg-gruv-fg0 rounded-xl text-center gap-2">
			<div className="w-full bg-gruv-orange rounded-t-xl p-2 text-gruv-fg0">
				<h2>{formattedDate}</h2>
			</div>
			<div className="pt-2 pb-4 px-4 text-gruv-bg0">

				<div className="p-1 mx-auto w-1/2 rounded-xl bg-gruv-bg2/80">
				<p className="text-xl">{weatherEmoji}</p>
				</div>
				<p>{dayForecast.precipitationProbability}% Precipitation</p>
				<p>{dayForecast.windspeedMax} km/h</p>
				<p>{dayForecast.tempMax} / {dayForecast.tempMin} ºC</p>
			</div>
		</div>
	)
}
