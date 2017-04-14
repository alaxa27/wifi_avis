# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-12 05:03
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0005_auto_20170316_1127'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='choice',
            options={'verbose_name': 'Choice', 'verbose_name_plural': 'Choices'},
        ),
        migrations.AlterModelOptions(
            name='multipleanswer',
            options={'verbose_name': 'Multiple answer', 'verbose_name_plural': 'Multiple answers'},
        ),
        migrations.AlterModelOptions(
            name='question',
            options={'verbose_name': 'Question', 'verbose_name_plural': 'Questions'},
        ),
        migrations.AlterModelOptions(
            name='rankanswer',
            options={'verbose_name': 'Rank answer', 'verbose_name_plural': 'Rank answers'},
        ),
        migrations.AlterModelOptions(
            name='rankchoicepair',
            options={'verbose_name': 'Rank-choice pair', 'verbose_name_plural': 'Rank-choice pairs'},
        ),
        migrations.AlterModelOptions(
            name='rateanswer',
            options={'verbose_name': 'Rate answer', 'verbose_name_plural': 'Rate answers'},
        ),
        migrations.AlterModelOptions(
            name='survey',
            options={'verbose_name': 'Survey', 'verbose_name_plural': 'Surveys'},
        ),
        migrations.AlterModelOptions(
            name='uniqueanswer',
            options={'verbose_name': 'Unique answer', 'verbose_name_plural': 'Unique answers'},
        ),
        migrations.RemoveField(
            model_name='choice',
            name='votes',
        ),
        migrations.AlterField(
            model_name='choice',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='', verbose_name='Image'),
        ),
        migrations.AlterField(
            model_name='choice',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='surveys.Question', verbose_name='Question'),
        ),
        migrations.AlterField(
            model_name='choice',
            name='text',
            field=models.CharField(max_length=255, verbose_name='Choice'),
        ),
        migrations.AlterField(
            model_name='multipleanswer',
            name='choices',
            field=models.ManyToManyField(to='surveys.Choice', verbose_name='Choices'),
        ),
        migrations.AlterField(
            model_name='multipleanswer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='surveys.Question', verbose_name='Question'),
        ),
        migrations.AlterField(
            model_name='question',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='', verbose_name='Image'),
        ),
        migrations.AlterField(
            model_name='question',
            name='is_active',
            field=models.BooleanField(default=False, verbose_name='Active'),
        ),
        migrations.AlterField(
            model_name='question',
            name='scale',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Scale'),
        ),
        migrations.AlterField(
            model_name='question',
            name='survey',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='surveys.Survey', verbose_name='Survey'),
        ),
        migrations.AlterField(
            model_name='question',
            name='text',
            field=models.TextField(verbose_name='Question'),
        ),
        migrations.AlterField(
            model_name='question',
            name='type',
            field=models.CharField(choices=[('UNIQ', 'Unique'), ('MULT', 'Multiple'), ('RANK', 'Rank'), ('RATE', 'Rate')], default='UNIQ', max_length=4, verbose_name='Type'),
        ),
        migrations.AlterField(
            model_name='rankanswer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='surveys.Question', verbose_name='Question'),
        ),
        migrations.AlterField(
            model_name='rankanswer',
            name='rank_choice_pairs',
            field=models.ManyToManyField(to='surveys.RankChoicePair', verbose_name='Rank-choice pair'),
        ),
        migrations.AlterField(
            model_name='rankchoicepair',
            name='choice',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='surveys.Choice', verbose_name='Choice'),
        ),
        migrations.AlterField(
            model_name='rankchoicepair',
            name='rank',
            field=models.PositiveIntegerField(verbose_name='Rank'),
        ),
        migrations.AlterField(
            model_name='rateanswer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='surveys.Question', verbose_name='Question'),
        ),
        migrations.AlterField(
            model_name='rateanswer',
            name='rating',
            field=models.PositiveIntegerField(verbose_name='Rating'),
        ),
        migrations.AlterField(
            model_name='survey',
            name='is_current',
            field=models.BooleanField(default=False, verbose_name='Current'),
        ),
        migrations.AlterField(
            model_name='survey',
            name='title',
            field=models.CharField(max_length=255, verbose_name='Title'),
        ),
        migrations.AlterField(
            model_name='uniqueanswer',
            name='choice',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='surveys.Choice', verbose_name='Choice'),
        ),
        migrations.AlterField(
            model_name='uniqueanswer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='surveys.Question', verbose_name='Question'),
        ),
        migrations.AlterUniqueTogether(
            name='multipleanswer',
            unique_together=set([]),
        ),
        migrations.AlterUniqueTogether(
            name='rankanswer',
            unique_together=set([]),
        ),
        migrations.AlterUniqueTogether(
            name='rateanswer',
            unique_together=set([]),
        ),
        migrations.AlterUniqueTogether(
            name='uniqueanswer',
            unique_together=set([]),
        ),
        migrations.RemoveField(
            model_name='multipleanswer',
            name='user',
        ),
        migrations.RemoveField(
            model_name='rankanswer',
            name='user',
        ),
        migrations.RemoveField(
            model_name='rateanswer',
            name='user',
        ),
        migrations.RemoveField(
            model_name='uniqueanswer',
            name='user',
        ),
    ]