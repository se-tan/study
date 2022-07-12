#!/bin/bash
#問6

echo -n "Type number"
read num

case $num in
    0)
        echo "you typed 0"
        ;;
    
    1)
        echo "you typed 1"
        ;;
    
    *)
        echo "you typed other than 0 and 1"
        ;;
esac