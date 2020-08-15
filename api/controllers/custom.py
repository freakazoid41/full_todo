
from flask import Flask, request,Response,jsonify
from flask_restful import Resource, Api

from json import dumps

class CustomController(Resource):

    def post(self, model):
        model = self.load(model)
        return model.get(request.form)

    def load(self,model):
        module = __import__('models.'+model) 
        return getattr(module, model).module