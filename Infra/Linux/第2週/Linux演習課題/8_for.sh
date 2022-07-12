#!/bin/bash
#問8

for((i=1 ; i=100 ; i++))
do
    if [ `expr $i % 5` -eq 0 ] then
        echo $i
    fi
done