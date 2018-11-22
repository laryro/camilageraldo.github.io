var navul = document.getElementsByClassName('navul');
var navul2 = document.getElementsByClassName('navul2');
var navTitleDiv = document.getElementsByClassName('nav-title-div');
var navli = document.getElementsByClassName('navli');

window.addEventListener('resize', function(){
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if(width >= 600) {
    console.log('test');
    navul2[0].classList.add('navul2-hide');
  }  
}, true);

navTitleDiv[0].onclick = function toggle_small() {
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if(width < 600) {
      navul[0].classList.toggle('navul-hide'); 
  }
}

navli[1].onclick = function toggle_sub_small() {
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if(width < 600) {
    navul2[0].classList.toggle('navul2-hide');
  }
}

navul2[0].onmouseover = function highlight_item() {  
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if(width >= 600) {
    navli[1].style.background = "";
  }
}

navul2[0].onmouseout = function unhighlight_item() {
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if(width >= 600) {
    navli[1].style.background = "#29353B";
  }  
}

navli[1].onmouseover = function highlight_item() {  
  navli[1].style.background = "#555353";
}

navli[1].onmouseout = function unhighlight_item() {
  navli[1].style.background = "#29353B";
}

$ ( ' img [usemap] ' ). rwdImageMaps ();

// Catch all clicks on a link with the class 'link'
$('.link').click(function(e) {
    // Stop the link being followed:
    e.preventDefault();
    // Get the div to be shown:
    var content = $(this).attr('rel');
    // Remove any active classes:
    $('.active').removeClass('active');
    // Add the 'active' class to this link:
    $(this).addClass('active');
    // Hide all the content:
    $('.contenthiden').hide();
    // Show the requested content:
    $('#' + content).show();
});

var _hidediv = null;
function showdiv(id) {
    if(_hidediv)
        _hidediv();
    var div = document.getElementById(id);
    div.style.display = 'block';
    _hidediv = function () { div.style.display = 'none'; };
}


//===========================//



//=============//

// change animate slide to transition only
// Next, ...

