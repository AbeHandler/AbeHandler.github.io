from flask import Flask
from flask import render_template
from flask import app

app = Flask(__name__)

@app.route('/')
def hello(name=None):
    return render_template('hello.html', name=name)

@app.route('/pic/<string:address>', methods= ["GET"])
def here(address=None):
     return app.send_static_file('images/123_Octavia_St.jpg')

if __name__ == '__main__':
    app.run()