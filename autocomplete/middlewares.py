from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

def is_internal(ip):
    return ip[:8] == "129.104." and ip != "129.104.30.4" and ip != "129.104.30.91" or ip == "127.0.0.1"

def needs_login(request):
    return request.path not in [reverse('index'), reverse('login')]

class NeedToLoginMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        ip = request.META['REMOTE_ADDR']
        if needs_login(request):
            if not is_internal(ip):
                if not request.user.is_authenticated():
                    url = reverse('login')
                    return HttpResponseRedirect(url)
        return self.get_response(request)
