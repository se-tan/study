"""
【ホロライブ】ホロジュールと YouTube の動画情報を取得してCSV出力する
YouTube Data API v3 のクォータが標準のままだと、制限の上限にすぐに到達してエラーとなる
"""

import sys
import os
import re
import csv
import datetime
import argparse
import urllib.request
import settings
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from apiclient.discovery import build
from apiclient.errors import HttpError

RETURN_SUCCESS = 0
RETURN_FAILURE = -1


class Holodule:
    # 日時
    datetime = None
    # 名前
    name = ""
    # タイトル（YouTubeから取得）
    title = ""
    # URL
    url = ""
    # 説明（YouTubeから取得）
    description = ""


class HoloduleDownloader:
    def __init__(self, holodule_url, dirpath, api_key, api_service_name, api_version):
        self.__driver = None
        self.__wait = None
        self.__holodule_url = holodule_url
        self.__dirpath = dirpath
        # YouTube Data API v3 を利用するための準備
        self.__youtube = build(
            api_service_name, api_version, developerKey=api_key)

    def __setup_profile(self):
        # Firefoxプロファイルの設定
        profile = webdriver.FirefoxProfile()
        # 0:デスクトップ、1:システム規定フォルダ、2:ユーザ定義フォルダ
        profile.set_preference("browser.download.folderList", 2)
        # 上記で2を選択したのでファイルのダウンロード場所を指定
        profile.set_preference("browser.download.dir", self.__dirpath)
        # ダウンロード完了時にダウンロードマネージャウィンドウを表示するかを示す真偽値
        profile.set_preference(
            "browser.download.manager.showWhenStarting", False)
        # MIMEタイプを設定（これが実態と一致していないとダイアログが表示されてしまう）
        profile.set_preference("browser.helperApps.neverAsk.saveToDisk",
                               "application/octet-stream-dummy")
        return profile

    def __setup_options(self):
        # Firefoxオプションの設定
        options = Options()
        # ヘッドレスモードとする
        options.add_argument("--headless")
        return options

    def __get_holodule(self):
        # 取得対象の URL に遷移
        self.__driver.get(self.__holodule_url)
        # <div class="holodule" style="margin-top:10px;">が表示されるまで待機する
        self.__wait.until(EC.presence_of_element_located(
            (By.CLASS_NAME, "holodule")))
        # ページソースの取得
        html = self.__driver.page_source.encode('utf-8')
        # ページソースの解析（パーサとして lxml を指定）
        soup = BeautifulSoup(html, "lxml")
        # タイトルの取得（確認用）
        body = soup.find("body")
        title = body.find("title").text
        print(title)
        # TODO : ここからはページの構成に合わせて決め打ち = ページの構成が変わったら動かない
        # スケジュールの取得
        holodule_list = []
        date_string = ""
        today = datetime.date.today()
        tab_pane = soup.find('div', class_="tab-pane show active")
        containers = tab_pane.find_all('div', class_="container")
        for container in containers:
            # 日付のみ取得
            div_date = container.find('div', class_="holodule navbar-text")
            if div_date is not None:
                date_text = div_date.text.strip()
                match_date = re.search(r'[0-9]{1,2}/[0-9]{1,2}', date_text)
                dates = match_date.group(0).split("/")
                month = int(dates[0])
                day = int(dates[1])
                year = today.year
                if month < today.month or (month == 12 and today.month == 1):
                    year = year - 1
                elif month > today.month or (month == 1 and today.month == 12):
                    year = year + 1
                date_string = f"{year}/{month}/{day}"
                # print(date_string)
            # ライバー毎のスケジュール
            thumbnails = container.find_all('a', class_="thumbnail")
            if thumbnails is not None:
                for thumbnail in thumbnails:
                    holodule = Holodule()
                    # YouTube URL
                    youtube_url = thumbnail.get("href")
                    if youtube_url is not None:
                        holodule.url = youtube_url
                        # print(holodule.url)
                    # 時刻（先に取得しておいた日付と合体）
                    div_time = thumbnail.find(
                        'div', class_="col-5 col-sm-5 col-md-5 text-left datetime")
                    if div_time is not None:
                        time_text = div_time.text.strip()
                        match_time = re.search(
                            r'[0-9]{1,2}:[0-9]{1,2}', time_text)
                        times = match_time.group(0).split(":")
                        hour = int(times[0])
                        minute = int(times[1])
                        datetime_string = f"{date_string} {hour}:{minute}"
                        holodule.datetime = datetime.datetime.strptime(
                            datetime_string, "%Y/%m/%d %H:%M")
                        # print(holodule.datetime)
                    # ライバーの名前
                    div_name = thumbnail.find(
                        'div', class_="col text-right name")
                    if div_name is not None:
                        holodule.name = div_name.text.strip()
                        # print(holodule.name)
                    # リストに追加
                    holodule_list.append(holodule)
        return holodule_list

    def __get_youtube_video_info(self, youtube_url):
        # YouTube の URL から ID を取得
        match_video = re.search(r'^[^v]+v=(.{11}).*', youtube_url)
        video_id = match_video.group(1)
        # YouTube はスクレイピングを禁止しているので YouTube Data API (v3) で情報を取得
        search_response = self.__youtube.videos().list(
            # 結果として snippet のみを取得
            part="snippet",
            # 検索条件は id
            id=video_id,
            # 1件のみ取得
            maxResults=1
        ).execute()
        # 検索結果から情報を取得
        for search_result in search_response.get("items", []):
            # タイトル
            title = search_result["snippet"]["title"]
            # 説明
            description = search_result["snippet"]["description"]
            # タイトルと説明を返却
            return (title, description)
        return ("", "")

    def get_holodule_list(self):
        try:
            # プロファイルのセットアップ
            profile = self.__setup_profile()
            # オプションのセットアップ
            options = self.__setup_options()
            # ドライバの初期化（オプション（ヘッドレスモード）とプロファイルを指定）
            self.__driver = webdriver.Firefox(
                options=options, firefox_profile=profile)
            # 指定したドライバに対して最大で10秒間待つように設定する
            self.__wait = WebDriverWait(self.__driver, 10)
            # ホロジュールの取得
            holodule_list = self.__get_holodule()
            # YouTube情報の取得
            for holodule in holodule_list:
                # TODO : ループして1件ずつ API を呼び出すのは見直すべきかも（クォータ制限に関連）
                video_info = self.__get_youtube_video_info(holodule.url)
                holodule.title = video_info[0]
                # TODO : 説明文が長いので20文字でばっさり切っている
                holodule.description = video_info[1][:20]
            # 生成したリストを返す
            return holodule_list
        except OSError as err:
            print("OS error: {0}".format(err))
        except:
            print("Unexpected error:", sys.exc_info()[0])
            raise
        finally:
            # ドライバを閉じる
            self.__driver.close()


