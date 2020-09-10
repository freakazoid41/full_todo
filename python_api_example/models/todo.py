from models.main import *
class todo(main):
    def __init__(self):
        super().__init__([
            'id',
            'title',
            'description',
            'status',
            'target',
            'created_at'
        ],'todo')
        
    def get(self,obj):
        self.connect()
        rsp  = {'rsp':True,'data':[],'count':0}
        try:
            #create sql
            sql = f' select {",".join(self.columns)} from  {self.table}  '
            csql = f' select count(*) as length from  {self.table}  '
            if len(obj) != 0: 
                valid = True
                params = []
                where = 'where '
                for key in obj:
                    if obj[key] != None:
                        if key == 'target':
                            params.append(key+" like '%"+str(obj[key]).strip()+"%' ")
                        else:    
                            params.append(key+"='"+str(obj[key]).strip()+"'")
                    else:
                        valid = False
                        break    

                where+=' and '.join(params)

                if valid:
                    sql+= where
                    csql+= where
            #execute sql
            self.cur.execute(sql)
            rsp['data'] = []
            for row in self.cur:
                rsp['data'].append(dict(zip(row.keys(), row)))
            
            self.cur.execute(csql)
            row =  self.cur.fetchone()
            rsp['count'] = row['length']
            rsp['rsp'] = False if rsp['count'] == 0 else True
        except sqlite3.Error as error:
            print(error)
        finally:
            if self.conn is not None:
                self.conn.close()    
            return rsp

module = todo()