$(document).ready(function () {
	//Prevent Page Reload on all # links
	$("body").on("click", "a[href='#']", function (e) {
		e.preventDefault();
	});

	//placeholder
	$("[placeholder]").each(function () {
		$(this).attr("data-placeholder", this.placeholder);
		$(this).bind("focus", function () {
			this.placeholder = '';
		});
		$(this).bind("blur", function () {
			this.placeholder = $(this).attr("data-placeholder");
		});
	});

	// On scroll Add Class
	$(window).scroll(function (e) {
		if ($(window).scrollTop() > 200) {
			$(".wrapper").addClass('page-scrolled');
		}
		else {
			$(".wrapper").removeClass('page-scrolled');
		}
	});

	var $resizeTimer;
	$(window).on("resize", function (e) {
		if (!$("body").hasClass("window-resizing")) {
			$("body").addClass("window-resizing");
		}
		clearTimeout($resizeTimer);
		$resizeTimer = setTimeout(function () {
			$("body").removeClass("window-resizing");
		}, 250);
	});

	// Add new js functions here -----------------------------------------------------------------
	var sidebarScroll = $(".main-navigation");
	sidebarScroll.niceScroll(sidebarScroll.find(".sidebar-scroll"), {
		bouncescroll: false,
		cursorcolor: "#bfbaba",
		rtlmode: "auto",
	});
	$(".menu-scroll").niceScroll(".wrap", {
		bouncescroll: false,
		cursorcolor: "#bfbaba",
	});
	$("body").on("shown.bs.dropdown", ".dropdown", function () {
		setTimeout(function () {
			$(".menu-scroll").getNiceScroll().resize();
		}, 50);
	});

	// Tabs
	var $mainClass = $(".tab-heading");
	$mainClass.each(function () {
		var $tab = $(this);
		function ulWidth() {
			var navW = 0;
			$tab.find("> .nav-tabs > a").each(function () {
				navW = navW + $(this).outerWidth(true);
			});
			$tab.find("> .nav-tabs").css({ "width": navW + 5 });
		}
		ulWidth();
		$(window).resize(function () {
			ulWidth();
		});

		$tab.jScrollPane({
			showArrows: true
		});

		function scrollAdj() {
			$tab.data('jsp').reinitialise();
		};
		scrollAdj();
		$(window).resize(function () {
			scrollAdj();
		});

		$tab.find(".nav-tabs a").click(function (e) {
			var $this = $(this);
			e.preventDefault();
			if ($tab.attr('active-center') == "true") {
				$tab.data('jsp').scrollByX(parseInt(($this.offset().left - $tab.offset().left) + ($this.innerWidth() / 2)) - ($tab.innerWidth() / 2));
			}
			$(window).resize();
		});
	});

	$('.date-time').datetimepicker();
	$(".date-time").on("dp.show", function () {
		$(this).closest(".bootstrap-select-outer").css({ "z-index": "2" });
	})

	$(".date-time").on("dp.hide", function () {
		$(this).closest(".bootstrap-select-outer").css({ "z-index": "" });
	})

	$(".toggle-icon").click(function () {
		$("body").addClass("menu-open");
	});
	$(".overlay").click(function () {
		$("body").removeClass("menu-open");
	});
	$(".search-button").click(function () {
		$(".search-bar").toggleClass("search-open");
	});
	$(".close-search").click(function () {
		$(".search-bar").removeClass("search-open");
	});

	$("li:has(ul)>a").click(function () {
		$(this).parent().toggleClass('list-open');
		$(this).parent().siblings(".nav-item").removeClass('list-open');
	});

	$("body").on("show.bs.select", ".bootstrap-select", function () {
		$(this).closest(".bootstrap-select-outer").css({ "z-index": "2", "position": "relative" });
	})

	$("body").on("hide.bs.select", ".bootstrap-select", function () {
		$(this).closest(".bootstrap-select-outer").css({ "z-index": "", "position": "" });
	})

	// Don't add anything below this --------------------------------------------------------------
	// Add Class on Window Load
	$("body").addClass("page-loaded");
});