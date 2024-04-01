# python3.9 -m venv venv
# source venv/bin/activate
# pip install -r requirements.txt

#!/bin/bash
exec gunicorn -b 0.0.0.0:8080 app:appbash