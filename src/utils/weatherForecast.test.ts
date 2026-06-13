import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getForecast } from './weatherForecast'
import type { DayForecast, OpenMeteoResponse } from '../types/weather'

import { fetchRawForecast } from '../api/openMeteo'


vi.mock('../api/openMeteo', () => {
	return {
		fetchRawForecast: vi.fn()
	}
})

describe('Unit Test - weatherForecast', () => {
	describe('getForecast', () => {

		beforeEach(() => {
			vi.clearAllMocks()
		})

		it('format raw data user data to forecast', async () => {
			const mockApiResponse: OpenMeteoResponse = {
				latitude: -38.95,
				longitude: -68.06,
				daily: {
					time: ['2026-06-15'],
					precipitation_probability_max: [10],
					precipitation_sum: [0],
					windspeed_10m_max: [12.5],
					temperature_2m_max: [22.5],
					temperature_2m_min: [10.0],
					weathercode: [0] // Clear sky
				}
			};
  
			vi.mocked(fetchRawForecast).mockResolvedValue(mockApiResponse);

			const expectedResponse: DayForecast[] = [
				{
				date: '2026-06-15',
				precipitationProbability: 10,
				precipitationSum: 0,
				windspeedMax: 12.5,
				tempMax: 22.5,
				tempMin: 10.0,
				weatherCode: 0 // Clear sky
			}]

			const result = await getForecast(-38.95, -68.06);

			expect(result).toHaveLength(1)
			expect(result).toStrictEqual(expectedResponse)

		})

		it('format days to DayForecast', async () => {
			const mockApiResponse: OpenMeteoResponse = {
				latitude: -38.95,
				longitude: -68.06,
				daily: {
					time: ['2026-06-15', '2026-06-16'],
					precipitation_probability_max: [10, 0],
					precipitation_sum: [0, 0],
					windspeed_10m_max: [12.5, 30],
					temperature_2m_max: [22.5, 15],
					temperature_2m_min: [10.0, 12.3],
					weathercode: [0, 3]
				}
			};
  
			vi.mocked(fetchRawForecast).mockResolvedValue(mockApiResponse);

			const expectedResponse: DayForecast[] = [
				{
				date: '2026-06-15',
				precipitationProbability: 10,
				precipitationSum: 0,
				windspeedMax: 12.5,
				tempMax: 22.5,
				tempMin: 10.0,
				weatherCode: 0 // Clear sky
				},
				{
				date: '2026-06-16',
				precipitationProbability: 0,
				precipitationSum: 0,
				windspeedMax: 30,
				tempMax: 15,
				tempMin: 12.3,
				weatherCode: 3
			}]

			const result = await getForecast(-38.95, -68.06);
			
			expect(result).toHaveLength(2);
			expect(result).toStrictEqual(expectedResponse)

		})

		
	})
})
