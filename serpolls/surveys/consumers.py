from channels import Group
from channels.sessions import channel_session


@channel_session
def ws_echo(message):
    message.reply_channel.send({
        'text': message.content['text'],
    })


@channel_session
def ws_add(message):
    message.reply_channel.send({'accept': True})
    Group('survey').add(message.reply_channel)


@channel_session
def ws_disconnect(message):
    Group('survey').discard(message.reply_channel)
