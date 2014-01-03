# Xbee plot

Getting data via xbee, and it as a plot. Message sending via socket.io.

**Inspire by https://github.com/KuoE0/MPU6050-WebPlot**

## Prerequisite

- nodejs
- npm 
- bower ` npm install -g bower`


## Start 

After plugin your xbee, enter `dmesg` to find your serialport, to start getting data enter:

```
sudo node xbee.js <serialport> <buad rate>
```

for example

```
sudo node xbee.js /dev/ttyUSB0 9600
```


## Develop

Install package via npm

```
npm install
```

Install client package via bower

```
bower install
```


## License

MIT

