# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-07 03:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0002_auto_20170126_0901'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]
