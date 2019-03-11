$(function () {
    $('.register').width(innerWidth);

    //邮箱验证
    $('#email input').blur(function () {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则验证邮箱

        // 如果为空，则不进行验证
        if ($(this).val() == '') return;

        // 格式是否正确
        if (reg.test($(this).val())){
            request_data = {
                'email': $(this).val()
            };

            $.get('/axf/checkemail/', request_data, function (response) {
                // 客户端接受到数据之后的处理
                if(response.status){
                    $('#email-t').attr('data-content', '该帐号可以使用').popover('hide');
                    $('#email').removeClass('has-error').addClass('has-success');
                    $('#email>span').removeClass('glyphicon-remove').addClass('glyphicon-ok')
                } else {
                    $('#email-t').attr('data-content', response.msg).popover('show');
                    $('#email').removeClass('has-success').addClass('has-error');
                    $('#email>span').removeClass('glyphicon-ok').addClass('glyphicon-remove')
                }
            })
        } else {  //不符合
            $('#email-t').attr('data-content', '输入的格式不正确').popover('show');
            $('#email').removeClass('has-success').addClass('has-error');
            $('#email>span').removeClass('glyphicon-ok').addClass('glyphicon-remove')
        }
    });

    // 密码验证
    $('#password input').blur(function () {
        var reg = new RegExp('^[a-zA-Z0-9_]{6,10}$');  //正则验证密码

        // 如果为空，则不进行验证
        if ($(this).val() == '') return;

        // 格式是否正确
        if (reg.test($(this).val())){
            $('#password').removeClass('has-error').addClass('has-success');
            $('#password>span').removeClass('glyphicon-remove').addClass('glyphicon-ok')
        } else {
            $('#password').removeClass('has-success').addClass('has-error');
            $('#password>span').removeClass('glyphicon-ok').addClass('glyphicon-remove')
        }
    });

    // 验证密码
    $('#password-d input').blur(function () {
        // 如果为空，则不进行验证
        if ($(this).val() == '') return;

        var f_val = $('#password input').val();  // 第一次输入的密码
        var d_val = $('#password-d input').val();  // 第二次输入的密码

        if (f_val == d_val){
            $('#password-t').popover('hide');
            $('#password-d').removeClass('has-error').addClass('has-success');
            $('#password-d>span').removeClass('glyphicon-remove').addClass('glyphicon-ok')
        } else {
            $('#password-t').popover('show');
            $('#password-d').removeClass('has-success').addClass('has-error');
            $('#password-d>span').removeClass('glyphicon-ok').addClass('glyphicon-remove')
        }
    })

    // 验证昵称
    $('#name input').blur(function () {
        // 如果为空，则不进行验证
        if ($(this).val() == '') return;

        // 格式是否正确
        if ($(this).val().length>=3 || $(this).val().length<=10){
            $('#name').removeClass('has-error').addClass('has-success');
            $('#name>span').removeClass('glyphicon-remove').addClass('glyphicon-ok')
        } else {
            $('#name').removeClass('has-success').addClass('has-error');
            $('#name>span').removeClass('glyphicon-ok').addClass('glyphicon-remove')
        }
    })

    // 注册按钮
    $('#subButton').click(function () {
        var isregister = true

        $('.register .form-group').each(function () {
            if(!$(this).is('.has-success')){  // 不让注册
                isregister = false
            }
        })

        if(isregister){  // 可以注册
            $('.register form').submit()
        }
    })
});