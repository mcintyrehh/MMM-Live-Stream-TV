// ====================================================
// MMM-ArduPort Copyright(C) 2019 Furkan Türkal
// This program comes with ABSOLUTELY NO WARRANTY; This is free software,
// and you are welcome to redistribute it under certain conditions; See
// file LICENSE, which is part of this source code package, for details.
// ====================================================

"use strict";

const NodeHelper = require("node_helper");

const {PythonShell} = require("python-shell");

var pythonStarted = false;

module.exports = NodeHelper.create({

	consolePrefix: "[MMM-Live-Stream-TV]:: ",

	start: function() {
		console.log(this.consolePrefix + "Starting node_helper for module [" + this.name + "]");
		this.initialized = false;
		// setting an autoplaying boolean so the first channel is left alone on the first run through
		this.autoplaying = false;
		// setting a blank interval for later
		this.interval = null;
		// setting the current channel
		this.currentSlideshowChannel = null;
	},

	python_start: function () {
		const self = this;
		const pyshell = new PythonShell("modules/" + this.name + "/arduport/arduport.py", { mode: "json", args: [JSON.stringify(this.config)]});


		pyshell.on("message", function (message) {
			console.log(message);
			if (message.hasOwnProperty("debug")){
				console.log(this.consolePrefix + "[" + self.name + "] " + message.debug);
			}
			if (message.hasOwnProperty("status")){
				console.log(message.status);
				self.sendSocketNotification("status", {action: "status", name: message.status.name, data: message.status.data});
			}
			if (message.hasOwnProperty("sensor")){
				if(self.initialized){
					self.sendData(message);
				}
			}
		});
		pyshell.end(function (err) {
			if (err) {throw err;}
			console.log("[" + self.name + "] " + "finished running...");
			self.sendSocketNotification("error", "pyshell-throw");
		});
	},

	sendData: function(message){
		const self = this;
		var value;
		for(var i in this.config.sensors){
			value = null;
			console.log(this.config.sensors)
			var sensor = this.config.sensors.find(x => x.name === message.sensor.name);
			if(sensor){
				value = message.sensor.data;
				console.log(message.sensor.data);
			} else {
				console.error(self.consolePrefix + "Error: Incoming Sensor " + this.config.sensors[i].name + " not configured in config.js!");
			}
			sensor.value = value;
		}
		self.sendSocketNotification("sensor", this.config.sensors);
	},
	changeChannel: function() {
		const self = this;
		if (!self.autoplaying) {
			//this allows the first run-through to leave the channel alone so it doesn't skip from the start channel immedietely
			self.autoplaying = true;
		} else {
			// if its reached the last channel set it back to 0 and update DOM
			if (this.currentSlideshowChannel >= 9) {
				self.currentSlideshowChannel = 0;
				console.log(this.currentSlideshowChannel);
				this.sendSocketNotification("slideshow", this.currentSlideshowChannel);
			}
			//otherwise change the channel up one
			else {
				this.currentSlideshowChannel++;
				this.sendSocketNotification("slideshow", this.currentSlideshowChannel);
			}
		}
	},
	socketNotificationReceived: function(notification, payload) {
		var self = this;

		if (notification === "CONFIG") {
			this.config = payload;
			this.currentSlideshowChannel = this.config.currentChannel;
		}
		else if (notification === "INITIALIZE" && this.config !== null){
			this.python_start();
			self.sendSocketNotification("status", {action: "status", name: "initialized"});
			this.initialized = true;
		}
		else if (notification === "SLIDESHOW" && this.config !== null) {
			console.log("*************************")
			// console.log(this.currentChannel);
			this.interval = setInterval((self.changeChannel).bind(this), this.config.slideshowInterval);
		}
		else if (notification === "STATIC" && this.config !== null) {
			self.sendSocketNotification("static", this.currentChannel);
		}
	}
});
