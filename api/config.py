import os

basedir = os.path.abspath(os.path.dirname(__file__))

# Config
class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY')
    uri = os.environ.get('DATABASE_URL')
    if uri.startswith("postgres://"):    
        uri = uri.replace("postgres://", "postgresql://", 1)
    SQLALCHEMY_DATABASE_URI = uri
    SQLALCHEMY_TRACK_MODIFICATIONS = False