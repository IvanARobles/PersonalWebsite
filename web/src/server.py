from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import FileResponse

def get_home(req):
  return FileResponse("pages/index.html")

def get_visual_resume(req):
  return FileResponse("pages/visual-resume.html")

def get_art(req):
  return FileResponse("pages/art.html")

def get_projects(req):
  return FileResponse("pages/projects.html")

def get_about(req):
  return FileResponse("pages/about.html")

def get_contact(req):
  return FileResponse("pages/contact.html")

if __name__ == '__main__':
  with Configurator() as config:
    # Add the landing page for the website
    config.add_route('home', '/')
    # Directs the route to the function that can generate the view
    config.add_view(get_home, route_name='home')

    # Adds key value proposition route in the website
    config.add_route('visual-resume', '/visual-resume')
    # Directs the route to the function that can generate the view
    config.add_view(get_visual_resume, route_name='visual-resume')

    # Adds key value proposition route in the website
    config.add_route('art', '/art')
    # Directs the route to the function that can generate the view
    config.add_view(get_art, route_name='art')

    # Adds key value proposition route in the website
    config.add_route('projects', '/projects')
    # Directs the route to the function that can generate the view
    config.add_view(get_projects, route_name='projects')

    # Adds key value proposition route in the website
    config.add_route('about', '/about')
    # Directs the route to the function that can generate the view
    config.add_view(get_about, route_name='about')

    # Adds key value proposition route in the website
    config.add_route('contact', '/contact')
    # Directs the route to the function that can generate the view
    config.add_view(get_contact, route_name='contact')

    config.add_static_view(name='/', path='./public', cache_max_age=3600)
    app = config.make_wsgi_app()

  server = make_server('0.0.0.0', 6544, app)
  server.serve_forever()
