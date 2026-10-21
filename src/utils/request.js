export default async function request(url, path, method = 'GET', data = null, token=null) {
    const options = {
        headers: {
            'apikey': import.meta.env.VITE_API_KEY,
        }
    }

    if (method != 'GET') {
        options.method = method;
    }

    if (method === 'DELETE'){
        options.headers["Prefer"] = "return=representation";
    }

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.headers["Prefer"] = "return=representation";
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${url}${path}`, options);

    if (!response.ok) {
        throw new Error(`HTML error! status: ${response.status}`);
    }

    return response.json();
};