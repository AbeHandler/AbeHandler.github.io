from flask import Flask
from flask import render_template
from flask import app
import os

app = Flask(__name__)

@app.route('/')
def hello(name=None):
    return render_template('hello.html', name=name)

@app.route('/pic/<string:address>', methods= ["GET"])
def pic(address=None):
	pth = 'images/big/'+ address + ".jpg"
	print pth
	return app.send_static_file(pth)

@app.route('/thumb/<string:address>', methods= ["GET"])
def thumb(address=None):
	pth = 'images/thumbnails/'+ address + ".jpg"
	return app.send_static_file(pth)

@app.route('/caption/<string:address>', methods= ["POST"])
def caption(address=None):
	pth = 'captions/'+ address 
	return app.send_static_file(pth)

if __name__ == '__main__':
    app.run()