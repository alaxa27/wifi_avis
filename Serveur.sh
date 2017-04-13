#!/usr/bin/env bash

cd /home/master/wifi_avis/serpolls/
gksudo docker-compose up&
sleep 10
google-chrome http://wifi.avis/admin

