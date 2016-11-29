const Block = {
	show: (element) => {
		let el = $(element);
		let centerY = false;
        if (el.height() <= ($(window).height())) {
            centerY = true;
        }
		el.block({
			message: '<div class="loading-message-boxed"><div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>',
            baseZ: 1000,
            centerY: centerY,
            css: {
             	top: '10%',
                border: '0',
                padding: '0',
                backgroundColor: 'none'
            },
            overlayCSS: {
                backgroundColor: '#555',
                opacity: 0.1,
                cursor: 'wait'
            }
        });
	},
	hide: (element) => {
		$(element).unblock({
            onUnblock: function() {
                $(element).css('position', '');
                $(element).css('zoom', '');
            }
		});
	}
};

export default Block;