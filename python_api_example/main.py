from controllers.request import *
from controllers.custom import *

from helpers.general import general
from flask_cors import CORS,cross_origin
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app)
CORS(app, resources={r'/*': {'origins': '*'}})
gh = general()


@app.before_request
def enter():
    if(request.method == 'OPTIONS'):return Response('Okey', 200)
    # request - flask.request
    if 'X-TOKEN' in request.headers or request.endpoint == 'login':
        if request.endpoint != 'login':
            #check token
            if gh.checkToken(request.headers)==False:
                return Response('Token Is Not Valid..', 401)
            else:    
                pass
        else:
            pass    
    else:
        return Response('Token Is Not Valid..', 407)
       

'''@app.after_request
def exit(response):
    print(response)
    return jsonify(response)'''


@app.route('/login', methods = ['POST'])
def login():
    return gh.login(request.form,request.headers)

@app.route('/custom/<model>', methods = ['POST'])
def custom(model,id=None):
    controller = CustomController()
    return jsonify(getattr(controller, request.method.lower())(model))

@app.route('/request/<model>', methods = ['POST','GET','PATCH','DELETE'])
@app.route('/request/<model>/<id>', methods = ['POST','GET','PATCH','DELETE'])
def drequest(model,id=None):
    controller = RequestController()
    return jsonify(getattr(controller, request.method.lower())(model,id))
        
#api.add_resource(RequestController, '/request/<model>','/request/<model>/<id>') # Route_1
#api.add_resource(CustomController, '/custom/<model>') # Route_



if __name__ == '__main__':
    app.run(port='5002',host='localhost')