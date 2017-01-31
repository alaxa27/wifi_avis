#/usr/bin/env sh

echo "Installing dnsmasq..."
apt-get -y install dnsmasq

echo "Installing python modules pip..."
apt-get -y install python-pip

echo "Installing Django..."
pip install Django

echo "Installing uWSGI..."
pip install uwsgi

echo "Installing NGINX..."
apt-get -y install nginx

echo "Copying configuration..."
cp -v config_files/* /etc/

