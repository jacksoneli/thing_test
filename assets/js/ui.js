$(function () {
  /***********************공통기능***********************/
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