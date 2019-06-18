Module.register("MMM-Live-Stream-TV",{
	logPrefix: "[MMM-Live-Stream-TV]:: ",

	defaults: {
		portname: "/dev/ttyACM0",		//COMX for windows, /dev/ttyACM0* for raspberry pi
		style: "tv",
		animationSpeed: 1000,
		slideshowInterval: 15*60*1000,	//15 mins
		autoplaying: false,
		developerMode: false,
		frameWidth: "600",
		maxWidth: "100%",
		currentChannel: 0,
		sensors: [
			{
				name: "Potentiometer",
			}
		],
		streams: [
			{
				streamUrl: "https://videos3.earthcam.com/fecnetwork/13908.flv/chunklist_w602250694.m3u8?t=R3bNUFQw1fOgbBpNsGnoJBEeDuIAjbC88j%2FJbJzKBSQ%3D",
				url: "https://www.esbnyc.com/earthcam-empire-state-building",
				name: "Empire State Building",
				channelNumber: 0,
			},
			{
				streamUrl: "https://videos3.earthcam.com/fecnetwork/13908.flv/chunklist_w602250694.m3u8?t=R3bNUFQw1fOgbBpNsGnoJBEeDuIAjbC88j%2FJbJzKBSQ%3D",
				url: "https://www.earthcam.com/usa/newyork/midtown/skyline/?cam=midtown4k",
				name: "ESB View (South)",
				channelNumber: 1,
			},
			{
				streamUrl: "https://videos3.earthcam.com/fecnetwork/10874.flv/chunklist_w1857702709.m3u8",
				url: "https://www.earthcam.com/usa/newyork/worldtradecenter/?cam=skyline_g",
				name: "World Trade Center",
				channelNumber: 2,
			},
			{
				streamUrl: "https://videos3.earthcam.com/fecnetwork/chargingbull.flv/chunklist_w1863819991.m3u8",
				url: "https://www.earthcam.com/usa/newyork/wallstreet/chargingbull/?cam=chargingbull_hd",
				name: "Wall Street Bull",
				channelNumber: 3,
			},
			{
				streamUrl: "https://videos3.earthcam.com/fecnetwork/hdtimes10.flv/chunklist_w297656544.m3u8",
				url: "https://www.earthcam.com/usa/newyork/timessquare/?cam=tsrobo1",
				name: "Times Square",
				channelNumber: 4,
			},
			{
				streamUrl: "https://videos3.earthcam.com/fecnetwork/4017timessquare.flv/chunklist_w32227322.m3u8",
				url: "https://www.earthcam.com/cams/newyork/timessquare/?cam=tstwo_hd",
				name: "Times Square View (South)",
				channelNumber: 5,
			},
			{
				streamUrl: "https://video2archives.earthcam.com/archives/_definst_/MP4:permanent/485/2018/09/25/1300.mp4/chunklist_w1437253022.m3u8",
				url: "https://www.earthcam.com/cams/newyork/timessquare/?cam=tsnorth_hd",
				name: "Times Square View (North)",
				channelNumber: 6,
			},
			{
				streamUrl: "https://videos3.earthcam.com/fecnetwork/9974.flv/chunklist_w1145885185.m3u8",
				url: "https://www.earthcam.com/cams/newyork/timessquare/?cam=tsstreet",
				name: "Times Square Street Cam",
				channelNumber: 7,
			},
			{
				streamUrl: "https://videos3.earthcam.com/fecnetwork/15559.flv/chunklist_w1012258859.m3u8",
				url: "https://www.earthcam.com/cams/newyork/timessquare/?cam=tsrobo3",
				name: "Times Square Crossroads",
				channelNumber: 8,
			},
			{
				streamUrl: "https://videos3.earthcam.com/fecnetwork/13903.flv/chunklist_w2058776447.m3u8",
				url: "https://www.earthcam.com/usa/newyork/midtown/skyline/?cam=midtown4k",
				name: "Midtown Skyline",
				channelNumber: 9,
			}
	   ]

	},
	start: function() {
		console.log("in MMM-Live-Stream-TV");
		Log.info(`Starting module: ${this.name}`);
		const self = this;
		// initializing hls variable to be referenced when creating/destroying streams
		this.hls = "";
		// setting a blank interval
		this.interval = null;
		switch(this.config.style) {
		case  "tv":
			// initializing status booleans
			this.loading = true;
			this.isArduinoStarting = false;
			this.isArduinoStarted = false;
			this.isArduinoConnected = false;
			// sends the configuration details to node_helper
			console.log(this.config);
			self.log(this.config);
			this.sendSocketNotification("CONFIG", this.config);
			// sends a notification to node_helper to intialize the python shell
			this.sendSocketNotification("INITIALIZE", null);
			self.log(("[MMM-Live-Stream-TV::START()]: data: " + JSON.stringify(self.data, null, 4)), "dev");
			self.log(("[MMM-Live-Stream-TV::START()]: config: " + JSON.stringify(self.config, null, 4)), "dev");
			break;
		case "slideshow":
			this.sendSocketNotification("CONFIG", this.config);
			console.log("in slideshow");
			this.sendSocketNotification("SLIDESHOW", null);
		case "static":
			this.sendSocketNotification("STATIC", null);
		}
	},
	getTranslations: function() {
		return {
			en: "translations/en.json"
		};
	},
	getStyles: function() {
		return [
			"MMM-Live-Stream-TV.css"
		];
	},
	// Define required scripts.
	getScripts: function() {
		// this loads the hls js file
		return ["https://cdn.jsdelivr.net/npm/hls.js"];
	},
	socketNotificationReceived: function(notification, payload) {
		const self = this;

		self.log(notification);
		self.log(JSON.stringify(payload, null, 4));

		switch(notification){
		case "status":
			if(payload.name == "setup"){
				if(payload.data == "starting"){
					self.log("[socketNotificationReceived::status]: starting");
					this.isArduinoConnected = true;
					this.isArduinoStarting = true;
				} else if (payload.data == "started"){
					self.log("[socketNotificationReceived::status]: started");
					this.isArduinoStarting = false;
					this.isArduinoStarted = true;
				} else if (payload.data == "failed"){
					self.log("[socketNotificationReceived::status]: failed");
					this.isArduinoStarting = false;
					this.isArduinoStarted = false;
				}
			}
			if(payload.name == "connect"){
				if(payload.data == "connected"){
					self.log("[socketNotificationReceived::status]: connected");
					this.isArduinoConnected = true;
					this.sendNotification("SHOW_ALERT", {type: "notification", imageFA: "fa-microchip", title: self.translate("ARDUINO_CONNECTED")});
				} else if(payload.data == "disconnected"){
					self.log("[socketNotificationReceived::status]: disconnected");
					this.isArduinoConnected = false;
					this.sendNotification("SHOW_ALERT", {type: "notification", imageFA: "fa-microchip", title: self.translate("ARDUINO_DISCONNECTED")});
				}
			}
			if(payload.name == "initialized"){
				this.loading = false;
			}
			if(payload.name == "nextFeed") {

			}
			// self.updateDom(self.config.animationSpeed);
			break;

		case "sensor":
			if(this.isArduinoConnected && this.isArduinoStarted){
				self.log("[socketNotificationReceived::sensor]: ");
				self.log(JSON.stringify(payload, null, 4));

				this.message = null;
				this.config.sensors = payload;
				console.log(`${this.name} received a module notification: ${notification}`)
				console.log(payload);
				var newChannel = parseInt(payload[0].value);
				Log.log(newChannel + "NEW CHANNEL");
				console.log(newChannel);
				// sets current channel to the value that the Arduino Serial is sending out
				this.config.currentChannel = newChannel;
				this.updateDom(self.config.animationSpeed);
			}
			break;
		case "slideshow":
			console.log(`${this.name}: Slideshow Update: ${notification}`)
			console.log(payload);
			var newChannel = parseInt(payload);
			Log.log(newChannel + " NEW CHANNEL");
			// sets current channel to the value that the Arduino Serial is sending out
			this.config.currentChannel = newChannel;
			this.updateDom(self.config.animationSpeed);
		case "error":
			console.log("[socketNotificationReceived::error]:");

			if(payload == "pyshell-throw"){
				this.message = "Error : PyShell down!";
				this.isArduinoConnected = false;
				this.isArduinoStarted = false;
			}

			self.updateDom(self.config.animationSpeed);
			break;
		}
	},
	getDom: function() {
		if(this.hls) {
			this.hls.destroy();
		};
		var wrapper = document.createElement("div");
		var video = document.createElement("video");
		wrapper.appendChild(video);
		// creating info divs below the video
		var videoInfo = document.createElement("div");
		var channelNumber = document.createElement("span");
		channelNumber.className=("channel-div");
		channelNumber.innerHTML = `Channel ${this.config.currentChannel}`;
		videoInfo.appendChild(channelNumber);
		var videoName = document.createElement("span");
		videoName.innerHTML = ` - ${this.config.streams[this.config.currentChannel].name}`
		videoInfo.appendChild(videoName);
		wrapper.appendChild(videoInfo);
		video.width = this.config.frameWidth;
		if (Hls.isSupported()) {
			var hls = new Hls();
			this.hls = hls;
			hls.loadSource(this.config.streams[this.config.currentChannel].streamUrl);
			console.log(this.config.streams[this.config.currentChannel].streamUrl)
			hls.attachMedia(video);
			hls.on(Hls.Events.MANIFEST_PARSED,function() {
				video.play();
			})
		}
		else if(video.canPlayType("application/vnd.apple.mpegurl")) {
			video.src = this.config.url;
			video.addEventListener("loadedmetadata", function() {
				video.play();
			});
		}
		video.play();

		return wrapper;
	},
	log: function(message, type) {
		var self = this;
		if (self.config.developerMode) {
			  var date = new Date();
			  var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
			  message = self.name + ": (" + self.data.index + ")(" + time + ") " + message;
		} else { message = self.name + ": " + message; }
		switch (type) {
		  case "error": Log.error(this.logPrefix + message); break;
		  case "warn": Log.warn(this.logPrefix + message); break;
		  case "info": Log.info(this.logPrefix + message); break;
		  case "dev": if (self.config.developerMode) { Log.log(this.logPrefix + message); } break;
		  default: Log.log(this.logPrefix + message);
		}
	}
});
