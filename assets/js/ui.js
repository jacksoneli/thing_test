$(function () {
  /***********************공통기능***********************/
  //페이지가 나타나는 애니메이션 : .js_page_ani 클릭시 애니메이션이 될 페이지 영역에 .page_ani_01를 붙여줌
  $(".js_page_ani").bind("click", function () {
    $('.page_ani_wrap').addClass("page_ani_01")
  })

   //더해질 숫자로 카운트하는 기능(반드시 말줄임표 기능의 스크립트보다 먼저 실행돼야 함)
  $(".js_plus_count").each(function () {

    //카운트 기능
    let $txt = $(this).text()
    let regex = /[^0-9]/g
    let num = parseInt($txt.replace(regex, ""))
    let plus_num = 1000 //더해질 숫자
    let total = num + plus_num
    let time = 2000 / plus_num //카운트 될 총 시간이 1초인 경우 1000을 넣는다
    counterFn()
    function counterFn(){
      id0 = setInterval(count0Fn, time)
      function count0Fn(){
        num += 10 //카운트시에 계속 더해질 숫자
        cnt = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") //천단위씩 콤마 처리
        if(num > total){
          clearInterval(id0)
        }else{
          $('.js_plus_count').text(cnt)
          ellipsis_Fn()
        }
      }
    }

    //카운트되기 전에 미리 숫자 공간 확보
    $(this).text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    ellipsis_Fn()
    let $my_box = $('.home_header .my_box')
    let box_width = $my_box.outerWidth()
    $my_box.css({'width' : box_width + 'px'})
    let $my_point = $('.home_header .point')
    let my_point_width = $my_point.outerWidth()
    $my_point.css({'width' : my_point_width + 'px'})
  })
  
  //십만단위 초과인 경우 말줄임표 나오는 스크립트(홈 헤더 등)
  ellipsis_Fn()
  function ellipsis_Fn(){
    $(".js_ellipsis_100000").each(function () {
      const $num = $(this).text()
      const $length = $num.length
      if($length > 7){
        new_num = $num.substr(0, 6)
        $(this).text(new_num + '...')
      }
    })
  }

  //일정 시간마다 반복해서 on을 붙여주는 기능(척도2 시작하기 등)
  $(".js_time_on").each(function () {
    let time = 1800 //반복 시간
    let $box = $('.js_time_on article')
    let total = $box.length
    let i = 1
    onFn()
    function onFn(){
      setInterval(count0Fn, time)
      function count0Fn(){
        $box.removeClass('on')
        $box.eq(i).addClass('on')
        i ++
        if(i >= total){
          i = 0
        }
      }
    }
  })



 

  /************************각 페이지별 기능***********************/
  // 해당 영역의 사이즈 유지(척도2 설문 타입2)
  $('.js_size').each(function(){
    let $this = $(this)
    let width = $this.outerWidth()
    let height = $this.outerHeight()
    $this.css({'width' : width + 'px', 'height' : height + 'px'})
  })

  // 상자를 버리기 위한 하단의 빈공간 만들기와 삭제하기(척도2 설문 타입2)
  $(document).on("mouseleave", ".priority_wrap", function () {
    $('.priority_wrap').find('.blank').parent().html('<div class="inner draggable-source"></div>')
    $('.obj_wrap').append('<div class="draggable_box blank draggable-source"></div>')
    setTimeout(function() {
      $('.obj_wrap').find('.blank').hide();
    }, 500);
  })












  //클릭시 on 토글(체크박스 등)
  $(document).on("click", ".js_on", function () {
    $(this).toggleClass("on");
  });

  //탭기능(일반적인 탭)
  $(".js_tabs1 > li").bind("click", function () {
    var index = $(this).closest("li").index();
    $(".js_conts1").hide().eq(index).show();
    $(this).parent().find("li").removeClass("on");
    $(this).addClass("on");
  });

  //탭기능2(일반적인 탭)
  $(".js_tabs2 > li").bind("click", function () {
    var index = $(this).closest("li").index();
    $(".js_conts2").hide().eq(index).show();
    $(this).parent().find("li").removeClass("on");
    $(this).addClass("on");
  });

  //라디오기능
  $(document).on("click", ".js_radio > *", function () {
    $(this).siblings().removeClass("on");
    $(this).addClass("on");
  });

  //라디오기능2 (on된 것을 또 클릭하면 있던 on이 지워지는)
  $(document).on("click", ".js_radio2 li", function () {
    $(this).siblings("li").removeClass("on");
    if ($(this).hasClass("on")) {
      $(this).removeClass("on");
    } else {
      $(this).addClass("on");
    }
  });

  //라디오기능3(일반 라디오 기능인데 js_radio3의 자식 태그 중 클래스 js_r3 갖는 태그에만 적용)
  $(document).on("click", ".js_radio3 > .js_r3", function () {
    $(this).siblings(".js_radio3 > .js_r3").removeClass("on");
    $(this).addClass("on");
  });

  //클릭시 자신의 부모태그를 삭제
  $(document).on("click", ".js_del_parent", function () {
    $(this).parent().hide();
  });

  // 레이어 펼치기 토글
  $(document).on("click", ".js_toggle_layer1", function () {
    $(".js_layer1").slideToggle(100);
  });

  //아코디언 리스트 기능
  $(".js_accordion dt").click(function () {
    if (!$(this).parent().hasClass("on")) {
      $(this).parent().parent().find("dl").removeClass("on");
      $(this).parent().addClass("on");
      $(this).parent().parent().find("dd").slideUp(0);
      $(this).siblings("dd").slideDown(0);
    } else {
      $(this).parent().removeClass("on");
      $(this).siblings("dd").slideUp(0);
    }
  });


  //커스텀 스크롤바
  $(".js_scroll_bar").overlayScrollbars({});

  window.onload = function () {
    // 스크롤했을 때 레이어가 상단 10px에 고정되는(fixed) 기능
    $(".js_fix1").each(function () {
      var $win = $(window),
        $layer = $(this),
        offset_px = $layer.offset().top;
      var this_h = $layer.outerHeight();

      $layer.parent().css({ height: this_h + "px" });

      $win.on("scroll", function () {
        var scroll_px = $win.scrollTop();
        if (offset_px < scroll_px + 10) {
          $layer.addClass("fix");
        } else {
          $layer.removeClass("fix");
        }
      });
    });
  };

  // 영상플레이어 영상시간 조절기능
  $(document).on("mousedown", ".js_move", function (event) {
    $(this).addClass("on");
    $("body,html").mousemove(function (event) {
      var $this = $(".js_move.on");
      var xx = $this.offset().left - $this.position().left;
      var pagex = event.pageX - xx;
      var contx = $this.parent(".red").innerWidth();
      $this.parent(".red").css("width", pagex);
    });

    $("body,html").mouseup(function (event) {
      $(this).off("mousemove");
      $(".js_move.on").removeClass("on");
    });
  });

  /***********************dim 없는 일반 팝업***********************/
  // 팝업 열고 닫기 1(dim 없음)
  $(".js_open_pop1").on("click", function () {
    $(".js_pop1").show();
  });
  $(".js_close_pop1").on("click", function () {
    $(".js_pop1").hide();
  });

  /***********************dim 있는 모달 팝업***********************/
  // 팝업 열고 닫기 2(dim 있음)
  $(".js_open_modalpop1").on("click", function () {
    $(".js_modalpop1").show();
    $(".dim").show();
  });
  $(".js_close_modalpop1").on("click", function () {
    $(".js_modalpop1").hide();
    $(".dim").hide();
  });

  /***********************hover 사용한 팝업***********************/
  // 상품상세 - 할인내역
  $(document).on("mouseenter", ".js_hover_pop1", function () {
    $(".js_hover_open1").show();
    if ($(this).hasClass("js_hover_pop1")) {
      $(this).addClass("on");
    }
  });
  $(document).on("mouseleave", ".js_hover_open1", function () {
    $(this).hide();
    $(".js_hover_pop1").removeClass("on");
  });
  $(document).on("click", ".js_hover_open1", function () {
    $(this).hide();
    $(".js_hover_pop1").removeClass("on");
  });

  /***********************화면 스크롤 값에 따라 팝업의 top 값을 맞춰주는 스크립트. 해당 팝업을 여는 버튼에 클래스 js_on_adjust_top을 넣고 해당 팝업에 js_adjust_top만 넣으면 작동함***********************/
  $(document).on("click", ".js_on_adjust_top", function () {
    var win_scroll = $(window).scrollTop() + 30;
    $(".js_adjust_top").css({ top: win_scroll + "px" });
  });

  /***********************팝업 열었을때 뒷배경이 스크롤되지 않게. 팝업을 여는 버튼에는 class js_screen_hold 넣고 닫는 버튼에는 class js_screen_hold를 넣는다. ***********************/
  $(document).on("click", ".js_screen_hold", function () {
    $("html").css("overflow", "hidden");
  });
  $(document).on("click", ".js_screen_release", function () {
    $("html").css("overflow", "auto");
  });

  /***********************좌우측 윙배너 2개***********************/
  //스크롤시 따라오는 윙배너
  var $contents = $("#contents"),
    $wing_wrap = $("#wing"); //윙배너 2개를 담고있는 div

  $(window).on("scroll", function () {
    var thisTop = $contents.offset().top;
    //최상단 배너 크기에 따라 변수값 달라지게
    $(document).on("click", ".js_open_top_bnr", function () {
      thisTop = $contents.offset().top;
    });
    $(document).on("click", ".js_close_top_bnr", function () {
      thisTop = $contents.offset().top;
    });
    $(document).on("click", ".js_x_top_bnr", function () {
      thisTop = $contents.offset().top;
    });

    var scrTop = $(document).scrollTop();

    if (scrTop > thisTop) {
      $wing_wrap.addClass("fix");
    } else {
      $wing_wrap.removeClass("fix");
    }
  });

  //팝업의 바깥영역 클릭시 팝업 닫히게
  $(document).mouseup(function (e) {
    var container = $(".js_pop1");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.css("display", "none");
      $(".js_pop_onoff1").removeClass("on");
    }
  });


  













});