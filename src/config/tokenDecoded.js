 export function decodeJWT(token) {
    // Split the token into parts
    const parts = token && token?.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT token');
    }

    const header = parts[0];
    const payload = parts[1];

    // Decode Base64Url to Base64
    const base64 = (base64Url) => base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // Decode the parts
    const decodedHeader = atob(base64(header));
    const decodedPayload = atob(base64(payload));

    // Parse JSON
    const parsedHeader = JSON.parse(decodedHeader);
    const parsedPayload = JSON.parse(decodedPayload);

    return { header: parsedHeader, payload: parsedPayload };
}


