#!/bin/bash
#問10

echo -n "type number"
read num

i=0
until [ 100 -lt $i ]
do
    #数値を出力
    echo $i
    #入力値と一致するなら終了
    if [ $num -eq $i ]; then
        echo "End"
        break
    else
        let i++
    fi
done