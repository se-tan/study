#!/bin/bash

#問5
echo -n "Enter number"
read str

if [ $str = 0 ]; then
    echo "You typed 0"
elif [ $str = 1 ]; then
    echo "You Typed 1",
else 
    echo "You typed other than 0 and 1"
fi