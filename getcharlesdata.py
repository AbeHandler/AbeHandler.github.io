import csv
from pydrive.drive import GoogleDrive
from pydrive.auth import GoogleAuth

#gauth = GoogleAuth()
#gauth.LocalWebserverAuth()

#drive = GoogleDrive(gauth)


with open('VisitingPhotos.csv', 'rb') as csvfile:
	for row in csv.reader(csvfile, delimiter=','):
		for cell in row:
			print cell

#myfile = drive.CreateFile({'id': '0BzEokBVWKbcVQy01dW5nQ0tJN28'}) 
#myfile2 = drive.CreateFile({'id': '0BzEokBVWKbcVczZJUFIwX1kxbG8'}) 
#print myfile['title']  # world.png
#print myfile2['title']  # world.png
#myfile.GetContentFile('world.png')