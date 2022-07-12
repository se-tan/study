#!/bin/bash
#問9

i=0
while [ $i -lt 100 ]
do
    echo `expr $i + 1`
    let i++
done