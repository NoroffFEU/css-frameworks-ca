document
	.getElementById("hamburger-menu")
	.addEventListener("click", function () {
		const sidebar = document.getElementById("sidebar");
		sidebar.classList.toggle("active");

		// Change the hamburger to an 'X'
		const bar1 = document.getElementById("bar1");
		const bar2 = document.getElementById("bar2");
		const bar3 = document.getElementById("bar3");

		bar1.classList.toggle("rotate1");
		bar2.classList.toggle("hide");
		bar3.classList.toggle("rotate2");
	});
