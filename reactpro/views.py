from django.shortcuts import render
from django.contrib import messages
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from . import mymodel

@csrf_exempt
def imghandel(request):
    # model=joblib.load('titanic.joblib')
    if request.method=='POST':
        imgdata=request.POST.get('imgvalue')
        digit=mymodel.mymachinemodel(imgdata)
        return HttpResponse(digit)
    else:
        print('else block running')
        return HttpResponse('not okay')    

