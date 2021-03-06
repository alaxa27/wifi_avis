# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-03 02:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0016_auto_20170503_0200'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='scale_type',
            field=models.CharField(choices=[('NORM', 'Normal'), ('STARS', 'Stars'), ('HEARTS', 'Hearts')], default='NORM', max_length=4, verbose_name='Rate type'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='gender',
            field=models.CharField(choices=[('NDEF', 'Undefined'), ('MALE', 'Male'), ('FEMA', 'Female')], default='NDEF', max_length=4, verbose_name='Gender'),
        ),
    ]
