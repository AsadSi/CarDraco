export function getCSRFToken() {
    const cookie = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
    return cookie ? cookie[2] : null;
}