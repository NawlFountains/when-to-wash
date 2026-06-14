import ForecastCard from './ForecastCard'
import type { WashDay} from '../types/wash'

interface WashDayGridProps {
	washDays: WashDay []
} 

export default function WashDayGrid({washDays} : WashDayGridProps) {
	return (
		<div className='flex flex-col bg-gruv-fg1 p-5 rounded-lg gap-3'>
		<p className='text-lg text-center text-gruv-bg0 font-bold'>
			Weekly forecast
		</p>
		<div className='flex flex-wrap gap-4 w-full justify-center'>
		
		{washDays.map((washDay) => (
				<ForecastCard key={washDay.forecast.date} dayForecast={washDay.forecast}/>
		))}
		</div>
		</div>
	)
}