$(window).on('load', function() {
  /**
  * Namespace
  */
  var Namespace = Namespace || {};
  Namespace.constants = {
    ACTIVE_CLASS: 'active'
  };

  /**
  * [Carousel カルーセルクラス]
  * @class
  */
  Namespace.Carousel = function() {
    var self = this;
    self.$carousel = $('.js-carousel');
    self.$carouselBody = $('.js-carousel-body');
    self.$carouselIndicatorlist = $('.js-carousel-indicatorlist');

    self.carouselItemLength = $('.js-carousel-item').length;
    self.carouselBodyWidth = $('.js-carousel-item').outerWidth() * self.carouselItemLength;
    
    self.currentPos = 1;
    // 初期処理
    self.init();
  }

  Namespace.Carousel.prototype = {
    init: function() {
      var self = this;
      self.$carouselBody.css('width', self.carouselBodyWidth + 'px');
    },
    getCurrentPos: function() {
      return this.currentPos;
    },
    updateCurrentPos: function(targetItemNum) {
      var self = this;
      if (targetItemNum === self.carouselItemLength + 1) {
        // 最後尾でnextをクリック時、カレントポジションを初期化
        self.currentPos = 1;
      } else if (targetItemNum === 0) {
        // 初期位置でprevをクリック時、カレントポジションを最後尾ナンバーにする
        self.currentPos = self.carouselItemLength;
      } else {
        self.currentPos = targetItemNum;
      }
    },
    /*
    * Next
    */
    next: function (touchMovedRange) {
      var self = this;
      self.currentPos = self.currentPos + touchMovedRange;
      carousel.changeItem();
    },
    /*
    * Prev
    */
    prev: function (touchMovedRange) {
      var self = this;
      self.currentPos = self.currentPos - touchMovedRange;
      carousel.changeItem();
    },
    /*
    * 移動
    */
    changeItem: function (targetItemNum) {
      var self = this;
      // console.log('');
      // console.log('--- move ---');
      // console.log('[DEBUG] targetItemNum: ', targetItemNum);
      // 位置更新
      self.updateCurrentPos(targetItemNum);
      // 変更
      var range = 370 * (self.currentPos -1)
      self.$carouselBody.css({
        'transform': 'translateX(' + -range + 'px)',
      }).bind('webkitTransitionEnd', function() {
         console.log('>>> transition end');
      });
      // インジケータの表示同期
      self.syncIndicator();
    },
    /**
    * インジケーターのアクティブ表示制御
    */
    syncIndicator: function() {
      var self = this;
      // 表示切り替え
      self.$carouselIndicatorlist
        // アクティブクラスを削除する
        .find('.js-carousel-indicator')
          .removeClass(Namespace.constants.ACTIVE_CLASS)
        .end()
        // 現在地の位置と一致するサムネイルにアクティブクラスを付与する
        .find('li')
          .eq(self.currentPos - 1)
          .find('.js-carousel-indicator')
          .addClass(Namespace.constants.ACTIVE_CLASS);
    }
  }

  /*
  * コントローラー
  */
  var carousel = new Namespace.Carousel();

  // ナビ
  $('.js-carousel-nav-prev').on('click', function() {
    carousel.changeItem(carousel.getCurrentPos() - 1);
  });
  $('.js-carousel-nav-next').on('click', function() {
    carousel.changeItem(carousel.getCurrentPos() + 1);
  });

  // インジケータ
  $('.js-carousel-indicator').on('click', function() {
    console.log('ssss');
    var targetItemNum = $(this).data('id');
    carousel.changeItem(targetItemNum);
  });

});


 window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;--t>=0&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o}),(function(){for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,n){var o=(new Date).getTime(),i=Math.max(0,16-(o-e)),a=window.setTimeout((function(){t(o+i)}),i);return e=o+i,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})})(),(function(e,t){"function"==typeof define&&define.amd?define([],(function(){return t(e)})):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e)})("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,(function(e){"use strict";var t="querySelector"in document&&"addEventListener"in e&&"requestAnimationFrame"in e&&"closest"in e.Element.prototype,n={ignore:"[data-scroll-ignore]",header:null,speed:500,offset:0,easing:"easeInOutCubic",customEasing:null,before:function(){},after:function(){}},o=function(){for(var e={},t=0,n=arguments.length;t<n;t++){var o=arguments[t];!(function(t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(o)}return e},i=function(t){return parseInt(e.getComputedStyle(t).height,10)},a=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,i=-1,a="",r=n.charCodeAt(0);++i<o;){if(0===(t=n.charCodeAt(i)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");t>=1&&t<=31||127==t||0===i&&t>=48&&t<=57||1===i&&t>=48&&t<=57&&45===r?a+="\\"+t.toString(16)+" ":a+=t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?n.charAt(i):"\\"+n.charAt(i)}return"#"+a},r=function(e,t){var n;return"easeInQuad"===e.easing&&(n=t*t),"easeOutQuad"===e.easing&&(n=t*(2-t)),"easeInOutQuad"===e.easing&&(n=t<.5?2*t*t:(4-2*t)*t-1),"easeInCubic"===e.easing&&(n=t*t*t),"easeOutCubic"===e.easing&&(n=--t*t*t+1),"easeInOutCubic"===e.easing&&(n=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e.easing&&(n=t*t*t*t),"easeOutQuart"===e.easing&&(n=1- --t*t*t*t),"easeInOutQuart"===e.easing&&(n=t<.5?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e.easing&&(n=t*t*t*t*t),"easeOutQuint"===e.easing&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e.easing&&(n=t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t),e.customEasing&&(n=e.customEasing(t)),n||t},u=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},c=function(e,t,n){var o=0;if(e.offsetParent)do{o+=e.offsetTop,e=e.offsetParent}while(e);return o=Math.max(o-t-n,0)},l=function(e){return e?i(e)+e.offsetTop:0},s=function(t,n,o){o||(t.focus(),document.activeElement.id!==t.id&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,n))},d=function(t){return!!("matchMedia"in e&&e.matchMedia("(prefers-reduced-motion)").matches)};return function(i,f){var m,h,g,w,p,v,y,b={};b.cancelScroll=function(){cancelAnimationFrame(y)},b.animateScroll=function(t,i,a){var d=o(m||n,a||{}),f="[object Number]"===Object.prototype.toString.call(t),h=f||!t.tagName?null:t;if(f||h){var g=e.pageYOffset;d.header&&!w&&(w=document.querySelector(d.header)),p||(p=l(w));var v,y,A,E=f?t:c(h,p,parseInt("function"==typeof d.offset?d.offset():d.offset,10)),S=E-g,I=u(),q=0,F=function(n,o){var a=e.pageYOffset;if(n==o||a==o||(g<o&&e.innerHeight+a)>=I)return b.cancelScroll(),s(t,o,f),d.after(t,i),v=null,!0},O=function(t){v||(v=t),q+=t-v,y=q/parseInt(d.speed,10),y=y>1?1:y,A=g+S*r(d,y),e.scrollTo(0,Math.floor(A)),F(A,E)||(e.requestAnimationFrame(O),v=t)};0===e.pageYOffset&&e.scrollTo(0,0),d.before(t,i),b.cancelScroll(),e.requestAnimationFrame(O)}};var A=function(e){h&&(h.id=h.getAttribute("data-scroll-id"),b.animateScroll(h,g),h=null,g=null)},E=function(t){if(!d()&&0===t.button&&!t.metaKey&&!t.ctrlKey&&(g=t.target.closest(i))&&"a"===g.tagName.toLowerCase()&&!t.target.closest(m.ignore)&&g.hostname===e.location.hostname&&g.pathname===e.location.pathname&&/#/.test(g.href)){var n;try{n=a(decodeURIComponent(g.hash))}catch(e){n=a(g.hash)}if("#"===n){t.preventDefault(),h=document.body;var o=h.id?h.id:"smooth-scroll-top";return h.setAttribute("data-scroll-id",o),h.id="",void(e.location.hash.substring(1)===o?A():e.location.hash=o)}h=document.querySelector(n),h&&(h.setAttribute("data-scroll-id",h.id),h.id="",g.hash===e.location.hash&&(t.preventDefault(),A()))}},S=function(e){v||(v=setTimeout((function(){v=null,p=l(w)}),66))};return b.destroy=function(){m&&(document.removeEventListener("click",E,!1),e.removeEventListener("resize",S,!1),b.cancelScroll(),m=null,h=null,g=null,w=null,p=null,v=null,y=null)},b.init=function(i){t&&(b.destroy(),m=o(n,i||{}),w=m.header?document.querySelector(m.header):null,p=l(w),document.addEventListener("click",E,!1),e.addEventListener("hashchange",A,!1),w&&e.addEventListener("resize",S,!1))},b.init(f),b}}));

 var scroll = new SmoothScroll('a[href*="#"]');


 $(window).on('load', function() {
   /**
   * Namespace
   */
   var Namespace = Namespace || {};
   Namespace.constants = {
     ACTIVE_CLASS: 'active'
   };

   /**
   * [Carousel カルーセルクラス]
   * @class
   */
   Namespace.Carousel = function() {
     var self = this;
     self.$carousel = $('.js-carousell');
     self.$carouselBody = $('.js-carousell-body');
     self.$carouselIndicatorlist = $('.js-carousell-indicatorlist');

     self.carouselItemLength = $('.js-carousell-item').length;
     self.carouselBodyWidth = $('.js-carousell-item').outerWidth() * self.carouselItemLength;
     
     self.currentPos = 1;
     // 初期処理
     self.init();
   }

   Namespace.Carousel.prototype = {
     init: function() {
       var self = this;
       self.$carouselBody.css('width', self.carouselBodyWidth + 'px');
     },
     getCurrentPos: function() {
       return this.currentPos;
     },
     updateCurrentPos: function(targetItemNum) {
       var self = this;
       if (targetItemNum === self.carouselItemLength + 1) {
         // 最後尾でnextをクリック時、カレントポジションを初期化
         self.currentPos = 1;
       } else if (targetItemNum === 0) {
         // 初期位置でprevをクリック時、カレントポジションを最後尾ナンバーにする
         self.currentPos = self.carouselItemLength;
       } else {
         self.currentPos = targetItemNum;
       }
     },
     /*
     * Next
     */
     next: function (touchMovedRange) {
       var self = this;
       self.currentPos = self.currentPos + touchMovedRange;
       carousel.changeItem();
     },
     /*
     * Prev
     */
     prev: function (touchMovedRange) {
       var self = this;
       self.currentPos = self.currentPos - touchMovedRange;
       carousel.changeItem();
     },
     /*
     * 移動
     */
     changeItem: function (targetItemNum) {
       var self = this;
       // console.log('');
       // console.log('--- move ---');
       // console.log('[DEBUG] targetItemNum: ', targetItemNum);
       // 位置更新
       self.updateCurrentPos(targetItemNum);
       // 変更
       var range = 370 * (self.currentPos -1)
       self.$carouselBody.css({
         'transform': 'translateX(' + -range + 'px)',
       }).bind('webkitTransitionEnd', function() {
          console.log('>>> transition end');
       });
       // インジケータの表示同期
       self.syncIndicator();
     },
     /**
     * インジケーターのアクティブ表示制御
     */
     syncIndicator: function() {
       var self = this;
       // 表示切り替え
       self.$carouselIndicatorlist
         // アクティブクラスを削除する
         .find('.js-carousell-indicator')
           .removeClass(Namespace.constants.ACTIVE_CLASS)
         .end()
         // 現在地の位置と一致するサムネイルにアクティブクラスを付与する
         .find('li')
           .eq(self.currentPos - 1)
           .find('.js-carousell-indicator')
           .addClass(Namespace.constants.ACTIVE_CLASS);
     }
   }

   /*
   * コントローラー
   */
   var carousel = new Namespace.Carousel();

   // ナビ
   $('.js-carousell-nav-prev').on('click', function() {
     carousel.changeItem(carousel.getCurrentPos() - 1);
   });
   $('.js-carousell-nav-next').on('click', function() {
     carousel.changeItem(carousel.getCurrentPos() + 1);
   });

   // インジケータ
   $('.js-carousell-indicator').on('click', function() {
     console.log('sssss');
     var targetItemNum = $(this).data('id');
     carousel.changeItem(targetItemNum);
   });

 });
//=============================/

 $(window).on('load', function() {
   /**
   * Namespace
   */
   var Namespace = Namespace || {};
   Namespace.constants = {
     ACTIVE_CLASS: 'active'
   };

   /**
   * [Carousel カルーセルクラス]
   * @class
   */
   Namespace.Carousel = function() {
     var self = this;
     self.$carousel = $('.js-carouselll');
     self.$carouselBody = $('.js-carouselll-body');
     self.$carouselIndicatorlist = $('.js-carouselll-indicatorlist');

     self.carouselItemLength = $('.js-carouselll-item').length;
     self.carouselBodyWidth = $('.js-carouselll-item').outerWidth() * self.carouselItemLength;
     
     self.currentPos = 1;
     // 初期処理
     self.init();
   }

   Namespace.Carousel.prototype = {
     init: function() {
       var self = this;
       self.$carouselBody.css('width', self.carouselBodyWidth + 'px');
     },
     getCurrentPos: function() {
       return this.currentPos;
     },
     updateCurrentPos: function(targetItemNum) {
       var self = this;
       if (targetItemNum === self.carouselItemLength + 1) {
         // 最後尾でnextをクリック時、カレントポジションを初期化
         self.currentPos = 1;
       } else if (targetItemNum === 0) {
         // 初期位置でprevをクリック時、カレントポジションを最後尾ナンバーにする
         self.currentPos = self.carouselItemLength;
       } else {
         self.currentPos = targetItemNum;
       }
     },
     /*
     * Next
     */
     next: function (touchMovedRange) {
       var self = this;
       self.currentPos = self.currentPos + touchMovedRange;
       carousel.changeItem();
     },
     /*
     * Prev
     */
     prev: function (touchMovedRange) {
       var self = this;
       self.currentPos = self.currentPos - touchMovedRange;
       carousel.changeItem();
     },
     /*
     * 移動
     */
     changeItem: function (targetItemNum) {
       var self = this;
       // console.log('');
       // console.log('--- move ---');
       // console.log('[DEBUG] targetItemNum: ', targetItemNum);
       // 位置更新
       self.updateCurrentPos(targetItemNum);
       // 変更
       var range = 370 * (self.currentPos -1)
       self.$carouselBody.css({
         'transform': 'translateX(' + -range + 'px)',
       }).bind('webkitTransitionEnd', function() {
          console.log('>>> transition end');
       });
       // インジケータの表示同期
       self.syncIndicator();
     },
     /**
     * インジケーターのアクティブ表示制御
     */
     syncIndicator: function() {
       var self = this;
       // 表示切り替え
       self.$carouselIndicatorlist
         // アクティブクラスを削除する
         .find('.js-carouselll-indicator')
           .removeClass(Namespace.constants.ACTIVE_CLASS)
         .end()
         // 現在地の位置と一致するサムネイルにアクティブクラスを付与する
         .find('li')
           .eq(self.currentPos - 1)
           .find('.js-carouselll-indicator')
           .addClass(Namespace.constants.ACTIVE_CLASS);
     }
   }

   /*
   * コントローラー
   */
   var carousel = new Namespace.Carousel();

   // ナビ
   $('.js-carouselll-nav-prev').on('click', function() {
     carousel.changeItem(carousel.getCurrentPos() - 1);
   });
   $('.js-carouselll-nav-next').on('click', function() {
     carousel.changeItem(carousel.getCurrentPos() + 1);
   });

   // インジケータ
   $('.js-carouselll-indicator').on('click', function() {
     console.log('sssssss');
     var targetItemNum = $(this).data('id');
     carousel.changeItem(targetItemNum);
   });

 });
