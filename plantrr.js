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
				url: "https://videos3.earthcam.com/fecnetwork/13908.flv/chunklist_w1570249403.m3u8",
				name: "Empire State Building",
				channelNumber: 0,
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/13900.flv/chunklist_w1596516954.m3u8",
				name: "ESB View (South)",
				channelNumber: 1,
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/10874.flv/chunklist_w1710102470.m3u8",
				name: "World Trade Center",
				channelNumber: 2,
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/chargingbull.flv/chunklist_w924600150.m3u8",
				name: "Wall Street Bull",
				channelNumber: 3,
			},
						{
				url: "https://videos3.earthcam.com/fecnetwork/hdtimes10.flv/chunklist_w1219632180.m3u8",
				name: "Times Square",
				channelNumber: 4,
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/4017timessquare.flv/chunklist_w2099074996.m3u8",
				name: "Times Square View (South)",
				channelNumber: 5,
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/485.flv/chunklist_w1369316787.m3u8",
				name: "Times Square View (North)",
				channelNumber: 6,
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/9974.flv/chunklist_w212315235.m3u8",
				name: "Times Square Street Cam",
				channelNumber: 7,
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/15559.flv/chunklist_w1260148854.m3u8",
				name: "Times Square Crossroads",
				channelNumber: 8,
			},
			{
				url: "https://videos3.earthcam.com/fecnetwork/13903.flv/chunklist_w980148749.m3u8",
				name: "Midtown Skyline",
				channelNumber: 9,
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
		// if it has a sender it isn't a system notification
		if (sender) {
			Log.log(`${this.name} received a module notification: ${notification} from sender: ${sender.name}`);
			if (newChannel != this.config.currentChannel) {
				var newChannel = parseInt(payload[0].value);
				Log.log(newChannel);
				// sets current channel to the value that the Arduino Serial is sending out
				this.config.currentChannel = newChannel;
				this.destroyHLS();
			} else {
				Log.log("not loaded yet")
			};
		} else {
			Log.log(`${this.name} received a system notification: ${notification}`)
		}
	},
	destroyHLS: function() {
		this.hls.destroy();
		this.updateDom();
	},
	getDom: function(destroy) {
		var wrapper = document.createElement("div");
		var { width, height } = this.config;
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
			hls.loadSource(this.config.streams[this.config.currentChannel].url);
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
	}
});
