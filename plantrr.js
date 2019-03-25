Module.register("plantrr",{
	defaults: {
		frameWidth: "600",
		maxWidth: "100%",
		// url: "http://iphone-streaming.ustream.tv/uhls/1524/streams/live/iphone/playlist.m3u8",
		url: "https://videos3.earthcam.com/fecnetwork/9974.flv/chunklist_w2084964165.m3u8",
		scrolling: "no",
		hls: null,
		currentChannel: 0,
		streams: [
			{
				url: "https://videos3.earthcam.com/fecnetwork/9974.flv/chunklist_w2084964165.m3u8",
				name: "times-square"
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/13908.flv/chunklist_w1570249403.m3u8",
				name: "empire-state-building"
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/13900.flv/chunklist_w1596516954.m3u8",
				name: "empire-state-building-south"
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/10874.flv/chunklist_w1710102470.m3u8",
				name: "world-trade-center"
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/chargingbull.flv/chunklist_w924600150.m3u8",
				name: "wall-street-bull"
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/4017timessquare.flv/chunklist_w2099074996.m3u8",
				name: "times-square-south"
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/485.flv/chunklist_w1369316787.m3u8",
				name: "times-square-north"
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/9974.flv/chunklist_w212315235.m3u8",
				name: "times-square-street"
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/15559.flv/chunklist_w1260148854.m3u8",
				name: "times-square-crossroads"
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/7384.flv/chunklist_w1375826723.m3u8",
				name: "high-line"
			}
		]
	},
	start: function() {
		console.log("in plantrr");
		if (Hls.isSupported()) {
			console.log("hello hls.js!");
		  }
		this.hls = "";
	},
	// Define required scripts.
	getScripts: function() {
		// this loads the hls js file
		return ["https://cdn.jsdelivr.net/npm/hls.js"];
	},
	// Received notifications from ArduPort, which sends Arduino Serial value
	notificationReceived: function(notification, payload, sender) {
		console.log(this.hls);
		// if it has a sender it isn't a system notification
		if (sender) {
			if (parseInt(payload[0].value,10) !== this.config.currentChannel) {
				Log.log(payload[0].value)
			}
			// sets current channel to the value that the Arduino Serial is putting out
			//this.config.currentChannel = parseInt(payload[0].value, 10);
			//this.updateDom();
		}
	},
	destroyHLS: function() {
		this.hls.destroy();
		this.updateDom();
	},
	getDom: function(destroy) {
		var { width, height } = this.config;
		var video = document.createElement("video");
		video.width = this.config.frameWidth;
		if (Hls.isSupported()) {
			var hls = new Hls();
			this.hls = hls;
			hls.loadSource(this.config.streams[this.config.currentChannel].url);
			hls.attachMedia(video);
			hls.on(Hls.Events.MANIFEST_PARSED,function() {
				video.play();how 
			})
		}
		else if(video.canPlayType("application/vnd.apple.mpegurl")) {
			video.src = "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";
			video.addEventListener("loadedmetadata", function() {
				video.play();
			});
		}
		video.play();
		return video;
	}
});
