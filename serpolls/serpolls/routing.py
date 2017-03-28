from channels.routing import route
from surveys.consumers import ws_add, ws_disconnect, ws_echo

channel_routing = [
    route('websocket.connect', ws_add),
    route('websocket.disconnect', ws_disconnect),
    route('websocket.receive', ws_echo),
]
