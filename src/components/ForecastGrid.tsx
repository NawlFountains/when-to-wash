import ForecastCard from './ForecastCard'
import type { DayForecast } from '../types/weather'

interface ForecastGridProps {
	dayForecasts: DayForecast []
} 

export default function ForecastGrid({dayForecasts} : ForecastGridProps) {
	return (
		<>
		{dayForecasts.map((dayForecast) => (
				<ForecastCard dayForecast={dayForecast}/>
		))}
		</>
	)
}
