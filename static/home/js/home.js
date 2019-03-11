$(function () {
    $('.home').width(innerWidth);

    var swiper = new Swiper('#topSwiper', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        loop: true,
        spaceBetween: 30,
        autoplay: 3000,
        effect: 'coverflow',
    });

    var mustbuySwiper = new Swiper('#mustbuySwiper', {
        slidesPerView: 3,
        spaceBetween: 5,
        autoplay: 3000,
    });
});