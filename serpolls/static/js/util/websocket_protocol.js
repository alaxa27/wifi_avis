export function getWSProtocol() {
    return window.location.protocol === 'https:' ? 'wss' : 'ws'
}