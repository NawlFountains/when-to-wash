import { describe, it, expect } from 'vitest'
import type {DayForecast} from "../types/weather"
import type {WashDay, WashScore} from '../types/wash'
import {calculateDailyScore, getOptimalWashDay} from './washScore'

function mockDayForecast(date: string, precipitationProbability: number, precipitationSum: number, windspeedMax : number, tempMax: number, tempMin: number, weatherCode: number): DayForecast {
	const mockForecast: DayForecast = {
		date,
		precipitationProbability,
		precipitationSum,
		windspeedMax,
		tempMax,
		tempMin,
		weatherCode
	}

	return mockForecast
}

describe ('Integration Test - washRating', () => {
	it('should calculate correctly ratings and return optimal day', () => {
		const mockForecast: DayForecast [] = [
			mockDayForecast('2026-06-01',90,12.0,15,14,8,95), //Rain
			mockDayForecast('2026-06-02',5,1.0,0,14,8,0), // This is the optimal day
			mockDayForecast('2026-06-03',0,0,15,14,8,3), // Mild wind
			mockDayForecast('2026-06-04',10,1.2,2,14,8,2), 
			mockDayForecast('2026-06-05',90,10.0,15,14,8,52), //Rain
			mockDayForecast('2026-06-06',0,0.0,15,14,8,0),
			mockDayForecast('2026-06-07',2,1.2,15,14,8,1),
		]

		const forecastRatings: WashScore[] = []
		for (let i = 0; i < mockForecast.length; i++) {
			forecastRatings[i] = calculateDailyScore(mockForecast[i])
		}

		const forecastWashDays: WashDay[] = []
		for (let i = 0; i < forecastRatings.length; i++) {
			forecastWashDays[i] = { forecast: mockForecast[i], score: forecastRatings[i]}
		}

		const result = getOptimalWashDay(forecastWashDays)

		expect(result).toBe(forecastWashDays[1])
	})

	it('On a rainy and windy week should return null', () => {
		const mockForecast: DayForecast [] = [
			mockDayForecast('2026-06-01',90,12.0,15,14,8,95), //Rain
			mockDayForecast('2026-06-02',0,0,30,35,8,3), // Windy 
			mockDayForecast('2026-06-03',90,12.0,15,14,8,53), //Rain
			mockDayForecast('2026-06-04',50,8.0,30,14,8,51), //Rain
			mockDayForecast('2026-06-05',90,10.0,30,14,8,52), //Rain
			mockDayForecast('2026-06-06',0,0,30,14,8,3), // Windy 
			mockDayForecast('2026-06-07',0,0,30,14,8,2), // Windy 
		]

		const forecastRatings: WashScore[] = []
		for (let i = 0; i < mockForecast.length; i++) {
			forecastRatings[i] = calculateDailyScore(mockForecast[i])
		}

		const forecastWashDays: WashDay[] = []
		for (let i = 0; i < forecastRatings.length; i++) {
			forecastWashDays[i] = { forecast: mockForecast[i], score: forecastRatings[i]}
		}

		const result = getOptimalWashDay(forecastWashDays)

		expect(result).toBeNull()
	})

	it('On a rainy but last day is great be optimistic it could be good', () => {
		const mockForecast: DayForecast [] = [
			mockDayForecast('2026-06-01',90,12.0,15,14,8,95), //Rain
			mockDayForecast('2026-06-02',0,0,30,14,8,3), // Windy 
			mockDayForecast('2026-06-03',90,12.0,15,14,8,53), //Rain
			mockDayForecast('2026-06-04',50,8.0,15,14,8,51), //Rain
			mockDayForecast('2026-06-05',90,10.0,15,14,8,52), //Rain
			mockDayForecast('2026-06-06',0,0,30,14,8,3), // Windy 
			mockDayForecast('2026-06-07',0,0,0,14,8,0), // Windy 
		]

		const forecastRatings: WashScore[] = []
		for (let i = 0; i < mockForecast.length; i++) {
			forecastRatings[i] = calculateDailyScore(mockForecast[i])
		}

		const forecastWashDays: WashDay[] = []
		for (let i = 0; i < forecastRatings.length; i++) {
			forecastWashDays[i] = { forecast: mockForecast[i], score: forecastRatings[i]}
		}

		const result = getOptimalWashDay(forecastWashDays)

		expect(result).toBe(forecastWashDays[6])
	})
})