def check_url(url):
    try:
        # 指定したURLにアクセスできるかをチェック
        with urllib.request.urlopen(url) as response:
            return True
    except urllib.request.HTTPError:
        return False


def main():
    # parser を作る（説明を指定できる）
    parser = argparse.ArgumentParser(
        description="ホロジュールのHTMLをSelenium + BeautifulSoup4 + YouTube Data API で解析してCSV出力")
    # コマンドライン引数を設定する（説明を指定できる）
    parser.add_argument("filepath", help="出力するCSVファイルのパス")
    # コマンドライン引数を解析する
    args = parser.parse_args()

    # ファイルパスの取得
    filepath = args.filepath
    # ディレクトリパスの取得と存在確認
    dirpath = os.path.dirname(filepath)
    print(f"出力ディレクトリパス : {dirpath}")
    if os.path.exists(dirpath) == False:
        print("Error : 出力するCSVファイルのディレクトリパスが存在しません。")
        return RETURN_FAILURE
    # ファイル名の取得
    filename = os.path.basename(filepath)
    print(f"出力ファイル名 : {filename}")
    # URLの取得とアクセス確認（parser から取得）
    holodule_url = settings.HOLODULE_URL
    print(f"ホロジュールURL : {holodule_url}")
    if check_url(holodule_url) == False:
        print("Error : 設定されているURLにアクセスできません。")
        return RETURN_FAILURE
    # YouTube Data API v3 の API設定（parser から取得）
    api_key = settings.API_KEY
    api_service_name = settings.API_SERVICE_NAME
    api_version = settings.API_VERSION

    try:
        # ホロジュールの取得
        hddl = HoloduleDownloader(
            holodule_url, dirpath, api_key, api_service_name, api_version)
        hdlist = hddl.get_holodule_list()
        # CSV出力(BOM付きUTF-8)
        with open(filepath, "w", newline="", encoding="utf_8_sig") as csvfile:
            csvwriter = csv.writer(csvfile, delimiter=",")
            csvwriter.writerow(["日時", "名前", "タイトル", "URL", "抜粋説明"])
            for hd in hdlist:
                csvwriter.writerow(
                    [hd.datetime, hd.name, hd.title, hd.url, hd.description])
        return RETURN_SUCCESS
    except:
        info = sys.exc_info()
        print(info[1])
        return RETURN_FAILURE


if __name__ == "__main__":
    sys.exit(main())

# 