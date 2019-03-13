$(function () {

    $('.market').width(innerWidth+10)

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

    // 隐藏处理
    $('.bt-wrapper .num').each(function () {
        var num = parseInt($(this).html())
        if (num) {  // 有数值
            $(this).prev().show()
            $(this).show()
        } else {   //没数值
            $(this).prev().hide()
            $(this).hide()
        }
    })

    // 点击加操作
    $('.bt-wrapper>.glyphicon-plus').click(function () {
        request_data = {
            'goodsid':$(this).attr('data-goodsid')
        }
        // 保存当前操作按钮对象
        var $that = $(this)
        $.get('/axf/addcart/', request_data, function (response) {
            if (response.status == -1){  //未登录
                // 设置cookie
                $.cookie('back', 'market', {expires: 3, path: '/'})
                window.open('/axf/login/', '_self')
            } else if (response.status == 1){  //操作成功
                // 设置个数
                $that.prev().html(response.number)
                // 设置显示
                $that.prev().show()
                $that.prev().prev().show()
            }
        })
    })

    // 点击减操作
    $('.bt-wrapper>.glyphicon-minus').click(function () {
        var $that = $(this)
        request_data = {
            'goodsid': $(this).attr('data-goodsid')
        }
        $.get('/axf/subcart/', request_data, function (response) {
            if(response.status == 1){
                if(response.number){
                    $that.next().html(response.number)
                } else {
                    $that.next().hide()
                    $that.hide()
                }
            }
        })
    })
});