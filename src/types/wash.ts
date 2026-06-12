import type { DayForecast } from './weather'

export type WashRating = 'great' | 'good' | 'poor' | 'avoid'


export interface WashScore {
	rating: WashRating
	reasons: string[]
}

export interface WashDay {
	forecast: DayForecast
	score: WashScore
}
