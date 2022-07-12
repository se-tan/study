import json
import sys
import datetime
import pandas as pd

from googleapiclient.discovery import build


# Youtube API settings
API_KEY = 'AIzaSyCRKH1vxHGqzAp3R2zMmN6J5QLAnp9SRBw'
SERVICE_NAME = 'youtube'
API_VERSION = 'v3'
SEARCH_LIMIT = 50


def print_json(output):
    # JSON形式の文字列型へ変換
    json_data = json.dumps(output)
    # JSON形式で出力
    data = json.loads(json_data)
    print(json.dumps(data, indent=2, ensure_ascii=False))


def search(options):
    # Youtube Data API の接続設定
    youtube = build(SERVICE_NAME, API_VERSION, developerKey=API_KEY)

    """
    検索の実行回数を算出
        1回の検索で取得するデータの最大件数 ( SEARCH_LIMIT ) と
        引数で受け取ったCSV出力件数 ( options["csvOutCount"] ) から算出する
    """
    search_count_arg = divmod(int(options["csvOutCount"]), SEARCH_LIMIT)
    search_count = search_count_arg[0]
    if search_count_arg[1] != 0:
        search_count += 1

    """
    検索結果(リスト)の取得
        検索の実行回数分、検索クエリを実行し、検索結果(リスト)を取得する
    """
    search_result_list = []
    for i in range(int(search_count)):
        if i == 0:
            # 検索クエリ(初回)
            search_query = youtube.search().list(
                part="id",
                type="video",
                q=options["q"],
                publishedAfter=options["publishedAfter"],
                publishedBefore=options["publishedBefore"],
                order=options["order"],
                maxResults=SEARCH_LIMIT
            )
        else:
            # 検索クエリ(2回目)
            search_query = youtube.search().list_next(search_query, search_response)

        # 検索結果(リスト)の取得
        search_response = search_query.execute()

        # 検索結果(リスト)の "items" 部分を格納
        search_result_list += search_response["items"]

        if "nextPageToken" not in search_response:
            break

    """
    検索結果(詳細)の取得
        引数で受け取ったCSV出力件数( options["csvOutCount"] ) 分、
        詳細情報を取得する検索クエリを実行し、検索結果(詳細)を取得する
    """
    # CSVファイルのヘッダ名称の設定
    list_df = pd.DataFrame(columns=["videoURL", "title", "publishedAt", "description", "channelId",
                           "channelTitle", "viewCount", "likeCount", "dislikeCount", "favoriteCount", "commentCount"])
    for i in range(int(options["csvOutCount"])):
        # 検索結果(リスト)の取得件数に達した場合、ループを終了する
        if i == len(search_result_list):
            break

        search_result = search_result_list[i]

        # 動画を一意に識別するために Youtube によって使用される ID を取得
        videoId = search_result["id"]["videoId"]
        # 動画の videoId から動画の URL を作成
        videoURL = "https://youtu.be/" + videoId

        # 動画の詳細情報の検索クエリ
        search_query = youtube.videos().list(
            id=videoId,
            part="snippet, statistics"
        )
        # 検索結果を取得する
        search_response = search_query.execute()

        # 検索結果の "items" 部分を格納する
        search_result_detail = search_response["items"][0]

        """
        snippet の情報を取得
        """
        snippet = search_result_detail["snippet"]
        publishedAt = snippet.get("publishedAt", None)      # 動画のアップロード日時
        channelId = snippet.get("channelId", None)          # チャンネルID
        channelTitle = snippet.get("channelTitle", None)    # チャンネルタイトル
        title = snippet.get("title", None)                  # チャンネルのタイトル
        description = snippet.get("description", None)      # 動画の説明

        """
        statistics の情報を取得
        """
        statistics = search_result_detail["statistics"]
        viewCount = statistics.get("viewCount", 0)          # 動画の再生回数
        likeCount = statistics.get("likeCount", 0)          # 「高評価」ボタン
        dislikeCount = statistics.get("dislikeCount", 0)    # 「低評価」ボタン
        favoriteCount = statistics.get("favoriteCount", 0)  # お気に入りボタン
        commentCount = statistics.get("commentCount", 0)    # コメント数

        # 1行分の DataFrame
        temp_df = pd.Series([videoURL, title, publishedAt, description, channelId, channelTitle,
                            viewCount, likeCount, dislikeCount, favoriteCount, commentCount], index=list_df.columns)
        # リストの DataFrame に1行分の DataFrame を追加
        list_df = list_df.append(temp_df, ignore_index=True)

    return list_df


"""
メイン処理
    引数1：検索条件① 検索ワード
    引数2：検索条件② From（@が入力された場合、1970-01-01 00:00:00Zに自動変換する。）
    引数3：検索条件③ To（@が入力された場合、実行日時に自動変換する。）
    引数4：検索結果の並べ替え方法
        relevance – 検索結果を検索クエリの関連性が高い順に並び替える。
        date – 検索結果を作成日の新しい順に並び替える。
        rating – 検索結果を評価の高い順に並び替える。
        title – 検索結果をタイトルのアルファベット順に並び替える。
        videoCount – 検索結果をアップロード動画の番号順（降順）に並び替える。
        viewCount – 検索結果を再生回数の多い順に並び替える。
    引数5：CSV出力件数
    引数6：CSVファイル名称
"""
if __name__ == '__main__':
    print(datetime.datetime.now().strftime('%Y年%m月%d日 %H:%M:%S') + " ：処理開始")

    # 引数の数をチェック
    if len(sys.argv) < 7:
        print("Check the number of argv!")
        sys.exit(1)

    # 引数の取得
    q = sys.argv[1]
    publishedAfter = sys.argv[2]
    publishedBefore = sys.argv[3]
    order = sys.argv[4]
    csvOutCount = sys.argv[5]
    csvFileName = sys.argv[6]

    # 日付の変換 (@の場合、From, To にそれぞれのデフォルト値を設定する)
    if publishedAfter == "@":
        publishedAfter = "1970-01-01T00:00:00Z"

    if publishedBefore == "@":
        publishedBefore = datetime.datetime.now().isoformat() + "Z"

    # 検索パラメーターの設定
    dic = {"q": q, "publishedAfter": publishedAfter,
           "publishedBefore": publishedBefore, "order": order, "csvOutCount": csvOutCount}

    # 検索処理を実行し、検索結果を取得する
    print(datetime.datetime.now().strftime('%Y年%m月%d日 %H:%M:%S') + " ：検索処理")
    list_df = search(dic)

    # 検索結果をCSVに出力
    print(datetime.datetime.now().strftime('%Y年%m月%d日 %H:%M:%S') + " ：CSV出力")
    list_df.to_csv(csvFileName, encoding="UTF-8", mode="w", index=False)

    print(datetime.datetime.now().strftime('%Y年%m月%d日 %H:%M:%S') + " ：処理終了")
