export function home() {
    window.location.href = './dashboard.html'
}

export function signOut() {
    sessionStorage.clear();
    window.location.href = './login.html'
}