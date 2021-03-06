# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-13 01:27
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0010_session_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='multipleanswer',
            name='session',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='surveys.Session', verbose_name='Session'),
        ),
        migrations.AddField(
            model_name='rankanswer',
            name='session',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='surveys.Session', verbose_name='Session'),
        ),
        migrations.AddField(
            model_name='rateanswer',
            name='session',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='surveys.Session', verbose_name='Session'),
        ),
        migrations.AddField(
            model_name='uniqueanswer',
            name='session',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='surveys.Session', verbose_name='Session'),
        ),
    ]
