#!/usr/bin/env bash

cd /home/master/wifi_avis/serpolls/
gksudo docker-compose up&
sleep 15
firefox http://wifi.avis/admin

