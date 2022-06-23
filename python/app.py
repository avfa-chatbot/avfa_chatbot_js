#!/usr/bin/python
# -*- coding: utf-8 -*-

# Reload python flask server by function / API endpoint
# References: 
# https://docs.python.org/3/library/multiprocessing.html
# http://stackoverflow.com/questions/27723287/reload-python-flask-server-by-function


import os
import sys
import time 
import subprocess
from flask import Flask, render_template, jsonify, request
from multiprocessing import Process, Queue
import chat

some_queue = None

app = Flask(__name__)

#CORS(app)
@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Origin', '*')
	response.headers.add('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
	response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	return response

@app.get("/")
def index_get():
    return render_template("base.html")

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    response = chat.get_response(text)
    message = {"answer": response}
    return jsonify(message)

@app.route('/restart')
def restart():
	try:
		some_queue.put("something")
		print ("Restarted successfully")
		return "Quit"
	except: 
		print ("Failed in restart")
		return "Failed"

def start_flaskapp(queue):
	global some_queue
	some_queue = queue
	app.run(host='0.0.0.0')
	#app.run(host='localhost')


if __name__ =='__main__':
	q = Queue()
	p = Process(target=start_flaskapp, args=[q,])
	p.start()
	while True: #wathing queue, if there is no call than sleep, otherwise break
		if q.empty(): 
			time.sleep(1)
		else:
			break
	p.terminate() #terminate flaskapp and then restart the app on subprocess
	args = [sys.executable] + [sys.argv[0]]
	subprocess.call(args)