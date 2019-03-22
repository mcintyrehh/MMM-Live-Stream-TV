Module.register("plantrr",{
	result: [],
	defaults: {
		text: "Henry Test Module!"
	},
	//override dom generator
	start: function() {
		Log.info("Starting module: " + this.name);

		// Schedule update interval.
		var self = this;
		setInterval(function() {
			self.updateDom();
		}, 1000);
	},
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.text;
		return wrapper;
	}

});