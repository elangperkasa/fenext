export function getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
}

export async function fetchWithAuth(
    url: string,
    options: RequestInit = {}
): Promise<any> {
    const token = getAuthToken();

    if (!token) {
        throw new Error('No auth token found. Please log in.');
    }

    const headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const response = await fetch(url, {
        ...options,
        headers
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Fetch error');
    }

    return response.json();
}

export function clearAuthToken() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
    }
}