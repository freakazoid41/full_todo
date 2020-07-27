from models.main import main
class todo(main):
    def __init__(self):
        super().__init__([
            'id',
            'title',
            'description',
            'status',
            'created_at'
        ],'todo')
        


module = todo()