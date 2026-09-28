import { PUBLIC_API_BASE_URL } from '$env/static/public';

export const checkHealth = async () => {
	try {
		const response = await fetch(PUBLIC_API_BASE_URL + '/health');
		if (!response.ok) {
			return false;
		}

		return true;
	} catch (e) {
		console.error('checkHealth: ' + e);
		return false;
	}
};
