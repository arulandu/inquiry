import os
import json
from collections import defaultdict

d = defaultdict(list)
for root, dirs, files in os.walk('./md'):
  for file in files:
    f = os.path.join(root, file)
    if '.md' in f:
      category, file = str(f.replace('\\', '/').replace('/md/', '')[1:]).split('/')
      with open(f, 'r') as fl:
        date = file[:-3]
        d[category].append({
          'path': file,
          'date': f'{date[:2]}/{date[2:4]}/{date[4:]}',
          'data': ''.join(fl.readlines())
        })
      
with open('./md/dir.json', 'w+') as f:
  json.dump({'categories': [{'name': k, 'files': d[k]} for k in d]}, f)
          