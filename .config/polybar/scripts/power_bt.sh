#!/bin/sh

python3 /home/mxn/.config/polybar/scripts/bluetooth_battery.py 1C:52:16:48:27:19| awk '{print $6}' 
