import json
import urllib.request
import random
import time

BASE = 'http://127.0.0.1:8000'

u = f"testuser{random.randint(1000,99999)}"
passw = 'TestPass123'
reg = {
    'username': u,
    'email': f'{u}@example.com',
    'password': passw,
    'password_confirm': passw,
}

print('Registering user:', u)
try:
    req = urllib.request.Request(BASE + '/api/auth/register/', data=json.dumps(reg).encode(), headers={'Content-Type':'application/json'})
    resp = urllib.request.urlopen(req)
    print('Register status:', resp.getcode())
    body = resp.read().decode()
    print('Register body:', body)
except Exception as e:
    print('Register failed:', e)

# small delay
time.sleep(0.5)

# Obtain token
try:
    data = f'username={u}&password={passw}'.encode()
    req = urllib.request.Request(BASE + '/api/auth/token/', data=data, headers={'Content-Type':'application/x-www-form-urlencoded'})
    resp = urllib.request.urlopen(req)
    token_body = resp.read().decode()
    print('Token response:', token_body)
    token_json = json.loads(token_body)
    token = token_json.get('token')
except Exception as e:
    print('Token request failed:', e)
    token = None

# Call protected endpoint
if token:
    try:
        req = urllib.request.Request(BASE + '/api/competitions/', headers={'Authorization': 'Token ' + token})
        resp = urllib.request.urlopen(req)
        print('Competitions status:', resp.getcode())
        print('Competitions body:', resp.read().decode())
    except Exception as e:
        print('Competitions request failed:', e)
else:
    print('No token available, skipping protected endpoint.')
