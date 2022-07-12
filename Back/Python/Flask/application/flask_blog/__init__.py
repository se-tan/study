from flask import Flask
from flask_login import LoginManager
from flask_sessionstore import Session


app = Flask(__name__)
app.config.from_object('flask_blog.config')
Session(app)

login_manager = LoginManager()
login_manager.init_app(app)

from flask_blog.lib.utils import setup_auth
setup_auth(login_manager)

# ここに記述しないと上記2行の処理をする前に
# entries.pyのimportが実行され「循環インポート」エラーを起こす
from flask_blog.views import views, entries

login_manager.login_view = "login"
login_manager.login_message = "ログインしてください"