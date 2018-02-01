(function($){
  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(e){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
    e.stopPropagation();
    return false;
  });

  $('.search-form-input').on('keyup',function(){
    var val = $('.search-form-input').val();
    if($.trim(val) != ''){
      searchSend($.trim(val));
    }
  })

  // var blurINputSearch = function(){
  //   $('.search-form-input').off('blur').on('blur', function(){
  //     startSearchAnim();
  //     $searchWrap.removeClass('on');
  //     stopSearchAnim();
  //   });
  // }

  $(document).on('click',function(e){
    if( !$(e.target).parents('#search-form-wrap').length ){
        startSearchAnim();
        $searchWrap.removeClass('on');
        stopSearchAnim();
    }
  })

  // blurINputSearch();


  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = url,
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();
    var sUrl = window.location.href;
    var sTitle = $('title').html();
    var $img = $('.article-entry img');
    var sPic = $img.length ? $('.article-entry img').eq(0).attr('src') : '';
    if ((sPic !== '') && !/^(http:|https:)?\/\//.test(sPic)) {
      sPic = window.location.origin + sPic
    }

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="http://v.t.sina.com.cn/share/share.php?url=' + encodedUrl + '&title='+sTitle+'&pic='+sPic+'" class="article-share-weibo" target="_blank" title="微博"></a>',
            '<a href="http://s.jiathis.com/qrcode.php?url='  + encodedUrl + '&title='+sTitle+'" class="article-share-wechat" target="_blank" title="微信"></a>',
            '<a href="http://connect.qq.com/widget/shareqq/index.html?url=' + encodedUrl + '&title='+sTitle+'&source='+sTitle+'" class="article-share-qq" target="_blank" title="QQ"></a>',
            '<a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='  + encodedUrl + '&title='+sTitle+'&pics='+sPic+'&summary='+sTitle+'" class="article-share-qqzone" target="_blank" title="QQ空间"></a>',
            '<br/><a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });

  var client = algoliasearch("RUT91YQZ5S", '6fdc28d43bf3d88bad9315ccf5a1a834');
  var index = client.initIndex('devsai-blog');

  var searchSend = function(val){
    index.search(val, searchCallback);
  }

  function searchCallback(err, content) {
      if (err) {
          console.error(err);
          return;
      }
      if(!$('.search-result-container').length ){
        $('#search-form-wrap').append('<div class="search-result-container" unselectable="on"><ul unselectable="on"></ul></div>')
      }
      var list = content.hits;
      var liArray = [];
      for(var i = 0; i < list.length; i++){
        var row = list[i];
        liArray.push('<li unselectable="on"><a href="/'+row.path+'" unselectable="on">Blog: '+row.title+'</a> </li>')
      }
      var t = liArray.length ? liArray.join('') : '未找到搜索结果';
      $('.search-result-container').find('ul').html(t);
      $('.search-result-container').show();
  } 

})(jQuery);

        

