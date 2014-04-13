import csv
import os
from pydrive.drive import GoogleDrive
from pydrive.auth import GoogleAuth

gauth = GoogleAuth()
gauth.LocalWebserverAuth()

drive = GoogleDrive(gauth)

with open('Visited4.csv', 'rU') as csvfile:
    for row in csv.reader(csvfile, delimiter=','):
        try:
            address = row[2].replace(' ', '_')
            neighborhod = row[4]
            type = row[6]
            notes = row[15]
            owner = row[7]
            ownerlink = row[5]
            caption = address.replace("_", " ") + ", " +neighborhod + "<br>" + "History: " + row[8] + " " + row[10]
            if len(row[9])>0:
                caption = caption + " , " + row[9] + " " + row[11]
            if not len(notes)==0:
                caption = caption + "<br>" + "Notes: " + notes
            with open("static/captions/" + address,"a+") as f:
                f.write(caption)
			#links = [i for i in row[3].split(" ") if len(i)>0]
			#for l in links:
			#	myfile = drive.CreateFile({'id': l.split("=")[2]})
			#	for property, value in vars(myfile).iteritems():
			#		print property, ": ", value
			#	if not os.path.exists('static/images/big/' + address + ".jpg"):
			#		myfile.GetContentFile('static/images/big/' + address + ".jpg")
        except:
            print row