Module.register("plantrr",{
	defaults: {
		frameWidth: "300",
		maxWidth: "100%",
		url: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
		scrolling: "no"
	},
	start: function() {
		console.log("in plantrr");
		if (Hls.isSupported()) {
			console.log("hello hls.js!");
		  }
	},
	// Define required scripts.
	getScripts: function() {
		return ["https://cdn.jsdelivr.net/npm/hls.js"];
	},
	getDom: function() {
		var { width, height } = this.config;
		var video = document.createElement("video");
		if (Hls.isSupported()) {
			var hls = new Hls();
			//bind them together
			hls.attachMedia(video);
			//MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
			hls.on(Hls.Events.MEDIA_ATTACHED, function() {
				console.log("video and hls.js are now bound together!");
				hls.loadSource(this.config.url);
				hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
					console.log(`manifest loaded, found ${data.levels.length} quality level`);
				});
			});
		}
		return video;
	}

});
