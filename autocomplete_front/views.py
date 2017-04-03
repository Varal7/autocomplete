from django.shortcuts import render

def index(request):
    return render(request, "autocomplete_front/index.html")
