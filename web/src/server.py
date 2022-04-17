from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import FileResponse

def get_home(req):
  return FileResponse("index.html")

def get_kvp(req):
  return FileResponse("kvp.html")

def get_team(req):
  return FileResponse("team.html")

if __name__ == '__main__':
  with Configurator() as config:
    # Add the landing page for the website
    config.add_route('home', '/')
    # Directs the route to the function that can generate the view
    config.add_view(get_home, route_name='home')

    # Adds key value proposition route in the website
    config.add_route('kvp', '/kvp')
    # Directs the route to the function that can generate the view
    config.add_view(get_kvp, route_name='kvp')

    # Adds key value proposition route in the website
    config.add_route('team', '/team')
    # Directs the route to the function that can generate the view
    config.add_view(get_team, route_name='team')

    config.add_static_view(name='/', path='./public', cache_max_age=3600)
    app = config.make_wsgi_app()

  server = make_server('0.0.0.0', 6543, app)
  server.serve_forever()
