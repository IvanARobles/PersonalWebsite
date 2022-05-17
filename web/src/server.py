from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import FileResponse

def get_home(req):
  return FileResponse("pages/index.html")

def get_kvp(req):
  return FileResponse("pages/kvp.html")

def get_team(req):
  return FileResponse("pages/team.html")

def get_product_page(req):
  return FileResponse("pages/product.html")

def get_ui_page(req):
  return FileResponse("pages/UIinfo.html")
    
def get_ia_page(req):
  return FileResponse("pages/IAinfo.html")
    
def get_features(req):
  return FileResponse("pages/features.html")

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

    # Adds key value proposition route in the website
    config.add_route('product', '/product')
    # Directs the route to the function that can generate the view
    config.add_view(get_product_page, route_name='product')

    # Adds key value proposition route in the website
    config.add_route('UIinfo', '/UIinfo')
    # Directs the route to the function that can generate the view
    config.add_view(get_ui_page, route_name='UIinfo')

    # Adds key value proposition route in the website
    config.add_route('IAinfo', '/IAinfo')
    # Directs the route to the function that can generate the view
    config.add_view(get_ia_page, route_name='IAinfo')

    # Adds key value proposition route in the website
    config.add_route('features', '/features')
    # Directs the route to the function that can generate the view
    config.add_view(get_features, route_name='features')

    config.add_static_view(name='/', path='./public', cache_max_age=3600)
    app = config.make_wsgi_app()

  server = make_server('0.0.0.0', 6543, app)
  server.serve_forever()
