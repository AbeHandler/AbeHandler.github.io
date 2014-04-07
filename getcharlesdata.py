import csv
import os
from pydrive.drive import GoogleDrive
from pydrive.auth import GoogleAuth

gauth = GoogleAuth()
gauth.LocalWebserverAuth()

drive = GoogleDrive(gauth)

with open('VisitingPhotos.csv', 'rU') as csvfile:
	for row in csv.reader(csvfile, delimiter=','):
		try:
			address = row[2].replace(' ', '_')
			links = [i for i in row[3].split(" ") if len(i)>0] 
			for l in links:
				myfile = drive.CreateFile({'id': l.split("=")[2]})
				if not os.path.exists('static/images/big/' + address + "_" + l.split("=")[2]):
					myfile.GetContentFile('static/images/big/' + address + "_" + l.split("=")[2])
		except:
			print row