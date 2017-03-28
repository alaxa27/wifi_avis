from channels import Group


def ws_echo(message):
    message.reply_channel.send({
        'text': message.content['text'],
    })


def ws_add(message):
    message.reply_channel.send({'accept': True})
    Group('survey').add(message.reply_channel)


def ws_disconnect(message):
    Group('survey').discard(message.reply_channel)
