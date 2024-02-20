// httpClient.js

export const httpClient = (url, method='get', body= null) => fetch(url, {
    method,
    headers: {
        'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
});

// Other client-side code...
