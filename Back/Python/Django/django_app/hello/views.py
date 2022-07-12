from django.shortcuts import render
from django.views.generic import TemplateView
from hello.forms import HelloForm


class HelloView(TemplateView):

    def __init__(self):
        self.params = {
            'title': 'Hello',
            'message': 'your data:',
            'form': HelloForm(),
            'goto': 'index',
            'result': None,
        }

    def get(self, request):
        return render(request, 'hello/index.html', self.params)

    def post(self, request):
        ch = request.POST['choice']
        self.params['result'] = 'selected: ' + str(ch) + '.'

        # if ('check' in request.POST):
        #     self.params['result']='you selected: "' + request.POST['check'] + '".'
        # else:
        #     self.params['result']='not checked...'

        msg = 'あなたは、<b>' + request.POST['name'] + \
            '(' + request.POST['age'] + \
            ')</b>さんです。<br>メールアドレスは<b>' + request.POST['mail'] + \
            '</b>ですね。'
        self.params['message'] = msg
        self.params['form'] = HelloForm(request.POST)
        # self.params['goto'] = 'index'
        return render(request, 'hello/index.html', self.params)


"""
def index(request):
    params = {
        'title': 'Hello/Index',
        'msg': 'Your data :',
        'form': HelloForm(),
        'goto': 'next',
    }
    if (request.method == 'POST'):
        params['msg'] = '名前：' + request.POST['name'] + \
            '<br>メール：' + request.POST['mail'] + \
            '<br>年齢：' + request.POST['age']
        params['form'] = HelloForm(request.POST)
    return render(request, 'hello/index.html', params)


def next(request):
    params = {
        'title': 'Hello/Next',
        'msg': 'これは、もう1つのページです。',
        'goto': 'index',
    }
    return render(request, 'hello/index.html', params)


def form(request):
    msg = request.POST['msg']
    params = {
        'title': 'Hello/Form',
        'msg': 'こんにちは、' + msg + 'さん。',
        'goto': 'index',
    }
    return render(request, 'hello/index.html', params)
"""
