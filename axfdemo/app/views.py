import hashlib
import random
import time

from django.core.cache import cache
from django.http import JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from app.models import *


def home(request):
    # 轮拨图
    wheels = Wheel.objects.all()

    # 导航
    navs = Nav.objects.all()

    # 每日必购
    mustbuys = Mustbuy.objects.all()

    # 商品部分
    shops = Shop.objects.all()
    shophead = shops[0]
    shoptabs = shops[1:3]
    shopclasss = shops[3:7]
    shopcommends = shops[7:11]

    # 商品主体
    mainshows = Mainshow.objects.all()

    response_dir = {
        'wheels': wheels,
        'navs': navs,
        'mustbuys': mustbuys,
        'shops': shops,
        'shophead': shophead,
        'shoptabs': shoptabs,
        'shopclasss': shopclasss,
        'shopcommends': shopcommends,
        'mainshows': mainshows,
    }

    return render(request, 'home/home.html',context=response_dir)


# def market(request, typeid=104749):
def market(request, childid='0', sortid='0'):
    # 商品类型
    foodtypes = Foodtype.objects.all()

    # 商品模型
    goods_list = Goods.objects.all()
    # 客户端需要记录点击的分类下标[cookies，会自动携带]
    index = int(request.COOKIES.get('index', '0'))
    # 根据index获取对应的分类ID
    categoryid = foodtypes[index].typeid
    # 根据分类ID获取对应分类信息
    # goods_list = Goods.objects.filter(categoryid=categoryid)

    # 子类
    if childid == '0':
        goods_list = Goods.objects.filter(categoryid=categoryid)
    else:
        goods_list = Goods.objects.filter(categoryid=categoryid).filter(childcid=childid)

    # 排序
    if sortid == '1':
        goods_list = goods_list.order_by('-productnum')
    elif sortid == '2':
        goods_list = goods_list.order_by('price')
    elif sortid == '3':
        goods_list = goods_list.order_by('-price')

    # 获取子类信息
    childtypenames = foodtypes[index].childtypenames
    # 存储子类信息 列表
    childtype_list = []
    # 将对应的子类拆分出来
    for item in childtypenames.split('#'):
        item_arr = item.split(':')
        temp_dir = {
            'name': item_arr[0],
            'id': item_arr[1],
        }
        childtype_list.append(temp_dir)

    response_dir = {
        'foodtypes': foodtypes,
        'goods_list': goods_list,
        'childtype_list': childtype_list,
        'childid': childid,
    }
    return render(request,'market/market.html',context=response_dir)


def cart(request):
    return render(request, 'cart/cart.html')


def mine(request):
    # 获取
    token = request.session.get('token')
    userid = cache.get(token)
    user = None
    if userid:
        user = User.objects.get(pk=userid)
    return render(request, 'mine/mine.html', context={'user': user,})


def generate_token():
    temp = str(time.time()) + str(random.random())
    md5 = hashlib.md5()
    md5.update(temp.encode('utf-8'))
    return md5.hexdigest()


def generate_password(param):
    md5 = hashlib.md5()
    md5.update(param.encode('utf-8'))
    return md5.hexdigest()


def register(request):
    if request.method == 'GET':
        return render(request, 'mine/register.html')
    elif request.method == 'POST':
        # 获取数据
        email = request.POST.get('email')
        name = request.POST.get('name')
        password = generate_password(request.POST.get('password'))
        # 存入数据库
        user = User()
        user.email = email
        user.name = name
        user.password = password
        user.save()
        # 状态保持
        token = generate_token()
        cache.set(token, user.id, 60*60*24*3)
        request.session['token'] = token
        return redirect('axf:mine')


def login(request):
    if request.method == 'GET':
        return render(request, 'mine/login.html')
    elif request.method == 'POST':
        # 获取输入的数据
        email = request.POST.get('email')
        password = generate_password(request.POST.get('password'))

        # 重定向位置

        users = User.objects.filter(email = email)
        if users.exists():
            user = users.first()
            if user.password == password:
                # 更新token
                token = generate_token()
                # 保持状态
                cache.set(token, user.id, 60*60*24*3)
                # 传递客户端
                request.session['token'] = token
                return redirect('axf:mine')
            else:
                return render(request, 'mine/login.html', context={'p_err': '帐号或密码错误'})
        else:
            return render(request, 'mine/login.html', context={'p_err': '帐号或密码错误'})


def logout(request):
    request.session.flush()
    return redirect('axf:mine')


def checkemail(request):
    email = request.GET.get('email')  #  获取帐号信息

    # 去数据库中查找
    users = User.objects.filter(email=email)
    if users.exists():  # 帐号被占用
        response_data = {
            'status': 0,
            'msg': '该帐号已被使用！',
        }
    else:  # 帐号可以使用
        response_data = {
            'status': 1,
            'msg': '该帐号可以使用！'
        }
    # 返回json数据
    return JsonResponse(response_data)