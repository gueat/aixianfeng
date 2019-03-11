$(function () {

    var index = $.cookie('index');
    if (index) {
        $('.type-slider li').eq(index).addClass('active')
    } else {
        $('.type-s  lider li').addClass('active')
    }

    $('.type-slider li').click(function () {
        $.cookie('index', $(this).index(), {expires: 3, path: '/'})
    })

    // 子类
    var categoryShow = false;
    $('#category-bt').click(function () {
        // 取反
        categoryShow = !categoryShow;
        categoryShow ? categoryViewShow() : categoryViewHide()
    });

    function categoryViewShow() {
        $('.category-view').show();
        $('#category-bt i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');

        sortViewHide();
        sortShow = false
    }

    function categoryViewHide() {
        $('.category-view').hide();
        $('#category-bt i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up')
    }

    // 排序
    var sortShow = false;
    $('#sort-bt').click(function () {
        sortShow = !sortShow;
        sortShow ? sortViewShow() : sortViewHide()
    });

    function sortViewShow() {
        $('.sort-view').show();
        $('#sort-bt i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');

        categoryViewHide();
        categoryShow = false
    }

    function sortViewHide() {
        $('.sort-view').hide();
        $('#sort-bt i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up')
    }

    // 灰色蒙层
    $('.bounce-view').click(function () {
        sortViewHide();
        sortShow = false;

        categoryViewHide();
        categoryShow = false
    })
});