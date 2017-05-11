#!/usr/bin/env bash

cd /home/master/wifi_avis/serpolls/
gksudo "docker-compose -f docker-compose-prod.yml up -d"

sleep 15
google-chrome "http://localhost/admin" "http://localhost/surveys/current/results/" "http://localhost/surveys/current/comments/"

