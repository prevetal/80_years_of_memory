WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function() {
	// Books slider
	const booksSliders = [],
		books = document.querySelectorAll('.books_page .swiper')

	books.forEach((el, i) => {
		el.classList.add('books_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 20,
			scrollbar: {
				el: '.swiper-scrollbar',
				hide: false,
				draggable: true,
				snapOnRelease: true,
				dragSize: '12px',
			},
			breakpoints: {
				0: {
					slidesPerView: 1
				},
				768: {
					slidesPerView: 2
				},
				1024: {
					slidesPerView: 3
				},
				1280: {
					slidesPerView: 4
				}
			}
		}

		booksSliders.push(new Swiper('.books_s' + i, options))
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		},
		on: {
			done: (fancybox, slide) => $(slide.contentEl).append(slide.captionEl)
		}
	})


	// Focus when clicking on the field name
	const formLabels = document.querySelectorAll('form .label')

	if (formLabels) {
		formLabels.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				el.closest('.line').querySelector('.input, textarea').focus()
			})
		})
	}


	// Calendar
	const calendarInputs = document.querySelectorAll('.input_date')

	if (calendarInputs) {
		calendarInputs.forEach(el => {
			new AirDatepicker(el, {
				autoClose: true,
				maxDate: new Date()
			})
		})
	}


	// Numbers
	$('.numbers .links .btn').click(function(e) {
		e.preventDefault()

		const content = $(this).data('content')

		$('.numbers .links .btn').removeClass('active')
		$(this).addClass('active')

		$('.numbers .content').hide()
		$('.numbers .content' + content).fadeIn(300)

		$('.numbers .links').addClass('hide')

		// Numbers content slider
		const slider = document.querySelector('.numbers .content' + content + ' .swiper:not(.swiper-initialized)')

		if (slider) {
			new Swiper('.numbers .content' + content + ' .swiper:not(.swiper-initialized)', {
				loop: true,
				speed: 500,
				watchSlidesProgress: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				spaceBetween: 0,
				slidesPerView: 1,
				effect: 'fade',
				fadeEffect: {
					crossFade: true
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true,
					bulletActiveClass: 'active'
				}
			})
		}
	})


	$('.numbers .content .full_screen_btn').click(function(e) {
		e.preventDefault()

		const firstImage = this.closest('.content').querySelector('[data-fancybox="content1_gallery"]')

		if (firstImage) {
			firstImage.click()
		}
	})


	$('.numbers .content .close_btn').click(function(e) {
		e.preventDefault()

		$('.numbers .links .btn').removeClass('active')
		$('.numbers .content').hide()

		$('.numbers .links').removeClass('hide')
	})


	// Menu
	$('.page_head .menu_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$('.menu').toggleClass('show')
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 360) document.getElementsByTagName('meta')['viewport'].content = 'width=360, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})