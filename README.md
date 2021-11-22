# Sirius Autosign 


clone project directory by:
```console
$ cd /home/$USER
$ git clone https://github.com/sophal-gmail/autosign.git
$ cd autosign
```
when clone finish, change nessary option in config.json
```console
$ nano ./config.json
{
    "privateKeyCosign": "",
    "publicAccountMultsig": "",
    "api_URL": "",
    "network_TYPE": "MAIN_NET" or "TEST_NET"
}

save config file
```
Install Node module and build 
```console
$ npm i && npm run build
```
## Install in raspberry pi3 B+

We use pm2 to manage node project, to install pm2:
```console 
$ sudo npm install pm2 -g
```
Then we created pm2 config file :
```console
$ nano ./sirius-conf.json
{
    "apps": [
        {
            "name": "Sirius-Autosign",
            "script": "./dist/src/main.js"
        }
    ]
}
save config file
```
Run start service pm2 config file by:
```Console
$ pm2 start ./sirius-conf.json
``` 
We can stop service by issue command :
```console
$ pm2 stop Sirius-Autosign
```
We can view pm2 logs :
``` console
$ pm2 logs Sirius-Autosign
```


Access the node url by:
```
<ip>:3000/swagger/
```

### Generating a Startup Script
To automatically generate and configuration a startup script just type the command (without sudo) pm2 startup:
<!-- Autostart service in case the host is reboot: -->
```console
$ pm2 startup
[PM2] Init System found: systemd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u toor --hp /home/toor
```
Then copy/paste the displayed command onto the terminal:
```console
$ sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u toor --hp /home/toor
```
Saving the app list to be restored at reboot
Once you have started all desired apps, save the app list so it will respawn after reboot:
```console
$ pm2 save
```
