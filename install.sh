#/usr/bin/env sh

echo "Installing dnsmasq..."
apt-get -y install dnsmasq

echo "Installing python modules pip..."
apt-get -y install python3-pip python3-pil npm node

echo "Installing Django..."
#pip install Django

echo "Installing uWSGI..."
#pip install uwsgi

echo "Installing NGINX..."
apt-get -y install nginx

echo "Copying configuration..."
cp -rfv config_files/* /etc/

echo "Installing shortcut"
apt-get -y install gksu
cp -v wifiavis.desktop /usr/share/applications/

echo "Changing to python3"
echo "alias python='/usr/bin/python3'" > /home/master/.bashrc

