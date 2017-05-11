from channels.routing import route
from surveys.consumers import *


channel_routing = [
    route('websocket.connect', ws_add_current, path=r'^/surveys/current/$'),
    route('websocket.connect', ws_add_results, path=r'^/surveys/current/results/$'),
    route('websocket.connect', ws_add_comments_select, path=r'/surveys/current/comments/$'),
    route('websocket.disconnect', ws_disconnect),
    route('websocket.receive', ws_valid_comment, path=r'/surveys/current/comments/$'),
]
