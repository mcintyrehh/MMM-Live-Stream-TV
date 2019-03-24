Module.register("plantrr",{
	getDom: function() {
			var wrapper = document.createElement("img");
			wrapper.id = 'test';
			wrapper.src = "./frog.jpeg";
			return wrapper;
		}
	
	});
