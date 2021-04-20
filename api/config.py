import os

basedir = os.path.abspath(os.path.dirname(__file__))

# Config
class Config(object):
    # SECRET_KEY = os.environ.get('SECRET_KEY')
    SECRET_KEY = "Testing123"
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False