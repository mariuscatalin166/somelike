$('div.product-box .rating').each(function(){
	$(this).siblings('.price').after(this);
});
$('.detail-tabs').removeClass('col-sm-6').addClass('col-sm-12');
$('.detail-recomended').removeClass('col-sm-6').addClass('col-sm-12');
$('.detail-recomended').find('slide-item-2').addClass('slide-item-4').removeClass('slide-item-2');

// FASHION DEPTH  ==========
var fullMenu = '';
$('ul.base-menu li.ifDrop').each(function(){
	fullMenu = fullMenu + '<li class="menu-drop">'+$(this).html()+'</li>';
});
$('.nav-menu.base-menu').addClass('container-h');
$('ul.base-menu li.all-product-button').remove();
$('ul.base-menu').prepend(fullMenu);
$('ul.base-menu li > a > i').removeClass('fa-angle-right');
$('ul.base-menu li > a > i').addClass('fa-angle-down');
$('ul.base-menu ul.drop-list').each(function(){
	if(!$(this).parent('div.menu-dd').length){
		$('<div class="menu-dd"> </div>').insertBefore($(this));
	}
})
$('div.menu-dd').each(function(){
	var image = $(this).next('ul.drop-list').find('li.image').html();
	var slider = $(this).next('ul.drop-list').find('li.slider-menu').html();
	$(this).next('ul.drop-list').find('li.image').remove();
	$(this).next('ul.drop-list').find('li.slider-menu').remove();
	var subcat = $(this).next('ul.drop-list').html();
	if(subcat != undefined){
		var w = $(this).next('ul.drop-list').hasClass('w60') ? 'w60' : 'w100';
		$(this).next('ul.drop-list').remove();
		$(this).append('<ul class="drop-list clearfix '+w+'">'+subcat+'</ul>');
		if ( $(image).length ) {
			$(this).append('<div class="cat-img fr">'+image+'</div>');
		}
		if ( $(slider).length ) {
			$(this).append('<div class="slider-menu fl w100">'+slider+'</div>');
		}
	}
});

// BASE MENU  ==========
$('ul.base-menu').show();

$(document).ready(function () {

	// FASHION MENU ==========
	function Menu(){
		$('.menu-dd').each(function() {
			var $this = $(this);
			var Nli = $this.find('li').length;
			var Nlink = $this.find('a').length;
			var Ncol = Math.ceil(Nlink / 15);
			var Mbanner = $this.find('.cat-img').length;
			
			Ncol = Ncol == 0 ? 1 : Ncol; 
			col = Nli > Ncol ? Ncol : Nli;
			col = (col + (Mbanner ? 1 : 0) > 4) ? 4 : col;
			$this.addClass('column' + col);
			if (Mbanner){$this.addClass('banner');};
			if ($this.find('li span > a').length == 0){
				$this.addClass('no-sub');
			};
			if ($this.hasClass('column4')){
				$this.parent().addClass('initial-h');
			};
		});
	};
	Menu();
	
	$('.main-header .menu-drop').hover(function() {
		$(this).children('.menu-dd').stop().toggleClass('open');
		if ( $('.slide-item-menu').length ) {
			$('.slide-item-menu').owlCarousel({items:2,navigation:!0,pagination:!1});
		
		
			// get owl element
			var owl = $('.slide-item-menu');

			// get owl instance from element
			var owlInstance = owl.data('owlCarousel');

			// if instance is existing
			if(owlInstance != null)
			owlInstance.reinit();
		};
	});

	if($(".slide-item-4").length)
	{
		$(".slide-item-4").data('owlCarousel').destroy();
		$(".slide-item-4").owlCarousel({items:4,navigation:!0,pagination:!1});
	}

	if($(".slide-item-2").length)
	{
		$(".slide-item-2").data('owlCarousel').destroy();
		$(".slide-item-2").owlCarousel({items:4,navigation:!0,pagination:!1});
	}

});
