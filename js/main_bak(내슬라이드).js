$(window).ready(function(){


	/* 고정헤더 -------------------*/
	$('.page_hd').each(function(){
		var $window = $(window), //Window 객체
			$header = $(this),
			$gnb = $header.find('.gnb_menu'), // 헤더 스타일 저장
			$section01 = $('#main'),

			//메뉴 복사
			$gnbClone = $gnb.clone(),
			$gnbClone2 = $gnb.clone(),

			//헤더 스타일 복사할 영역에 추가할 HTML 코드
			$menuMobile = $('#gnb_m'), //모바일 메뉴 삽입 위치
			$menuMain = $section01.find('.main_menu'), //main 메뉴 삽입 위치
			
			//웹 페이지상단에서 section01 아래 위치까지의 길이
			//section01의 상단 위치 + section01의 높이
			threshold = $menuMain.offset().top + $menuMain.outerHeight();
				
		//메뉴 삽입
		$menuMobile.append($gnbClone); //모바일 메뉴
		$menuMain.append($gnbClone2); //메인 메뉴
		
		//스크롤시 헤더 스타일 변화, 초당 15회
		$window.on('scroll', $.throttle(1000 / 15, function(){
			if($window.scrollTop() > threshold){
				$header.addClass('visible');
			}else{
				$header.removeClass('visible');
			}
		}));

		// 스크롤 이벤트를 발생하여 처음 로딩할 때의 위치를 결정
		$window.trigger('scroll');
			
	});	

	 /*  gnb메뉴 (Smooth scroll) ------------------  */
	$('.gnb_menu a').smoothScroll({	
		easing: 'easeOutExpo',
			speed:1500,
		afterScroll : function(){
			location.hash = $(this).attr('href');
		}
	});

	/* 모바일메뉴 -------------------*/
	(function(){
		var $mMenuContainer = $('.gnb_m_box'),
			$mobileBtn = $('#all_m'),
			$gnbContainer = $('#gnb_m'),
			$gnbWidth = $gnbContainer.outerWidth(),
			$wrapper = $('#wrapper'),
			$bgAll = $('#bg_allmenu');

			$mobileBtn.on('click', function(){
				if($mMenuContainer.hasClass('on')){
					$gnbContainer.animate({right:-$gnbWidth}, 500);
					$wrapper.animate({right:0}, 500);
					$bgAll.css('display','none');
					$mMenuContainer.removeClass('on');
				}else{
					$gnbContainer.animate({right:0}, 500);
					$wrapper.animate({right:$gnbWidth}, 500);
					$bgAll.css('display','block');
					$mMenuContainer.addClass('on');
				}
			});

			$bgAll.on('click', function(){
				$gnbContainer.animate({right:-$gnbWidth}, 500);
				$wrapper.animate({right:0}, 500);
				$bgAll.css('display','none');
				$mMenuContainer.removeClass('on');
			});

	})();

	  /* Projsect Slide -------------- */
    $('.slide_wrap').each(function () {

    // 변수의 준비   

        var $container = $(this),                                 // a
            $slideGroup = $container.find('.slides'),				// b
            $slides = $slideGroup.find('li'),                 // c
			$slideImg = $slides.find('img'),                 // d
            $nav = $container.find('.drection_btn'),             // e
            // 슬라이드 쇼의 각 요소의 jQuery 객체
            // a 슬라이드 쇼 전체 컨테이너
            // b 모든 슬라이드의 정리 (슬라이드 그룹)
            // c 각 슬라이드
            // d 각 슬라이드 이미지
            // e 방향

            slideCount = $slides.length, // 슬라이드 장수
            slideEA = 0,
			currentIndex = 0,            // 현재 슬라이드의 인덱스
            duration = 500,              // 다음 슬라이드에 애니메이션의 소요 시간
            easing = 'swing',    // 다음 슬라이드에 애니메이션의 이징 종류
            interval = 7500,             // 자동으로 다음 슬라이드로 옮길 때까지의 시간
            timer;                       // 타이머
				
		//함수 정의
		//모든 슬라이드를 나타내는 함수
		function goToSlide(index){
			//슬라이드 이미지를 대상 인덱스에 맞게 보이기

			$slideImg.fadeOut(easing);

			$slideImg.eq(index * 2).fadeIn(easing);
			$slideImg.eq(index * 2 + 1).fadeIn(easing);
			

			//현재 슬라이드의 높이값 저장
			slideHeight();
				
			//현재 슬라이드의 인덱스값을 저장
			currentIndex = index;

			//네비게이션과 인디케이터 상태를 업데이트
			updateNav();
		
		}	

		//이미지높이에 따른 슬라이드 높이 자동계산
		function slideHeight(){
			var slideHeight = $slideImg.height();
			
			$container.css('height', slideHeight);

		}
		
		//슬라이드 상태에 따라 내비게이션과 인디케이터를 업데이트하는 함수
		function updateNav(){
			var $navPrev = $nav.find('.prev'),
				$navNext = $nav.find('.next');
			
			//첫번째 슬라이드 prev 삭제
			if(currentIndex === 0){
				$navPrev.addClass('disabled');
			}else{
				$navPrev.removeClass('disabled');
			}

			//마지막 슬라이드 next 삭제
			if(currentIndex === slideEA - 1){
				$navNext.addClass('disabled');
			}else{
				$navNext.removeClass('disabled');
			}

		}

		//타이머를 시작하는 함수
		function startTimer(){
			//변수 internval로 설정한 시간마다 작업을 수행
			timer = setInterval(function(){
				//현재 슬라이드의 인덱스에 따라 다음에 표시할 슬라이드를 결정
				//마지막 슬라이드라면 첫번째 슬라이드의 인덱스값을 저장
				var nextIndex = (currentIndex + 1) % (slideEA);

				goToSlide(nextIndex);

			}, interval);
		}

		//타이머를 중지시키는 함수
		function stopTimer(){
			clearInterval(timer);
		}

		//이벤트 등록
		//내비게션 링크를 클릭하면 해당 슬라이드를 표시
		$nav.on('click', 'li', function(event){
			event.preventDefault();
			if($(this).hasClass('prev')){
				goToSlide(currentIndex - 1);
			}else{
				goToSlide(currentIndex + 1);
			}
		});

		//마우스오버 시에는 타이머를 정지시키고, 마우스아웃 시에는 타이머를 작동
		$container.on({
			mouseenter:stopTimer,
			mouseleave:startTimer
		});
	
		//슬라이드쇼 시작
		//첫번째슬라이드표시
		goToSlide(currentIndex);

		//타이머시작
		startTimer();		
		
	});

	//반응형 초기화
	$(window).resize(function () {

		 $('.slide_wrap').each(function () {
		// 변수의 준비   
			var $container = $(this),                                 // a
				$slideGroup = $container.find('.slides'),				// b
				$slides = $slideGroup.find('li'),                 // c
				$slideImg = $slides.find('img');

			 //현재 슬라이드의 높이값 저장
			slideHeight();

			 //이미지높이에 따른 슬라이드 높이 자동계산
			function slideHeight(){
				var slideHeight = $slideImg.height();
				
				$container.css('height', slideHeight);
			}
		});
	});

	 /* Portfolio -------------- */
	 $('#pf_gellery').each(function () {

        // #gallery요소가 갤러리 컨테이너
        var $container = $(this),
			$loadMoreButton = $('#load-more'), // 추가 버튼
            $filter = $('#gellery-filter'),    // 필터링 양식
            addItemCount = 8,                 // 한 번에 표시 할 항목 수
            addedd = 0,                        // 표시 된 항목 수
            allData = [],                      // 모든 JSON 데이터
            filteredData = [];                 // 필터링 된 JSON 데이터;

		//옵션을 설정 Masonry를 준비
        $container.masonry({
            columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer',
            itemSelector: '.pf_item',
			percentPosition: true
        });

		// JSON을 검색하고 initGallery 함수를 실행
        $.getJSON('./data/pf_content.json', initGallery);

		// 갤러리 초기화
        function initGallery (data) {

            // 취득한 JSON 데이터를 저장
            allData = data;

            // 초기 상태에서는 필터링하지 않고 그대로 전체 데이터를 전달
            filteredData = allData;

            // 첫 번째 항목을 표시
            addItems();

            // 추가 버튼을 클릭하면 추가로 표시
            $loadMoreButton.on('click', addItems);

            // 필터 라디오 버튼이 변경되면 필터링을 수행
            $filter.on('change', 'input[type="radio"]', filterItems);

			// 항목 링크에 호버 효과 처리 등록
            $container.on('mouseenter mouseleave', '.pf_item', hoverDirection);
        }

		 // 항목을 생성하고 문서에 삽입
        function addItems (filter) {

            var elements = [],
                // 추가 데이터의 배열
                slicedData = filteredData.slice(addedd, addedd + addItemCount);


            // slicedData의 요소마다 DOM 요소를 생성
            $.each(slicedData, function (i, item) {
                var itemHTML =
                       '<li class="pf_item is-loading">' +
						'<div class="pf_thumb"><img src="' + item.images.thumb + '" alt="" /></div>' +
						'<div class="pf_hover">' +
							'<p class="detail_btn"><a href="#none" title="자세히보기">' + item.title + '</a></p>' +
						'</div>' +
						'<div class="pf_detail">' +						
							'<header class="sub_hd"><div class="wrap_cen"><h2>Portfolio</h2><div class="btn_close"><img src="./images/main/btn2_close.png" alt="닫기" /></div></div></header>' +
							'<div class="dt_txt">' +
							'<div class="wrap_cen">' +
								'<h4 class="pf_t">' + item.title + '<span class="type">(' + item.type + ')</span></h4>' +
								'<ul class="pf_c">' +
									'<li class="pf_c1">' +
										'<span class="pf_li_t">참여율</span>' +
										'<span class="pf_li_c">' + item.part + '</span>' +
									'</li>' +
									'<li class="pf_c2">' +
										'<span class="pf_li_t">프로젝트기간</span>' +
										'<span class="pf_li_c">' + item.project + '</span>' +
									'</li>' +
									'<li class="pf_c3">' +
										'<span class="pf_li_t">메인구축기간</span>' +
										'<span class="pf_li_c">' + item.build + '</span>' +
									'</li>' +
									'<li class="pf_c4">' +
										'<span class="pf_li_t">사용언어</span>' +
										'<span class="pf_li_c">' + item.language + '</span>' +
									'</li>' +
									'<li class="pf_c5">' +
										'<span class="pf_li_t">웹사이트</span>' +
										'<span class="pf_li_c"><a href="' + item.link + '" title="새창" target="_blank">' + item.link_ex + '</a></span>' +
									'</li>' +
								'</ul>' +
							'</div>' +
							'</div>' +
							'<div class="dt_img"><img src="' + item.images.detail + '" alt="포트폴리오 상세" /></div>' +
						'</div>' +
					'</li>';
                elements.push($(itemHTML).get(0));
            });

            // DOM 요소의 배열을 컨테이너에 넣고 Masonry 레이아웃을 실행
            $container
                .append(elements)
                .imagesLoaded(function () {
                    $(elements).removeClass('is-loading');
                    $container.masonry('appended', elements);

                    // 필터링시 재배치
                    if (filter) {
                        $container.masonry();
                    }
                });

            // 추가 된 항목 수량 갱신
            addedd += slicedData.length;

            // JSON 데이터가 추가 된 후에 있으면 추가 버튼을 지운다
            if (addedd < filteredData.length) {
                $loadMoreButton.show();
            } else {
                $loadMoreButton.hide();
            }
        }
       
		// 항목을 필터링한다.
        function filterItems () {
            var key = $(this).val(),// 체크 된 라디오 버튼의 value

                // 추가 된 Masonry 아이템
                masonryItems = $container.masonry('getItemElements');

            // Masonry 항목을 삭제
            $container.masonry('remove', masonryItems);

            // 필터링 된 항목의 데이터를 재설정과
            // 추가 된 항목 수를 재설정
            filteredData = [];
            addedd = 0;

           if (key === 'all') {
                // all이 클릭 된 경우 모든 JSON 데이터를 저장
                filteredData = allData;
            } // all 이외의 경우, 키와 일치하는 데이터를 추출
			else if(key === 'GENERAL' || key === 'RESPONSIVE'){
                filteredData = $.grep(allData, function (item) {
                    return item.category === key;
                });
            } else if(key === 'DESIGN+CODING' || key === 'ONLY CODING'){
                filteredData = $.grep(allData, function (item) {
                    return item.category2 === key;
                });
            } else {
                 filteredData = $.grep(allData, function (item) {
					return item.category3 === key;
                });
            }              

            // 항목을 추가
            addItems(true);
			
        }

	 // 호버 효과
		function hoverDirection (event) {
			var $overlay = $(this).find('.pf_hover'),
				side = getMouseDirection(event),
				animateTo,
				positionIn = {
					top:  '0%',
					left: '0%'
				},
				positionOut = (function () {
					switch (side) {
						// case 0: top, case 1: right, case 2: bottom, default: left
						case 0:  return { top: '-100%', left:    '0%' }; break; // top
						case 1:  return { top:    '0%', left:  '100%' }; break; // right
						case 2:  return { top:  '100%', left:    '0%' }; break; // bottom
						default: return { top:    '0%', left: '-100%' }; break; // left
					}
				})();
			if (event.type === 'mouseenter') {
				animateTo = positionIn;
				$overlay.css(positionOut);
			} else {
				animateTo = positionOut;
			}
			$overlay.stop(true).animate(animateTo, 250, 'easeOutExpo');
		}

		// 마우스의 방향을 감지하는 함수
		// http://stackoverflow.com/a/3647634
		function getMouseDirection (event) {
			var $el = $(event.currentTarget),
				offset = $el.offset(),
				w = $el.outerWidth(),
				h = $el.outerHeight(),
				x = (event.pageX - offset.left - w / 2) * ((w > h)? h / w: 1),
				y = (event.pageY - offset.top - h / 2) * ((h > w)? w / h: 1),
				direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90  + 3) % 4;
			return direction;
		}

		// jQuery UI Button
		$('.filter-form input[type="radio"]').button({
			icons: {
				primary: 'icon-radio'
			}
		});

		//포트폴리오 디테일 이미지 온오프
		var winHeight = $(window).height(),
			$body = $('body');

		$(this).on('click', '.pf_hover', function(){
			$(this).parent().find('.pf_detail').css('display','block');
			$body.css({height:winHeight, 'overflow-y':'hidden'}); //포트폴리오 섹션에서 전체 스크롤 고정
			$('.page_hd').css('display','none');
		});

		$(this).on('click', '.btn_close', function(){
			$('.pf_detail').removeClass('on').css('display','none');
			$body.css({height:'auto', 'overflow-y':'auto'});
			$('.page_hd').css('display','block');
		});			

    });

	/* 풀페이지 : (콘텐츠 생성된 뒤에 실행해야하므로 최하단에 선언)-------------------*/
	(function fullPage(){
		var htmlHeight = $('html').outerHeight(),
			$section = [$('#main'), $('#history'), $('#contact')], //풀페이지 적용할 섹션
			sectionLen = $section.length;

		//적용할 높이값 및 최소높이값 계산
		for(var i=0; i<sectionLen; i++){
			//풀페이지 높이값
			$section[i].css('height', htmlHeight);

			//풀페이지 최소 높이값 계산 변수선언
			var el1 = $section[i].find('> h2').outerHeight(true),
				el2 = $section[i].find('> p').outerHeight(true),
				el3 = 0,
				el3Len = $section[i].find('article').length,
				sectionMinHeight,
				sectionMaxHeight;
			
			//article 개수만큼 높이 환산
			for(var j=0, el3Sum = []; j<el3Len; j++){
			 	el3Sum[j] = $section[i].find('article:nth-child(' + (j+1) + ')').outerHeight(true);
				el3 += el3Sum[j];		
			}
			
			//풀페이지 최소 높이값
			sectionMinHeight = el1 + el2 + el3 + $section[i].outerHeight(true) - $section[i].height();			
			$section[i].css('minHeight', sectionMinHeight);

			//풀페이지 콘텐츠(제목 제외) 최대 높이값
			sectionMaxHeight = htmlHeight - ($section[i].outerHeight(true) - $section[i].height()) - el1 - el2;			
			$section[i].find('.wrap_cen').css('maxHeight', sectionMaxHeight);
			
			//풀페이지 콘텐츠(제목 제외) 최소 높이값
			$section[i].find('.wrap_cen').css('minHeight', el3);

		};

	})();	
	
	//반응형 초기화
	$(window).resize(function () {
		var htmlHeight = $('html').outerHeight(),
			$section = [$('#main'), $('#history'), $('#contact')], //풀페이지 적용할 섹션
			sectionLen = $section.length;

		//적용할 높이값 및 최소높이값 계산
		for(var i=0; i<sectionLen; i++){
			//풀페이지 높이값
			$section[i].css('height', htmlHeight);

			//풀페이지 최소 높이값 계산 변수선언
			var el1 = $section[i].find('> h2').outerHeight(true),
				el2 = $section[i].find('> p').outerHeight(true),
				el3 = 0,
				el3Len = $section[i].find('article').length,
				sectionMinHeight,
				sectionMaxHeight;
			
			//article 개수만큼 높이 환산
			for(var j=0, el3Sum = []; j<el3Len; j++){
			 	el3Sum[j] = $section[i].find('article:nth-child(' + (j+1) + ')').outerHeight(true);
				el3 += el3Sum[j];		
			}

			//풀페이지 콘텐츠(제목 제외) 최대 높이값
			sectionMaxHeight = htmlHeight - ($section[i].outerHeight(true) - $section[i].height()) - el1 - el2;			
			$section[i].find('.wrap_cen').css('maxHeight', sectionMaxHeight);
			
			//풀페이지 콘텐츠(제목 제외) 최소 높이값
			$section[i].find('.wrap_cen').css('minHeight', el3);

		};
		
	});

	/* 스크롤에 따른 동적효과 : (풀페이지 하단에 선언)-------------------*/
	$(window).on('scroll', $.throttle(1000 / 3, 
		
	function (){
		var $sect = $('section'),
			sectLen = $sect.length,
			htmlHeight = $('html').outerHeight(),
			winTop = $(window).scrollTop(),
			winBtm = winTop + htmlHeight,
			$gnbPC = $('#gnb_pc .gnb_menu li'),
			$gnbM = $('#gnb_m .gnb_menu li'),
			$gnbMain = $('#main .gnb_menu li');	

			for(i=0; i<sectLen; i++){
				var sectHeight = $sect.eq(i).outerHeight(true),
					sectPosition = $sect.eq(i).offset().top,
					comparisonValue = sectPosition + 150;		
				
				//동적효과 실행
				if(comparisonValue <= winBtm){
					$sect.eq(i).addClass('active').addClass('on');	
					$sect.removeClass('on');
					$sect.eq(i).addClass('on');					
				}else{ //동적효과 취소
					$sect.eq(i).removeClass('active');
				}

				//스크롤 위치에 따른 섹션구분
				if($sect.eq(i).hasClass('on')){
					$gnbPC.removeClass('on');
					$gnbPC.eq(i).addClass('on');

					$gnbM.removeClass('on');
					$gnbM.eq(i).addClass('on');

					$gnbMain.removeClass('on');
					$gnbMain.eq(i).addClass('on');
				}
			}

	})); 
	
});