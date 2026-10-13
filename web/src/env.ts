import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	API_BASE_URL: {
		public: true
	},
    ANNOUNCEMENT_TSV_URL: {
        public: true
    }
});
