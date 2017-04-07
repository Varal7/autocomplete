from django.shortcuts import render


def search(request):
    return render(request, "autocomplete_front/search.html")
