# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-13 01:03
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0008_auto_20170413_0257'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='survey',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='surveys.Survey', verbose_name='Survey'),
        ),
    ]
