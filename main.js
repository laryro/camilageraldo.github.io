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

var s = skrollr.init({
  smoothScrolling: false,
  forceHeight: false,
  mobileDeceleration: 0.004
});