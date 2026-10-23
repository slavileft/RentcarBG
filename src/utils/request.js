export default async function request(url, path, method = 'GET', data = null, token = null) {
    const options = {
        method,
        headers: {
            apikey: import.meta.env.VITE_API_KEY,
        },
    };

    if (method !== 'GET') {
        options.headers.Prefer = 'return=representation';
    }

    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    let response;
    try {
        response = await fetch(`${url}${path}`, options);
    } catch {
        throw new Error('Няма връзка със сървъра. Проверете интернет връзката.');
    }

    if (response.status === 401 && token) {
        localStorage.removeItem('auth');
        window.location.assign('/login');
        throw new Error('Сесията ви е изтекла. Моля, влезте отново.');
    }

    if (response.status === 204) {
        return null;
    }

    let body = null;
    try {
        body = await response.json();
    } catch {
        body = null;
    }

    if (!response.ok) {
        const message =
            body?.message || body?.msg || body?.error_description || body?.error;

        throw new Error(message || `Грешка при заявката (код ${response.status}).`);
    }

    return body;
}