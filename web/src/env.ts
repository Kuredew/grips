import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	// grips backend api base url, required
	API_BASE_URL: {
		public: true
	},
	// optional, this will be used to display the announcement at the very top of the page.
	ANNOUNCEMENT_TSV_URL: {
		public: true,
		schema(value) {
			if (!value) return null;
			return value;
		}
	}
});
