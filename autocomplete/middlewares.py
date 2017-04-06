from django.http import HttpResponseRedirect

def is_internal(ip):
    return ip == "127.0.0.1" or ip[:8] == "129.104." and ip != "129.104.30.4" and ip != "129.104.30.90"

def needs_login(request):
    return request.path not in ['/login']

class NeedToLoginMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        ip = request.META['REMOTE_ADDR']
        if needs_login(request):
            if not is_internal(ip):
                if not request.user.is_authenticated():
                    return HttpResponseRedirect("/login")
        return self.get_response(request)