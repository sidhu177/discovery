# Generated by Django 2.0.2 on 2018-09-18 13:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0020_pool_psc'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='psc',
            name='naics',
        ),
    ]
