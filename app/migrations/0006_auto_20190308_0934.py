# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2019-03-08 09:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='img',
            field=models.CharField(default='k3.jpeg', max_length=40),
        ),
    ]
