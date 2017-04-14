# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-13 02:39
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0013_auto_20170413_0345'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=255, null=True, verbose_name='Author')),
                ('text', models.TextField(verbose_name='Text')),
                ('date', models.DateTimeField(auto_now=True, verbose_name='Date')),
            ],
            options={
                'verbose_name': 'Comment',
                'verbose_name_plural': 'Comments',
            },
        ),
        migrations.AlterModelOptions(
            name='survey',
            options={'verbose_name': 'Survey'},
        ),
        migrations.RemoveField(
            model_name='survey',
            name='is_current',
        ),
        migrations.AlterField(
            model_name='session',
            name='date',
            field=models.DateTimeField(auto_now=True, verbose_name='Date'),
        ),
        migrations.AddField(
            model_name='comment',
            name='session',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='surveys.Session', verbose_name='Session'),
        ),
    ]