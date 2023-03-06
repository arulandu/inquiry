import os
import json
from collections import defaultdict

d = []
for root, dirs, files in os.walk('./md'):
  for file in files:
    f = os.path.join(root, file)
    if '.md' in f:
      category, file = str(f.replace('\\', '/').replace('/md/', '')[1:]).split('/')
      with open(f, 'r') as fl:
        date = file[:-3]
        d.append({
          'category': category,
          'path': file,
          'date': f'{date[:2]}/{date[2:4]}/{date[4:]}',
          'data': ''.join(fl.readlines())
        })
      
with open('./md/dir.json', 'w+') as f:
  json.dump({'files': sorted(d, key=lambda x: x['path'], reverse=True)}, f)
          