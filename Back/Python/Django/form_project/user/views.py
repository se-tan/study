from django.shortcuts import render

def new(request):
    params = {'message': 'newです'}
    return render(request, 'user/new.html', params)
