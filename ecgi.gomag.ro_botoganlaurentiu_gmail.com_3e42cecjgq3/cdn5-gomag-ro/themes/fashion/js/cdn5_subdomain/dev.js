var v = $('script:last').data('values');
var scriptData = typeof v === 'object' ? v : JSON.parse(v);
//Form Stylization
function formStylization() {
  var $        = jQuery,
	checkbox = 'input[type="checkbox"]';
  
  
	$(checkbox).each(function(){

	  if(!$(this).hasClass('styleApplied')){
		$(this).addClass('styleApplied').wrap('<div class="new-checkbox fl"></div>');
	  }
	
	})
	$(checkbox + ':checked').parent('.new-checkbox').addClass('checked');
	 
	  
	$(checkbox + ':disabled').parent().addClass('disabled');
	$('html').on('click', function(e){
		
		$(checkbox).parent('.new-checkbox').removeClass('checked');
		$(checkbox + ':checked').parent('.new-checkbox').addClass('checked');
		$(checkbox).parents('.setCompare').addClass('ignoreChecked');
		
		$(checkbox).parent().removeClass('disabled');
		$(checkbox + ':disabled').parent().addClass('disabled');
	});
  
}

formStylization();
 $('div.catDesc').hide();
	$(document).ready(function(){
		if($('div.catDesc').length){
			var elementContent = $('.catDesc').html();
			
			var elementContent = elementContent.replace("<hr />", "<hr/>").replace("<hr>", "<hr/>").replace("<hr >", "<hr/>");
			var index = elementContent.indexOf("<hr/>");  
			var first = elementContent.substr(0, index); // Gets the first part
			var second = elementContent.substr(index+5); //Gets second part
			var inpageText = '';
			if(first != '' && second != ""){
				inpageText += '<div>'+first+'</div>';
				inpageText += '<div class="descriptionSecondValue" style="display: none;">'+second+'</div>';
				inpageText += '<div><a href="javascript:void(0)" class="displayMore categoryDescriptionDisplay" style="float: right;" data-text-swap="'+scriptData.seeLess+'">'+scriptData.seeMore+'<a></div>';
				$('div.catDesc').html(inpageText);
			}
			$('div.catDesc').show();
		}
		$(document).on('click', '.categoryDescriptionDisplay', function(){
			var el = $(this);
			if (el.text() == el.data("text-swap")) {
				el.text(el.data("text-original"));
			} else {
				el.data("text-original", el.text());
				el.text(el.data("text-swap"));
			}
			$('.descriptionSecondValue').slideToggle();
		})

		if($('div._descriptionTab').length){
			var elementContent = $('._descriptionTab').html();
			
			var elementContent = elementContent.replace("<hr />", "<hr/>").replace("<hr>", "<hr/>").replace("<hr >", "<hr/>");
			var index = elementContent.indexOf("<hr/>");  
			var first = elementContent.substr(0, index); // Gets the first part
			var second = elementContent.substr(index+5); //Gets second part
			var inpageText = '';
			if(first != '' && second != ""){
				inpageText += '<div>'+first+'</div>';
				inpageText += '<div class="descriptionSecondValue" style="display: none;">'+second+'</div>';
				inpageText += '<div><a href="javascript:void(0)" class="displayMore productDescriptionDisplay" style="float: right;" data-text-swap="'+scriptData.seeLess+'">'+scriptData.seeMore+'<a></div>';
				$('div._descriptionTab').html(inpageText);
			}
			$('div._descriptionTab').show();
		}
		$(document).on('click', '.productDescriptionDisplay', function(){
			var el = $(this);
			if (el.text() == el.data("text-swap")) {
				el.text(el.data("text-original"));
			} else {
				el.data("text-original", el.text());
				el.text(el.data("text-swap"));
			}
			$('.descriptionSecondValue').slideToggle();
		})

		var logoImgCss = $('#logo>img.img-responsive').css('content');
		
		if(logoImgCss != undefined && logoImgCss && logoImgCss != 'none' && logoImgCss != 'normal'){
			
			var logoImgCss = (logoImgCss.replace('url("','').replace('")', '').replace(')', '').replace('url(', ''));
			if(logoImgCss != 'normal'){
				$('#logo>img.img-responsive').attr('src', logoImgCss);
			}
		}
	})