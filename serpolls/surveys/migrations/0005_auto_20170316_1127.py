# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-16 10:27
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0004_survey_is_current'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='choice',
            unique_together=set([('text', 'question')]),
        ),
    ]
