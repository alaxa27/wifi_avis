# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-06 07:04
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0023_auto_20170506_0903'),
    ]

    operations = [
        migrations.AlterField(
            model_name='respondent',
            name='age',
            field=models.PositiveIntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(120)], verbose_name='Age'),
        ),
    ]
