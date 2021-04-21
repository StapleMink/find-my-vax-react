from flask import Flask
from api.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_compress import Compress
from flask_talisman import Talisman
from flask_seasurf import SeaSurf
import os

# Setup
LOCAL_UI = os.getenv('LOCAL_UI')
if LOCAL_UI:
    print("Will not bundle React")
    app = Flask(__name__)
else:
    print("Bundling React")
    app = Flask(__name__, static_folder='../build', static_url_path='/')


# Import Config and Set
app.config.from_object(Config)
app.config.update(
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Lax'
)

# Setup DB
db = SQLAlchemy(app)

# if LOCAL_UI:
#     migrate = Migrate(app, db, compare_type=True)
#     migrate.init_app(app)

# Compress App Bundle
Compress(app)

# Protects against CSRF attacks
csrf = SeaSurf(app)

# Sets HTTP headers to protect against web attacks. Enforces HTTPS
csp = {
    'default-src': ['\'self\'', '\'unsafe-inline\'', 'data:', 'https://www.google-analytics.com',
                    'https://www.gstatic.com', 'https://cdnjs.cloudflare.com',
                    '*.googleapis.com', '\'unsafe-eval\'', 'https://docs.google.com'],
    'script-src': ['\'self\'', '\'unsafe-inline\'', '*.jquery.com',
                   '*.bootstrapcdn.com', 'https://translate.google.com',
                   'https://cdnjs.cloudflare.com', 'https://www.googletagmanager.com',
                   'https://www.google-analytics.com',
                   '*.googleapis.com', 'data:', '\'unsafe-eval\'',
                   'google-analytics.com'],
    'style-src': ['\'self\'', '\'unsafe-inline\'', '*.bootstrapcdn.com',
                  '*.googleapis.com', 'https://cdnjs.cloudflare.com',
                  'data:', '\'unsafe-eval\''],
    'img-src': ['*' ,'\'self\'', 'data:', '\'unsafe-eval\''],

    }
Talisman(app, content_security_policy=csp,)

# Handle 404s
if not LOCAL_UI:
    @app.route('/')
    def index():
        return app.send_static_file('index.html')   

    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file('index.html')

# Import the routes.py and models.py files and runs them
from api import routes, models