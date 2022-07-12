from django.core import paginator
from django.shortcuts import render
from django.shortcuts import redirect
from django.db.models import QuerySet
from django.db.models import Count, Sum, Avg, Min, Max
from django.views.generic import ListView
from django.views.generic import DetailView
from django.core.paginator import Paginator
from .models import Friend, Message
from .forms import Friends
from .forms import FriendForm, MessageForm
from .forms import FindForm
from .forms import CheckForm


def __new_str__(self):
    result = ''
    for item in self:
        result += '<tr>'
        for k in item:
            result += '<td>' + str(k) + '=' + str(item[k]) + '</td>'
        result += '</tr>'
    return result


# QuerySetの__str__メソッドに上記関数を設定
QuerySet.__str__ = __new_str__


def home(request):
    params = {
        'title': 'My Page',
        'message': 'Welcome to My Page',
    }
    return render(request, 'database_app/home.html', params)


def index(request, num=1):
    data = Friend.objects.all()
    page = Paginator(data, 3)
    params = {
        'title': 'Hello',
        'message': '',
        'data': page.get_page(num),
    }
    return render(request, 'database_app/index.html', params)


def create(request):
    if(request.method == 'POST'):
        obj = Friend()
        friend = Friends(request.POST, instance=obj)
        friend.save()
        return redirect(to='database_app/')
    params = {
        'title': 'Create',
        'form': Friends(),
    }
    return render(request, 'database_app/create.html', params)


def edit(request, num):
    obj = Friend.objects.get(id=num)
    if(request.method == 'POST'):
        friend = Friends(request.POST, instance=obj)
        friend.save()
        return redirect(to='/database_app')
    params = {
        'title': 'Edit',
        'id': num,
        'form': Friends(instance=obj),
    }
    return render(request, 'database_app/edit.html', params)


def delete(request, num):
    friend = Friend.objects.get(id=num)
    if(request.method == 'POST'):
        friend.delete()
        return redirect(to='/database_app')
    params = {
        'title': 'Delete',
        'id': num,
        'obj': friend,
    }
    return render(request, 'database_app/delete.html', params)


class FriendList(ListView):
    model = Friend


class FriendDetail(DetailView):
    model = Friend


def find(request):
    if(request.method == 'POST'):
        msg = request.POST['find']
        form = FindForm(request.POST)
        sql = 'select * from database_app_friend'
        if(msg != ''):
            sql += ' where '+msg
        data = Friend.objects.raw(sql)
        msg = sql
    else:
        msg = 'search words...'
        form = FindForm()
        data = Friend.objects.all()
    params = {
        'title': 'Find',
        'message': msg,
        'form': form,
        'data': data,
    }
    return render(request, 'database_app/find.html', params)


def check(request):
    params = {
        'title': 'Check',
        'message': 'check validation.',
        'form': Friends()
    }
    if(request.method == 'POST'):
        obj = Friend()
        form = Friends(request.POST, instance=obj)
        params['form'] = form
        if(form.is_valid()):
            params['message'] = 'OK!'
        else:
            params['message'] = 'no good.'
    return render(request, 'database_app/check.html', params)


def message(request, page=1):
    if(request.method == 'POST'):
        obj = Message()
        form = MessageForm(request.POST, instance=obj)
        form.save()
    data = Message.objects.all().reverse()
    paginator = Paginator(data, 5)
    params = {
        'title': 'Message',
        'form': MessageForm(),
        'data': paginator.get_page(page),
    }
    return render(request, 'database_app/message.html', params)
