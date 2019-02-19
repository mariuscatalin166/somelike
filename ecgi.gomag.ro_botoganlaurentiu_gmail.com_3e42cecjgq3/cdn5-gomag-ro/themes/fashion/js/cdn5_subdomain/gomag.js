(function($){
	var dataAppend = [];
	var dataPrepend = [];
	var dataInside = [];
	var dataRun = [];
	var dataProductAjax = [];
	var config = [];

	var widgets = {};
	var widgetUrl = '';
	
	var ajaxLoadUserDataUrl = '';
	var ajaxLoadUserProductsUrl = '';
	var ajaxLoadProductDetails = '';
	var productDetailsId = '';
	
	var cartSummaryUrl = '';
	var environment = [];
	var defaultCookieTime = 5*3600*24*1000;
	var defaultCookieTimeOneDay = 3600*24*1000;

	var events = {};
	function eventResponse(){
					var results = [];
					var last = '';
					this.getOk = function()
					{
						return results;
					};
					this.delay = function()
					{	
						var index = results.length - 1;
						results[index] = 0;
						return index;
					}
					this.complete = function(i)
					{
						
						var index = i !== undefined ? i : results.length;
						
						results[index] = 1;
						return index;
					};
					this.checkComplete = function()
					{
						return results.indexOf(0);
					}
					
	};

	$.Gomag = {
		getData: function(){
			console.log(data);
		},

		bind : function(event, callback)
		{
			events[event] = events[event] !== undefined ? events[event] : {};
			if(callback.name)
			{
				var callbackName = callback.name;
			} else {
				var callbackName = Object.keys(events[event]).length + 1;
			}
			
			events[event][callbackName] = callback;
		},
		trigger : function(event, data, callbackEvent)
		{
			
			if(events[event] !== undefined)
			{
				var eventResponseTrigger = new eventResponse;
				
				$.each(events[event], function(i, callback){
					eventResponseTrigger.complete();
					callback(eventResponseTrigger, data);
					
				});
				var eventResponseCheck = setInterval(function(){
					if(eventResponseTrigger.checkComplete() === -1)
					{
						
						clearInterval(eventResponseCheck);
						clearTimeout(eventResponseCheck);
						if(callbackEvent !== undefined){
							callbackEvent();
						}
						
					}

				}, 300);
					
			}
		},

		append : function(dataBlock, value, lazyload){

			if(lazyload !== undefined && lazyload){
				dataAppend.push({'dataBlock': dataBlock, 'value': value});
			} else {
				$('[data-block="'+dataBlock+'"]').each(function(){
					if(!$(this).siblings('[data-block="'+dataBlock+'After"]').length){

						$(this).after('<div data-block="'+dataBlock+'After"></div>');
					}
				})
				$('[data-block="'+dataBlock+'After"]').append(
					function(){
						return jQuery.isFunction(
							value)
							?
							value($(this), $.parseJSON($(this).parents('[data-Gomag]').attr('data-Gomag')))
							:
							value}

				).attr('data-block-loaded', 'loaded');
			}
		},
		inside : function(dataBlock, value, lazyload){

			if(lazyload !== undefined &&  lazyload){
				dataInside.push({'dataBlock': dataBlock, 'value': value});
			} else {
				$('[data-block="'+dataBlock+'"]').each(function(){
					if(!$(this).find('[data-block="'+dataBlock+'Inside"]').length){

						$(this).append('<div data-block="'+dataBlock+'Inside"></div>');
					}
				})

				$('[data-block="'+dataBlock+'Inside"]').append(
					function(){
						return jQuery.isFunction(
							value)
							?
							value($(this), $.parseJSON($(this).parents('[data-Gomag]').attr('data-Gomag')))
							:
							value}

				).attr('data-block-loaded', 'loaded');

			}

		},

		prepend : function(dataBlock, value, lazyload){
			if(lazyload !== undefined && lazyload){

				dataPrepend.push({'dataBlock': dataBlock, 'value': value});
			} else {
				$('[data-block="'+dataBlock+'"]').each(function(){
					if(!$(this).siblings('[data-block="'+dataBlock+'Before"]').length){

						$(this).before('<div data-block="'+dataBlock+'Before"></div>');
					}
				})
				$('[data-block="'+dataBlock+'Before"]').append(
					function(){
						return jQuery.isFunction(
							value)
							?
							value($(this), $.parseJSON($(this).parents('[data-Gomag]').attr('data-Gomag')))
							:
							value}

				).attr('data-block-loaded', 'loaded');
			}

		},
		
		run : function(dataFunction){

			dataRun.push(dataFunction);

		},
		buildProductsForDataRequest : function()
		{
			var uniqueProducts = {};
			$.Gomag.productDetailsId = '';
			$($.Gomag.config.listingProductBox).each(function(){

				var classList = $(this).attr('class').match($.Gomag.config.listingProductBoxClassNamePrefix+'([0-9]+)');
				if(classList !== null){

					uniqueProducts[classList[1]] = classList[1];
				}
			});
			
			$($.Gomag.config.detailsProductBox).each(function(){
			
				var classList = $(this).attr('class').match($.Gomag.config.detailsProductBoxClassNamePrefix+'([0-9]+)');

				if(classList !== null){
					uniqueProducts[classList[1]] = classList[1];
					$.Gomag.productDetailsId = classList[1];
				}
			});
			var products = [];
			if(!jQuery.isEmptyObject(uniqueProducts))
			{
				
				$.each(uniqueProducts, function(i, v){
					products.push(v);
				});
				
			}
			$.Gomag.getUserAjaxData();
			$.Gomag.getProductsAjaxData(products.sort());
		},
		MD5 :function(string){
			 function RotateLeft(d,n){return d<<n|d>>>32-n}function AddUnsigned(d,n){var a,c,S,r,x;return S=2147483648&d,r=2147483648&n,x=(1073741823&d)+(1073741823&n),(a=1073741824&d)&(c=1073741824&n)?2147483648^x^S^r:a|c?1073741824&x?3221225472^x^S^r:1073741824^x^S^r:x^S^r}function F(d,n,a){return d&n|~d&a}function G(d,n,a){return d&a|n&~a}function H(d,n,a){return d^n^a}function I(d,n,a){return n^(d|~a)}function FF(d,n,a,c,S,r,x){return AddUnsigned(RotateLeft(d=AddUnsigned(d,AddUnsigned(AddUnsigned(F(n,a,c),S),x)),r),n)}function GG(d,n,a,c,S,r,x){return AddUnsigned(RotateLeft(d=AddUnsigned(d,AddUnsigned(AddUnsigned(G(n,a,c),S),x)),r),n)}function HH(d,n,a,c,S,r,x){return AddUnsigned(RotateLeft(d=AddUnsigned(d,AddUnsigned(AddUnsigned(H(n,a,c),S),x)),r),n)}function II(d,n,a,c,S,r,x){return AddUnsigned(RotateLeft(d=AddUnsigned(d,AddUnsigned(AddUnsigned(I(n,a,c),S),x)),r),n)}function ConvertToWordArray(d){for(var n,a=d.length,c=a+8,S=16*((c-c%64)/64+1),r=Array(S-1),x=0,b=0;b<a;)x=b%4*8,r[n=(b-b%4)/4]=r[n]|d.charCodeAt(b)<<x,b++;return x=b%4*8,r[n=(b-b%4)/4]=r[n]|128<<x,r[S-2]=a<<3,r[S-1]=a>>>29,r}function WordToHex(d){var n,a="",c="";for(n=0;n<=3;n++)a+=(c="0"+(d>>>8*n&255).toString(16)).substr(c.length-2,2);return a}function Utf8Encode(d){d=d.replace(/\r\n/g,"\n");for(var n="",a=0;a<d.length;a++){var c=d.charCodeAt(a);c<128?n+=String.fromCharCode(c):(127<c&&c<2048?n+=String.fromCharCode(c>>6|192):(n+=String.fromCharCode(c>>12|224),n+=String.fromCharCode(c>>6&63|128)),n+=String.fromCharCode(63&c|128))}return n}var k,AA,BB,CC,DD,a,b,c,d,x=Array(),S11=7,S12=12,S13=17,S14=22,S21=5,S22=9,S23=14,S24=20,S31=4,S32=11,S33=16,S34=23,S41=6,S42=10,S43=15,S44=21;for(string=Utf8Encode(string),x=ConvertToWordArray(string),a=1732584193,b=4023233417,c=2562383102,d=271733878,k=0;k<x.length;k+=16)b=II(b=II(b=II(b=II(b=HH(b=HH(b=HH(b=HH(b=GG(b=GG(b=GG(b=GG(b=FF(b=FF(b=FF(b=FF(BB=b,c=FF(CC=c,d=FF(DD=d,a=FF(AA=a,b,c,d,x[k+0],S11,3614090360),b,c,x[k+1],S12,3905402710),a,b,x[k+2],S13,606105819),d,a,x[k+3],S14,3250441966),c=FF(c,d=FF(d,a=FF(a,b,c,d,x[k+4],S11,4118548399),b,c,x[k+5],S12,1200080426),a,b,x[k+6],S13,2821735955),d,a,x[k+7],S14,4249261313),c=FF(c,d=FF(d,a=FF(a,b,c,d,x[k+8],S11,1770035416),b,c,x[k+9],S12,2336552879),a,b,x[k+10],S13,4294925233),d,a,x[k+11],S14,2304563134),c=FF(c,d=FF(d,a=FF(a,b,c,d,x[k+12],S11,1804603682),b,c,x[k+13],S12,4254626195),a,b,x[k+14],S13,2792965006),d,a,x[k+15],S14,1236535329),c=GG(c,d=GG(d,a=GG(a,b,c,d,x[k+1],S21,4129170786),b,c,x[k+6],S22,3225465664),a,b,x[k+11],S23,643717713),d,a,x[k+0],S24,3921069994),c=GG(c,d=GG(d,a=GG(a,b,c,d,x[k+5],S21,3593408605),b,c,x[k+10],S22,38016083),a,b,x[k+15],S23,3634488961),d,a,x[k+4],S24,3889429448),c=GG(c,d=GG(d,a=GG(a,b,c,d,x[k+9],S21,568446438),b,c,x[k+14],S22,3275163606),a,b,x[k+3],S23,4107603335),d,a,x[k+8],S24,1163531501),c=GG(c,d=GG(d,a=GG(a,b,c,d,x[k+13],S21,2850285829),b,c,x[k+2],S22,4243563512),a,b,x[k+7],S23,1735328473),d,a,x[k+12],S24,2368359562),c=HH(c,d=HH(d,a=HH(a,b,c,d,x[k+5],S31,4294588738),b,c,x[k+8],S32,2272392833),a,b,x[k+11],S33,1839030562),d,a,x[k+14],S34,4259657740),c=HH(c,d=HH(d,a=HH(a,b,c,d,x[k+1],S31,2763975236),b,c,x[k+4],S32,1272893353),a,b,x[k+7],S33,4139469664),d,a,x[k+10],S34,3200236656),c=HH(c,d=HH(d,a=HH(a,b,c,d,x[k+13],S31,681279174),b,c,x[k+0],S32,3936430074),a,b,x[k+3],S33,3572445317),d,a,x[k+6],S34,76029189),c=HH(c,d=HH(d,a=HH(a,b,c,d,x[k+9],S31,3654602809),b,c,x[k+12],S32,3873151461),a,b,x[k+15],S33,530742520),d,a,x[k+2],S34,3299628645),c=II(c,d=II(d,a=II(a,b,c,d,x[k+0],S41,4096336452),b,c,x[k+7],S42,1126891415),a,b,x[k+14],S43,2878612391),d,a,x[k+5],S44,4237533241),c=II(c,d=II(d,a=II(a,b,c,d,x[k+12],S41,1700485571),b,c,x[k+3],S42,2399980690),a,b,x[k+10],S43,4293915773),d,a,x[k+1],S44,2240044497),c=II(c,d=II(d,a=II(a,b,c,d,x[k+8],S41,1873313359),b,c,x[k+15],S42,4264355552),a,b,x[k+6],S43,2734768916),d,a,x[k+13],S44,1309151649),c=II(c,d=II(d,a=II(a,b,c,d,x[k+4],S41,4149444226),b,c,x[k+11],S42,3174756917),a,b,x[k+2],S43,718787259),d,a,x[k+9],S44,3951481745),a=AddUnsigned(a,AA),b=AddUnsigned(b,BB),c=AddUnsigned(c,CC),d=AddUnsigned(d,DD);var temp=WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
			return temp.toLowerCase();
		},
		buildHash: function(data)
		{
		
			return $.Gomag.MD5(JSON.stringify(data));
		},
		addProductListing : function(i, v){
			$($.Gomag.config.listingBasePrice + i).html(v.basePriceList);
			$($.Gomag.config.listingFinalPrice + i).html(v.finalPriceList);
			$($.Gomag.config.listingFinalPriceVat + i).html(v.priceVatFinalExcluded);
			$($.Gomag.config.listingBasePriceVat + i).html(v.priceVatBaseExcluded);
			if(v.disableAddToCartButton === true)
			{
				$($.Gomag.config.listingAddToCartGeneral).trigger('hideAddToCartButton', (v));
				
			} 
			
			if(v.basePrice == '' || parseFloat(v.basePrice) <= parseFloat(v.finalPrice))
			{
				$($.Gomag.config.listingDiscountIcon + i).remove();
			}
			else
			{
				if($($.Gomag.config.listingDiscountIcon + i).length)
				{
					$($.Gomag.config.listingDiscountIcon + i).html('-'+v.discountPercent+'%');
				}
				else
				{
					
					$($.Gomag.config.listingIconBox + i).prepend('<span class="icon discount bg-main '+($.Gomag.config.listingDiscountIconClass + i)+'">-'+v.discountPercent+'%</span>');
				}
			}
		},
		addProductDetail: function(i, v){
			if($.Gomag.productDetailsId == i){
				if(v.disableAddToCartButton === true)
				{
					$($.Gomag.config.detailsAddToCart + i).trigger('hideAddToCartButton');
					
				} 
				else 
				{
					$($.Gomag.config.detailsAddToCart + i).trigger('displayAddToCartButton');
					
				}
				
				$($.Gomag.config.detailsBasePrice + i).html(v.basePriceCurrency);
				$($.Gomag.config.detailsFinalPrice + i).html(v.finalPriceCurrency);
				$($.Gomag.config.detailsBasePriceVat + i).html(v.priceVatBaseExcluded);
				$($.Gomag.config.detailsFinalPriceVat + i).html(v.priceVatFinalExcluded);
				if(v.basePrice == '' || parseFloat(v.basePrice) > parseFloat(v.finalPrice))
				{
					$($.Gomag.config.detailsDiscountValue).html(parseFloat(v.basePrice) - parseFloat(v.finalPrice));
				} else {
					$($.Gomag.config.detailsDiscountIcon + i).remove();
				}
				
				$($.Gomag.config.detailsProductPriceBox + i).removeClass('hide');
				$.event.trigger('Gomag/Product/Detail/Loaded', {v:v});
				
			}
		},
		getUserAjaxData: function()
		{
			$.get($.Gomag.ajaxLoadUserDataUrl, {}, function(data){
				$.Gomag.trigger('User/Data/Response', data);
			},'json');
		},
		getProductsAjaxData: function(products)
		{
		
			hash = $.Gomag.buildHash({p:products, v: $.Gomag.productDetailsId});
			$.get($.Gomag.ajaxLoadUserProductsUrl+hash, {p:products, v: $.Gomag.productDetailsId}, function(data){
				
				if($($.Gomag.config.selectedCurrency).length && data.selectedCurrency !== undefined){
					$($.Gomag.config.selectedCurrency).html(data.selectedCurrency);
				}
				if(data.products !== undefined){
					$.each(data.products, function(i, v){
						$.Gomag.addProductListing(i, v);
						$.Gomag.addProductDetail(i, v);

						if(v.timerEnd !== false)
						{
							$.Gomag.startTimer($.Gomag.config.detailsCountDownTimer + i, v.timerEnd, v.timerDuration);
						}
					})		
				}
			},'json');
		},
		
		startTimer : function(selector, timerEnd, timerDuration, timerEndCallback)
		{
			$(selector).css({'display':'inline'});

			$(selector).countdown(timerEnd, function(event) {
				var totalHours = event.offset.totalDays * 24 + event.offset.hours;
				$(this).html(event.strftime(totalHours + 'h:%Mm:%Ss'));

			});
			if(parseInt(timerDuration)>0 && parseInt(timerDuration)<720) {
					timerDuration = parseInt(timerDuration)*parseInt(1000);
					setTimeout(function() {
						if(timerEndCallback !== undefined)
						{
							$(selector).trigger(timerEndCallback);
						} else {
							$(selector).fadeOut('slow');
						}
					}, timerDuration);

				}
		},
		productAjax : function(dataUrl, dataSelector, dataAttr, dataFunction){
			function blink(selector){
				$(selector).fadeOut('slow', function(){
					$(this).fadeIn('slow', function(){
						blink(this);
					});
				});
			}

			var productsId = $(dataSelector).map(function() {
			  return $(this).data(dataAttr);
			}).get();


			$.post(dataUrl, {products:productsId}, function(data){
				var countdownTimeout = 0;
				var countdownTimeoutId = 0;

				$(dataSelector).each(function() {
					var productId = $(this).data(dataAttr);


					if(productId != undefined && data.products[productId] !== undefined && data.products[productId].withDiscount !== undefined && data.products[productId].activeDiscount !== undefined) {
						if(data.products[productId].withDiscount === true && data.products[productId].activeDiscount === false) {

							dataFunction($(this));
							$(this).find('.text-main').html(data.products[productId].finalPrice);	
									
						} else {
							if(data.products[productId].withDiscount === true && data.products[productId].activeDiscount === true) {

								if(data.products[productId].timerEnd != 0) {
									if(parseInt(countdownTimeout) == 0) {
										countdownTimeout = data.products[productId].timerDuration;
										countdownTimeoutId = productId;
									} else {
										if(parseInt(countdownTimeout)>parseInt(data.products[productId].timerDuration)) {
											countdownTimeout = data.products[productId].timerDuration;
											countdownTimeoutId = productId;
										}
									}

									//show special price for product
									
									$(this).find('.price-full').html(data.products[productId].basePrice);	
									$(this).find('.text-main').html(data.products[productId].finalPrice);	
									$(this).find('.product-icon-box').html(data.products[productId].discountPercent);	
									
									$('#_countDown_'+productId).css({'display':'inline'});

									$('#_countDown_'+productId).countdown(data.products[productId].timerEnd, function(event) {
										var totalHours = event.offset.totalDays * 24 + event.offset.hours;
										$(this).html(event.strftime(totalHours + 'h:%Mm:%Ss'));

									});
								}
							}
						}
					}
				});

				if(parseInt(countdownTimeout)>0 && parseInt(countdownTimeout)<720) {
					countdownTimeout = parseInt(countdownTimeout)*parseInt(1000);
					setTimeout(function() {
						$('#_timeExpired').val(1);
						blink('#_countDown_'+countdownTimeoutId);
					}, countdownTimeout);

				}

			},'json');

		},
		generateFBUnique : function()
		{
			return $.Gomag.generateRandomString(10);
		},
		generateRandomString: function(stringLength)
		{
			var text = "";
			var stringLength = stringLength == undefined ? 10 : stringLength;
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for (var i = 0; i < stringLength; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		},
		setProductsImages : function(){
			$('.listImage').each(function(){
				if($(this).attr('data-image')){

					$(this).attr('src', $(this).attr('data-image')).removeClass('hidden');
					$(this).attr('data-image', '');
				}
			})
		},
		cookieExists: function(cookieName)
		{
			
			if (typeof $.cookie(cookieName) === 'undefined' || $.cookie(cookieName) === null ||  $.cookie(cookieName) === false){
				 return false;
				} else {
				 return true;
				}
		},
		setCookie : function(cookieName, cookieValue, cookieExpire, closeFancybox, callback){
			cookieExpire = cookieExpire != '' ? cookieExpire : defaultCookieTime;
			var expires = new Date();
            expires.setTime(expires.getTime() + parseInt(cookieExpire));
			document.cookie = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue) + '; expires='+ expires.toUTCString() + "; path=/";

			if(callback !== undefined && typeof callback === 'function')
			{
				$('body').trigger(callback);
			}

			if(closeFancybox){
				$.fancybox.close();
			}
		},
		
		ajax : function(url, data, method, callback){
			
			var vars = data;
			$.ajax({
			  url: url,
			  dataType : 'json',
			  data : vars,
			  method : method != '' && method !== undefined ? method : 'GET',
			}).complete(function(data) {
				
				if(callback != '' && callback !== undefined){
					if(jQuery.isFunction(callback)){
						
						callback(data.responseText);
					} else {
						
						$('body').trigger(callback, data.responseJSON);
					}
				};
			});
			
		},
		
		showCartSummary : function(cartSummarySelector){
			$.Gomag.ajax(
							this.cartSummaryUrl, 
							{}, 
							'POST',
							function(data){$(cartSummarySelector).html(data)}
						);
			
		},
		hideCartSummary : function(cartSummarySelector){
			$(cartSummarySelector).html('');
		},
		autocomplete : function(url, minLength, dataType, element, responseCallback, selectCallback){
			
			 $(element).autocomplete({
				source		:	url,
				minLength	:	minLength !== undefined && minLength != '' ? minLength : 2,
				dataType	:	dataType !== undefined && dataType != '' ? dataType : "json",
				select		: 	function (event, selected) {
					
					if(selectCallback != '' && selectCallback !== undefined){
						$('body').trigger(selectCallback, selected.item);
					}
				},
				response	: 	function (event, suggestions) {

					if(responseCallback != '' && responseCallback !== undefined){
						$('body').trigger(responseCallback, suggestions);
					}
				}
			});
		},

		setWidgetEnviroment : function(){
			var get = [];
			var environment = $.Gomag.environment;
			$.each(environment, function(i, v){
				if(i == 'Product/Category'){
					get.push('c='+v);
				}
				if(i == 'Product'){
					get.push('p='+v);
				}
				if(i == 'Product/HasDiscount'){
					get.push('disc='+(v ? 1 : 0));
				}
				if(i == 'Page/Order' || i == 'Page/OrderCheckout'){
					get.push('pid='+(v));
				}

			});

			return get;
		},
		triggerLoadWidget : function(type){

			if(widgets[type] === undefined){
				return false;
			}
			if(type == 'hellobar:onload'){
				$.Gomag.triggerHelloBar(type);
			}
			if(type == 'cookiePolicy:onload'){
				$.Gomag.triggerCookiePolicy(type);
			}
			if(type == 'popup:onload'){
				$.Gomag.triggerPopup(type);
			}
			if(type == 'popup:onexit'){
				var cookie = $.Gomag.triggerPopup(type);
				if(cookie){
					$.Gomag.setCookie(cookie, 1, defaultCookieTime);
				}
			}
			if(type == 'popup:onscroll:50'){
				var cookie = $.Gomag.triggerPopup(type);
				if(cookie){
					$.Gomag.setCookie(cookie, 1, defaultCookieTimeOneDay);
				}
			}

		},

		triggerHelloBar : function(type){
			$('#_gomagHellobar').html('');
			$('#_gomagHellobarITC').html('');
			$.each(widgets[type], function(i, v){

				$('#_gomagHellobar').append(v['element'].split(['[newLine]']).join("\n"));
				$('#_gomagHellobarITC').append(v['element'].split(['[newLine]']).join("\n"));
				$('#_gomagHellobar').removeClass('hide');
				$('#_gomagHellobarITC').removeClass('hide');
			})
		},
		getWidgets : function(type, key){
			if(widgets[type] !== undefined){

				if(key !== undefined){
					if(widgets[type][key] !== undefined){
						return widgets[type][key];
					} else {
						return false;
					}
				}

				return widgets[type];
			}
			return false;
		},
		triggerCookiePolicy : function(type){

			$.each(widgets[type], function(i, v){

				$('body').prepend(v['element'].split(['[newLine]']).join("\n"));
			})
		},
		triggerPopup : function(type){
			var setted = '';

			// if(widgets['cookiePolicy:onload'] !== undefined){
				// return false;
			// }

			$.each(widgets[type], function(i, v){

				if(document.cookie.indexOf(i) >= 0){
					return true;
				}

				options = {
					maxWidth: v.data.popupWidth !== undefined && parseInt(v.data.popupWidth) > 0 ? v.data.popupWidth+'px' : '640px',
					maxHeight: v.data.popupHeight !== undefined && parseInt(v.data.popupHeight) > 0 ? v.data.popupHeight+'px' : '580px',

					closeBtn: false,
					overlayShow: true,
					overlayOpacity: 0.3,
					closeClick: false,
					padding: 0,
					transitionIn: 'none',
					transitionOut: 'none',
					type: 'inline',
					content : v.element,
					helpers: {
						overlay: {
									closeClick: type == 'popup:onload' && v.data.popupType != 'messenger' ? false : true,
									locked : false
								} //Disable click outside event
					}
				};
				if(v.data.popupWidth !== undefined && parseInt(v.data.popupWidth) > 0 || v.data.popupHeight !== undefined && parseInt(v.data.popupHeight) > 0){
					options['fitToView'] = true;
					options['autoSize'] = false;
					 options['afterLoad'] = function () {
						this.width = parseInt(v.data.popupWidth) > 0 ? parseInt(v.data.popupWidth) : 640;
						this.height = parseInt(v.data.popupHeight) > 0 ? parseInt(v.data.popupHeight) : 580;
					}
				} else {
					options['fitToView'] = true;
					options['autoSize'] = true;
				}

				$.Gomag.openPopup(options);
				if(v.data.popupType == 'messenger')
				{
					$.Gomag.setCookie(i, 1, defaultCookieTimeOneDay);
				}
				else
				{
					setted = i;
				}
			})
			return setted;
		},
		openPopup : function(options, selector){
			options = options ? options : {};
			if(selector !== undefined){
				options['content'] = $(selector).html();
			}
			$.fancybox(options);
		},

		loadWidgets : function(){
			if(!$('script#__gomagWidget').length && $.Gomag.widgetUrl){
				var get = this.setWidgetEnviroment();
				var script		=	document.createElement('script');
				script.type		=	'text/javascript';
				script.id		=	'__gomagWidget';
				script.async	=	true;
				script.src		=	$.Gomag.widgetUrl+'?'+(get.join('&'));
				document.body.appendChild(script);

			}
		},
		setWidget : function(key, type, element, data){

			if(widgets[type] === undefined){
				widgets[type] = {};
			}

			widgets[type][key] = {'key': key, 'type': type, 'element':element, 'data':data};

		},

		changeComponent: function(url, selectors, beforeAjax, afterAjax){
			jQuery.isFunction(
							beforeAjax)
							?
							beforeAjax()
							:
							''
				;
			$.get(url, {}, function(data){
				if(selectors == ''){
					return false;
				} else if(jQuery.type(selectors) == 'object'){
					$.each(selectors, function(selector, dataKey){
						if(data[dataKey] != undefined){
							$(selector).html(data[dataKey]);
						}
					});
					jQuery.isFunction(
							afterAjax)
							?
							afterAjax()
							:
							''
						;
				} else if(jQuery.type(selectors) == 'string'){

				}
			}, 'json');

		},
		triggerLoadWidgetKey : function(type, key){

			v = $.Gomag.getWidgets(type, key);

			options = {
					maxWidth: v.data.popupWidth !== undefined && parseInt(v.data.popupWidth) > 0 ? v.data.popupWidth+'px' : '640px',
					maxHeight: v.data.popupHeight !== undefined && parseInt(v.data.popupHeight) > 0 ? v.data.popupHeight+'px' : '500px',
					closeBtn: type == 'popup:onload' ? false : true,
					overlayShow: true,
					overlayOpacity: 0.3,
					closeClick: false,
					padding: 0,
					transitionIn: 'none',
					transitionOut: 'none',
					type: 'inline',
					content : v.element,
					helpers: {
						overlay: {
									closeClick: type == 'popup:onload' ? false : true,
									locked : false
								} //Disable click outside event
					}
				};
				if(v.data.popupWidth !== undefined && parseInt(v.data.popupWidth) > 0 || v.data.popupHeight !== undefined && parseInt(v.data.popupHeight) > 0){
					options['fitToView'] = true;
					options['autoSize'] = false;
				} else {
					options['fitToView'] = true;
					options['autoSize'] = true;
				}

				$.Gomag.openPopup(options);

		},
		addWidgetTrigger: function(){
			$('.__gomagWidget').each(function(){
				var element = $(this);

				var condition = $(this).attr('data-condition');

				var response =jQuery.parseJSON(condition);

				if(response){

					var widgetType = $(this).attr('data-popup');

					widgetsList = $.Gomag.getWidgets(widgetType);

					if(widgetsList !== false){
						$.each(widgetsList, function(i, v){
							var data = v.data;
							var found = true;
							var checkValues = {};

							$.each(response, function(dataKey, dataValue){
								if(data[dataKey] === undefined){
									return true;
								}

								if(dataKey == 'displayCategories' && data['displayLocation'] == ''){
									data['displayCategories'] = dataValue;
								}
								if(typeof data[dataKey] != 'object'){
									//checkValues[dataKey] = [{dataKey, data[dataKey]}];
								} else {
									checkValues[dataKey] = data[dataKey];
								}


							})

							$.each(checkValues, function(index, value){

								if(response[index] === undefined){
									found = false;

								}

								var toCheck = typeof response[index] == 'object' ? response[index] : [response[index]];
								var toCheckValues = typeof value == 'object' ? value : [value];

								if(found){
									var matched = $(toCheck).filter(toCheckValues);
									if(matched.length == 0){
										found = false;
									}
								}

							});

							if(found){

								element.html('<a href="javascript:void(0)" style="'+(data['confirmColor'] !== undefined && data['confirmColor'] ? 'color: '+data['confirmColor']+' !important;' : '')+(data['confirmBackground'] !== undefined && data['confirmBackground'] ? 'background: '+data['confirmBackground']+' !important;' : '')+'" class="informationWidget" onClick="$.Gomag.triggerLoadWidgetKey(\''+widgetType+'\',\''+i+'\')">'+(data['confirmText'] ? data['confirmText'] : 'Informatii')+'</a>');
								return false;
							}
						})
					}
				}
			})
		},
		productChangeVersion: function(data)
		{
			
			$.get($.Gomag.ajaxLoadProductDetails, {product:data.version}, function(response){
				$($.Gomag.config.detailsProductPackageBox).remove();
				if(response.preview) {
					$($.Gomag.config.detailsProductRowBox).html(response.preview);
					
					$('#product-page').find('.container-h').addClass($.Gomag.config.detailsProductBoxClassNamePrefix+data.version);
					$('#product-page').find('.container-h').removeClass($.Gomag.config.detailsProductBoxClassNamePrefix+data.product);
					$('#product-page').find('.'+$.Gomag.config.detailsProductBoxClassNamePrefix+data.version).attr("data-product-id", data.version);
					
				}

				if(response.packages) {
					$('#product-page').find('.product-top .'+$.Gomag.config.detailsProductBoxClassNamePrefix+data.version).after(response.packages);
				}
				
				$.Gomag.trigger('Product/Details/After/Ajax/Load');
				$.Gomag.buildProductsForDataRequest();
				
			},'json');
			
			
		},
		init: function(environment){
			
			$.Gomag.environment = environment ? environment.env : $.Gomag.environment;
			$.Gomag.widgetUrl = environment ? environment.widgetUrl : ($.Gomag.widgetUrl ? $.Gomag.widgetUrl : '');
			$.Gomag.cartSummaryUrl = environment ? environment.cartSummaryUrl : ($.Gomag.cartSummaryUrl ? $.Gomag.cartSummaryUrl : '');
			$.Gomag.ajaxLoadUserDataUrl = environment ? environment.ajaxLoadUserDataUrl : ($.Gomag.ajaxLoadUserDataUrl ? $.Gomag.ajaxLoadUserDataUrl : '');
			$.Gomag.ajaxLoadUserProductsUrl = environment ? environment.ajaxLoadUserProductsUrl : ($.Gomag.ajaxLoadUserProductsUrl ? $.Gomag.ajaxLoadUserProductsUrl : '');
			$.Gomag.ajaxLoadProductDetails = environment ? environment.ajaxLoadProductDetails : ($.Gomag.ajaxLoadProductDetails ? $.Gomag.ajaxLoadProductDetails : '');
			$.Gomag.config = $GomagConfig;
			$.Gomag.loadWidgets();
			
			var scrollTriggered = false;
			$(window).scroll(function(){
				var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
				var scrollPercentFloor = parseInt(scrollPercent / 10)*10;
				if(50 <= scrollPercentFloor && !scrollTriggered){
					scrollTriggered = true;
					$.Gomag.triggerLoadWidget('popup:onscroll:50');
				}
			});

			$(document).on('click', $.Gomag.config.checkoutSubmitButton, function(){
				if(!$($.Gomag.config.userAgreementLabel).find('input:checkbox').is(':checked')){
					if($($.Gomag.config.userAgreementLabel).length){
						$('html, body').animate({
							scrollTop: $($.Gomag.config.userAgreementLabel).offset().top
						}, 1000);
					}
					$($.Gomag.config.userAgreementLabel).addClass($.Gomag.config.userAgreementLabelErrorClass);
				}
				else 
				{
					if(!$(this).hasClass($.Gomag.config.checkoutSubmitButtonDisabled)){
						
						$.Gomag.trigger('Order/Checkout/Submit', {}, function (){
							$($.Gomag.config.checkoutForm).submit()
						});
						
					}
				}
			})
			$(document).mouseleave(function () {
				$.Gomag.triggerLoadWidget('popup:onexit');
			});

			$.each(dataAppend, function(i, v){

				$.Gomag.append(v.dataBlock, v.value);
			})
			$.each(dataInside, function(i, v){
				$.Gomag.inside(v.dataBlock, v.value);
			})
			$.each(dataPrepend, function(i, v){
				$.Gomag.prepend(v.dataBlock, v.value);
			})
			$.each(dataRun, function(i, v){

				jQuery.isFunction(
							window[v])
							?
							window[v]()
							:
							v()
				;

			})
			$.each(dataProductAjax, function(i, v){
				$.Gomag.productAjax(v.dataUrl, v.dataSelector, v.dataAttr, v.dataFunction);
			});
			
			$('.listImage').each(function(){
				if($(this).attr('data-image')){

					$(this).attr('src', $(this).attr('data-image')).removeClass('hidden');
					$(this).attr('data-image', '');
				}
			});
			
			/*build product request*/
			$.Gomag.buildProductsForDataRequest();
			
		}
	}
})(jQuery);
