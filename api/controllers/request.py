
from flask import Flask, request,Response,jsonify
from flask_restful import Resource, Api
from json import dumps

class RequestController(Resource):
    def get(self,model,id=None):
        model = self.load(model)
        return model.get({'id':id})
        
    def patch(self, model,id=None):
        model = self.load(model)
        return model.update(request.form,id)

    def post(self, model,id=None):
        model = self.load(model)
        return model.insert(request.form)

    def delete(self, model,id=None):
        model = self.load(model)
        return model.delete({'id':id})

    def load(self,model):
        module = __import__('models.'+model) 
        return getattr(module, model).module