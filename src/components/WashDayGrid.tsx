import ForecastCard from './ForecastCard'
import type { WashDay} from '../types/wash'

interface WashDayGridProps {
	washDays: WashDay []
} 

export default function WashDayGrid({washDays} : WashDayGridProps) {
	return (
		<div className='flex flex-wrap gap-2 w-full justify-center'>
		{washDays.map((washDay) => (
				<ForecastCard key={washDay.forecast.date} dayForecast={washDay.forecast}/>
		))}
		</div>
	)
}
