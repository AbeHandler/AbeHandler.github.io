import csv
import json

with open('BlightStatus_Demolitions.csv', 'rU') as csvfile:
	for row in csv.reader(csvfile, delimiter=','):
		try:
		    address = row[4]
		    coordinates = row[9].strip("(").strip(")")
		    lat = coordinates.split(",")[0].strip()
		    long = coordinates.split(",")[1].strip()
		except:
			print row

with open('Compliance.csv', 'rU') as csvfile:
	for row in csv.reader(csvfile, delimiter=','):
		address = row[3]
		long = row[23].split(",")[0].replace("<Point><coordinates>","")
        lat = row[23].split(",")[1]

with open('Nora.csv', 'rU') as csvfile:
	for row in csv.reader(csvfile, delimiter=','):
		try:
			addres = row[1].strip("\n").strip().strip("/n")
			coord = row[7]
 			long = coord.split(",")[0].replace("<Point><coordinates>","")
			lat = coord.split(",")[1]
		except:
			print row

with open('Sheriff.csv', 'rU') as csvfile:
	for row in csv.reader(csvfile, delimiter=','):
		print 'row'
		for cell in row:
			print cell