import csv
import json

with open('BlightStatus_Demolitions.csv', 'rU') as csvfile:
	for row in csv.reader(csvfile, delimiter=','):
		print 'row'
		for cell in row:
			print cell

with open('Compliance.csv', 'rU') as csvfile:
	for row in csv.reader(csvfile, delimiter=','):
		print 'row'
		for cell in row:
			print cell

with open('Nora.csv', 'rU') as csvfile:
	for row in csv.reader(csvfile, delimiter=','):
		print 'row'
		for cell in row:
			print cell

with open('Sheriff.csv', 'rU') as csvfile:
	for row in csv.reader(csvfile, delimiter=','):
		print 'row'
		for cell in row:
			print cell