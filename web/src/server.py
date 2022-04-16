from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import FileResponse

def get_home(req):
  return FileResponse("index.html")

if __name__ == '__main__':
  with Configurator() as config:
    config.add_route('home', '/')
    config.add_view(get_home, route_name='home')
    config.add_static_view(name='/', path='./public', cache_max_age=3600)
    app = config.make_wsgi_app()

  server = make_server('0.0.0.0', 6543, app)
  server.serve_forever()
