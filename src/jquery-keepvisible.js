/*

Two use cases:

1) something at a position that you want to always stay on screen regardless, like a header

2) something that you want to stay on screen, if it can and still be inside a container, start with one dimension

<div id="slide-container">
	<div id="slide">this is my special content</div>
</div>


 */

(function($){

	$.fn.keepVisible = function(keepInside){
		
		// if no parent id then
		var margin = {
			top: 0,
			bottom: 0
		};

		// get the normal size
		var height = this.height();
		var width  = this.width();
		var outerHeight = this.outerHeight();
		var outerWidth  = this.outerWidth();
		var offset = this.offset();
		if (keepInside){
			margin.top = offset.top;
			margin.bottom = $(document).outerHeight() - offset.top - outerHeight;
		}

		var slider = this;
		// make a placeholder
		var placeHolder = $('<div class="placeholder">placeholder</div>')
			.css({height: outerHeight, width: outerWidth, display: 'none'})
			.insertBefore(this);

		// make the 
		var modeFlow = 0, modeTop = 1, modeBottom = 2;
		var mode = modeFlow;
		var check = function(){
			var scrollTop = $(window).scrollTop();
			var winHeight = $(window).height();
			var oldMode = mode;
			mode = modeFlow;

			// has the slider overlapped the window frame?
			if (scrollTop < offset.top + outerHeight - winHeight ){
				mode |= modeBottom;
			}
			if (scrollTop > offset.top ){
				mode |= modeTop;
			}

			// if both the top and bottom overlap then put it back into flow mode
			if (mode === (modeTop | modeBottom)){ mode -= modeTop | modeBottom; }
			if (mode === oldMode){ return; }

			if (mode === modeFlow){
				placeHolder.hide();
				slider.css({
					'position': 'static',
					'height': 'auto',
					'width': 'auto'
				});
				return;
			}
			placeHolder.show();
			slider.css('position', 'fixed')
				.width(width)
				.height(height);
			if (mode & modeBottom){
				slider.css({
					'bottom': '0',
					'top': 'auto'
					});
			} else if (mode === modeTop){
				slider.css({
					'top': '0px',
					'bottom': 'auto'
					});
			}

		};
		$(window).scroll(check);
		$(window).resize(check);
		check();
	};


})(jQuery);



