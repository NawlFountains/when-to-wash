import { beforeEach, afterEach, describe, expect, it, vi} from 'vitest'
import type {OpenMeteoResponse} from '../types/weather'
import {fetchRawForecast} from './openMeteo'

const mockResponse: OpenMeteoResponse = {
	latitude: 40.0,
	longitude: -8.0,
	daily: {
		time: ['2024-01-01', '2024-01-02'],
		precipitation_probability_max: [10, 80],
		precipitation_sum: [0, 5],
		windspeed_10m_max: [15, 30],
		temperature_2m_max: [25, 20],
		temperature_2m_min: [15, 12],
		weathercode: [0, 61],
	}
}

describe('Unit test - OpenMeteo API', () => {
	describe('fetchRawData', () => {

		beforeEach(() => {
			vi.stubGlobal('fetch', vi.fn())
		})

		afterEach(() => {
			vi.unstubAllGlobals()
		})

		it('calls the correct url with lat and lon params', async () => {
			vi.mocked(fetch).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			} as Response)

			await fetchRawForecast(-38.95, -68.06)

			const calledUrl = vi.mocked(fetch).mock.calls[0][0] as string
			expect(calledUrl).toContain('latitude=-38.95')
			expect(calledUrl).toContain('longitude=-68.06')
			expect(calledUrl).toContain('api.open-meteo.com')
		})

		it ('returns parsed response on success', async () => {
			vi.mocked(fetch).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			} as Response)

			const result = await fetchRawForecast(40.0, -8.0)
			expect(result).toEqual(mockResponse)
		})

		it ('throws error when response is not ok', async () => {
			vi.mocked(fetch).mockResolvedValueOnce({
				ok: false,
				status: 500,
			} as Response)

			await expect(fetchRawForecast(40.0, -8.0)).rejects.toThrow('OpenMeteo API error with status 500')
		})


		it('includes all required daily fields in the request', async () => {
			vi.mocked(fetch).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			} as Response)

				await fetchRawForecast(40.0, -8.0)

				const calledUrl = vi.mocked(fetch).mock.calls[0][0] as string
				expect(calledUrl).toContain('precipitation_probability_max')
				expect(calledUrl).toContain('precipitation_sum')
				expect(calledUrl).toContain('temperature_2m_max')
				expect(calledUrl).toContain('temperature_2m_min')
				expect(calledUrl).toContain('windspeed_10m_max')
				expect(calledUrl).toContain('weathercode')
		})
	})
})

