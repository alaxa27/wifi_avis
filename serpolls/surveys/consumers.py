import json

from channels import Group
from channels.sessions import channel_session


@channel_session
def ws_valid_comment(message):
    Group('comments-valid').send({'text': json.dumps({
        'type': 'comment',
        'text': message.content['text']
    })})


@channel_session
def ws_add_results(message):
    message.reply_channel.send({'accept': True})
    Group('survey').add(message.reply_channel)
    Group('results').add(message.reply_channel)
    Group('comments-valid').add(message.reply_channel)


@channel_session
def ws_add_current(message):
    message.reply_channel.send({'accept': True})
    Group('survey').add(message.reply_channel)


@channel_session
def ws_add_comments_select(message):
    message.reply_channel.send({'accept': True})
    Group('comments').add(message.reply_channel)


@channel_session
def ws_disconnect(message):
    Group('survey').discard(message.reply_channel)
    Group('results').discard(message.reply_channel)
    Group('comments').discard(message.reply_channel)
    Group('comments-valid').discard(message.reply_channel)
