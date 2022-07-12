from os import sep
import sys
import datetime
import pandas as pd
import matplotlib.pyplot as plt
import japanize_matplotlib

"""
可視化処理
"""


def visualize(options):
    # 1.Youtube Data (CSV) を読み込む
    df = pd.read_csv(options["csvFileName"], sep=",",
                     encoding="UTF-8", usecols=lambda x: x not in ["description"])

    # 2.閲覧した人の1%が「いいね」をしている動画に絞り込む
    df2 = df.query('(likeCount/viewCount)*100 >= 1')

    # 3.Youtube のチャンネル単位にグループを作成する
    grouped = df2.groupby("channelTitle")

    # 4.可視化
    # 2.の条件を満たす動画をたくさん保持しているチャンネルの上位20位までを出力する
    grouped.size().sort_values(ascending=False).head(20).sort_values(
        ascending=True).plot(kind="barh", figsize=(40, 8), fontsize=5, colormap='gist_gray')
    plt.title('動画の閲覧数と評価が高いチャンネル')
    plt.subplots_adjust(bottom=0.10, left=0.15, top=0.95, right=0.95)
    plt.show()

"""
メイン処理
    引数1：CSVファイル名称
"""
if __name__ == '__main__':
    print(datetime.datetime.now().strftime('%Y年%m月%d日 %H:%M:%S')+" ：処理開始")

    # 引数の数をチェック
    if len(sys.argv) < 2:
        print("Check the number of argv!")
        sys.exit(1)

    # パラメータの設定
    dic = {"csvFileName": sys.argv[1]}

    # 可視化を実行する
    visualize(dic)

    print(datetime.datetime.now().strftime('%Y年%m月%d日 %H:%M:%S')+" ：処理終了")
