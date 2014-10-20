var sdialog = (function() {
	
	var scrollTop;
	
	var sdialogArray = [];

	//SimpleDialog default setting
	var defaults = {
		bgClick : true,
		type : 'message'
	};
	
	//SimpleDialog constructor
	function SimpleDialog(msg) {
		
		this.callReturn = true;

		this.setting = {};
		
		for (var attr in defaults) {
			if (defaults.hasOwnProperty(attr)){
				this.setting[attr] = defaults[attr];
			}
		}

		switch (arguments.length) {
			case 3:
				//message, options, callback function           
				if (typeof arguments[2] === 'function') {
					this.callback = arguments[2];
				} else {
					throw 'Error!';
				}

			case 2:
				//message, options
				for (var attr in arguments[1]) {
					if (arguments[1].hasOwnProperty(attr)){
						this.setting[attr] = arguments[1][attr];
					}
				}
				break;
		}

		this.buildDOM(arguments[0]);
		this.addEventListeners();
		
		var oldClass = document.body.getAttribute('class');
		document.body.setAttribute('class', oldClass + ' sdialog-scrollLock');
	}
	

	//SimpleDialog initialize DOM
	SimpleDialog.prototype.buildDOM = function(msg) {

		this.msgText = msg;
		if (this.msgText == null) {
			this.msgText = '';
		}

		this.overlay = document.createElement('div');
		this.bodys = document.createElement('div');
		this.content = document.createElement('p');
		this.textNode = document.createTextNode(this.msgText);

		this.closeBtn = document.createElement('div');
		this.confirmBtn = document.createElement('div');
		this.confirmText = document.createTextNode("확인");
		this.confirmBtn.appendChild(this.confirmText);

		this.overlay.setAttribute('class', 'sdialog-overlay');
		this.bodys.setAttribute('class', 'sdialog-body');
		this.closeBtn.setAttribute('class', 'sdialog-close');
		this.confirmBtn.setAttribute('class', 'sdialog-confirmBtn');

		this.content.appendChild(this.textNode);

		this.bodys.appendChild(this.content);
		this.bodys.appendChild(this.closeBtn);
		this.bodys.appendChild(this.confirmBtn);

		if (this.setting['type'] == 'confirm') {
			this.cancelBtn = document.createElement('div');
			this.cancelText = document.createTextNode("취소");
			this.cancelBtn.appendChild(this.cancelText);

			this.cancelBtn.setAttribute('class', 'sdialog-cancelBtn');
			this.bodys.appendChild(this.cancelBtn);
		}

		this.overlay.appendChild(this.bodys);

		document.body.appendChild(this.overlay);
		this.overlay.style.display = 'block';

		document.body.setAttribute('class', 'sdialog-active');
		document.body.style.paddingRight = getScrollbarWidth() + 'px';

		scrollTop = document.documentElement.scrollTop;
	}

	SimpleDialog.prototype.close = function() {
		this.overlay.style.display = 'none';
		document.body.removeChild(this.overlay);
		document.body.removeAttribute('class');
		document.body.removeAttribute('style');
		
		//document.documentElement.scrollTop = scrollTop + 'px';
		//sdialogArray.pop();
	}

	SimpleDialog.prototype.addEventListeners = function() {
		var that = this;

		this.closeBtn.onclick = function(e) {
			e.preventDefault();
			that.close();
			if (that.setting['type'] == 'confirm') {
				that.result = false;
			}
		}

		if (this.setting.bgClick) {
			this.overlay.onclick = function(e) {
				e.preventDefault();
				that.close();
			}

			this.bodys.onclick = function(e) {
				var evt = e || window.event;
				if (evt.stopPropagation) {
					evt.stopPropagation(); // W3C 표준
				} else {
					evt.cancelBubble = true; // 인터넷 익스플로러 방식
				}
			}
		}

		this.confirmBtn.onclick = function() {
			that.close();
		}

		if (this.setting['type'] == 'confirm') {
			this.confirmBtn.onclick = function() {
				that.result = true;
				that.close();
				that.callback(that.result);
			}

			this.cancelBtn.onclick = function() {
				that.result = false;
				that.close();
				that.callback(that.result);
			}
		}
	}

	/**
	 * Get a scrollbar width
	 */
	var getScrollbarWidth = function() {
		//브라우저 크기
		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var h = window.innerHeight || document.documentElement.clientHeight	|| document.body.clientHeight;

		if (document.body.innerHeight <= h) {
			//console.log('페이지 맞춤');
			return 0;
		}

		var outer = document.createElement("div");
		outer.style.visibility = "hidden";
		outer.style.width = "100px";
		document.body.appendChild(outer);

		var widthNoScroll = outer.offsetWidth;
		// force scrollbars
		outer.style.overflow = "scroll";

		// add innerdiv
		var inner = document.createElement("div");
		inner.style.width = "100%";
		outer.appendChild(inner);

		var widthWithScroll = inner.offsetWidth;

		// remove divs
		outer.parentNode.removeChild(outer);

		return widthNoScroll - widthWithScroll;
	};

	
	return function(){
		switch (arguments.length) {
			case 1:
				new SimpleDialog(arguments[0]);
				break;

			case 2:
				new SimpleDialog(arguments[0], arguments[1]);
				break;

			case 3:
				new SimpleDialog(arguments[0], arguments[1], arguments[2]);
				break;
		}
	}
	
})();