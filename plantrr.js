Module.register("plantrr",{
	defaults: {
		text: "Hello World!"
	},
	//override dom generator
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.text;
		return wrapper;
	}

});