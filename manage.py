import click
from flask.cli import FlaskGroup
from backend import create_app, db,celery
from backend.database.create_db import create_db


@click.group()
def cli():
    pass

@cli.group()
def db():
    pass

@db.command()
def create_database():
        print("creating db")
        create_db()

@db.command()
def dump_database():
        print("dumping db")


if __name__ == '__main__':
    cli()
