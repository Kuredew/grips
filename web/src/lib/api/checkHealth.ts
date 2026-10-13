import { API_BASE_URL } from '$app/env/public';

export const checkHealth = async () => {
	try {
		const response = await fetch(API_BASE_URL + '/health', { cache: 'no-store' });
		if (!response.ok) {
			return false;
		}

		return true;
	} catch (e) {
		console.error('checkHealth: ' + e);
		return false;
	}
};
