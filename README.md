# Sirius Autosign 


### A. clone project directory by:
```console
$ cd /home/$USER
$ git clone https://github.com/sophal-gmail/autosign.git
$ cd autosign
```
when clone finish, change neccessary option in config.json
```console
$ nano ./config.json
{
    "privateKeyCosign": "your_privatekey",
    "publicAccountMultsig": "your_multisign_account_address",
    "api_URL": "https://arcturus.xpxsirius.io",
    "network_TYPE": "MAIN_NET" 
}
save config file
```
Note:
    For Testnet env, change:
    "api_URL": "https://bctestnet1.brimstone.xpxsirius.io",
    "network_TYPE": "TEST_NET" when use with 

### B. If you have not install Node.js, follow the instruction:
https://github.com/nodesource/distributions/blob/master/README.md#deb

Node.js v17.x:
```console
curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
apt-get install -y nodejs

```
### C. Install Node module lib to Autosign project, then build the run:

```console
$ npm i && npm run build
```
### D. To run the service code:
We use pm2 (https://pm2.keymetrics.io/) to manage runtime of node's project. To install pm2:
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
To Start service:
```Console
$ pm2 start ./sirius-conf.json
``` 
To Stop service:
```console
$ pm2 stop Sirius-Autosign
```
We can view service logs :
``` console
$ pm2 logs Sirius-Autosign
```

### E. Startup the Service on Boot for Raspberry Pi:
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
