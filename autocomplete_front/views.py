from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse


def search(request):
    return render(request, "autocomplete_front/search.html")

def index(request):
    if request.user.is_authenticated:
        return redirect(reverse('search'))
    return render(request, "autocomplete_front/index.html")
