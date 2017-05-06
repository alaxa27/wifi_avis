# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-03 03:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0017_auto_20170503_0456'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='scale_type',
            field=models.CharField(choices=[('NORMAL', 'Normal'), ('STARS', 'Stars'), ('HEARS', 'Hearts')], default='NORMAL', max_length=6, verbose_name='Rate type'),
        ),
    ]
