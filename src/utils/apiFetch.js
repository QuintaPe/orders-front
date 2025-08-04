const ApiFetch = (baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api') => {
    const instance = {
        async request(endpoint, options = {}) {
            const url = `${baseURL}/${endpoint}`;

            const defaultOptions = {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies for authentication
            };

            const config = {
                ...defaultOptions,
                ...options,
                headers: {
                    ...defaultOptions.headers,
                    ...options.headers,
                },
            };

            try {
                const response = await fetch(url, config);

                if (!response.ok) {
                    let errorMessage = `Error ${response.status}`;

                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.message || errorData.error || errorMessage;
                    } catch (parseError) {
                        // If we can't parse JSON, use status text
                        errorMessage = response.statusText || errorMessage;
                    }

                    const error = new Error(errorMessage);
                    error.status = response.status;
                    error.response = response;
                    throw error;
                }

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return await response.json();
                }

                return await response.text();
            } catch (error) {
                console.error('API request failed:', error);

                // Handle network errors
                if (error.name === 'TypeError' && error.message.includes('fetch')) {
                    throw new Error('Error de conexión. Verifica tu conexión a internet.');
                }

                throw error;
            }
        },

        get(endpoint, options = {}) {
            return this.request(endpoint, { ...options, method: 'GET' });
        },

        post(endpoint, data, options = {}) {
            return this.request(endpoint, {
                ...options,
                method: 'POST',
                body: JSON.stringify(data),
            });
        },

        put(endpoint, data, options = {}) {
            return this.request(endpoint, {
                ...options,
                method: 'PUT',
                body: JSON.stringify(data),
            });
        },

        patch(endpoint, data, options = {}) {
            return this.request(endpoint, {
                ...options,
                method: 'PATCH',
                body: JSON.stringify(data),
            });
        },

        delete(endpoint, options = {}) {
            return this.request(endpoint, { ...options, method: 'DELETE' });
        },
    };

    return instance;
};

export default ApiFetch; 