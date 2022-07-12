import os
from os.path import join, dirname
from dotenv import load_dotenv

# .env ファイルを明示的に指定して読み込む
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

HOLODULE_URL = os.environ.get('HOLODULE_URL')
API_KEY = os.environ.get('API_KEY')
API_SERVICE_NAME = os.environ.get('API_SERVICE_NAME')
API_VERSION = os.environ.get('API_VERSION')
