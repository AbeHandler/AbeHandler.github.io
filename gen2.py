#!/usr/bin/python
# -*- coding: utf-8 -*-
from __future__ import print_function
import csv
import json
import os

featuredict = []

demos = 'BlightStatus_Demolitions.csv'

counter = 0

def getInvestigates(address):
    dr = "static/images/big/" + address + ".jpg"
    if os.path.exists(dr):
        return "t"
    return "f"

def getThumbnail(address):
    dr = "static/images/thumbnails/" + address + ".jpg"
    if os.path.exists(dr):
        return "yesthumbnail"
    return "nothumbnail"

def getFeature(lat, long, address, type):
    feature = dict()
    geom = dict()
    geom["type"] = "Point"
    geom["coordinates"] = [float(long),float(lat)]
    feature["geometry"] = geom
    feature["properties"] = dict(address=address.replace(" ", "_"), category=type,thumbnail=getThumbnail(address.replace(" ", "_")), investigates=getInvestigates(address.replace(" ", "_")))
    feature["type"] = "Feature"
    return feature

def checkLatLong(
    lat,
    lon,
    adr,
    type,
    ):
    lat = abs(float(lat))
    lon = abs(float(lon))
    if lon < 89.6:
        print('lon' + lon)
    if lon > 90.15:
        print('lon' + lon)
    if lat > 30.177:
        print('lat' + lat)
    if lat < 29.8:
        print('lat' + lat)


with open('BlightStatus_Demolitions.csv', 'rU') as csvfile:
    i = 0
    for row in csv.reader(csvfile, delimiter=','):
        try:
            i = i + 1
            address = row[4]
            coordinates = row[9].strip('(').strip(')')
            lat = coordinates.split(',')[0].strip()
            long = coordinates.split(',')[1].strip()
            checkLatLong(lat, long, address, 'demo')
            if lat == 229.95311:
                print('e')
            feature = dict()
            geom = dict()
            geom['coordinates'] = [lat, long]
            feature['geometry'] = geom
            if i % 500 == 0:
                featuredict.append(getFeature(lat,long, address, 'demo'))
            counter+=1
        except:
            print(row)

with open('Compliance.csv', 'rU') as csvfile:
    i=0
    for row in csv.reader(csvfile, delimiter=','):
        i = i + 1
        address = row[3]
        long = row[23].split(',')[0].replace('<Point><coordinates>', ''
                ).replace('<Point><coordinates', '')
        lat = row[23].split(',')[1]
        if float(lat) == 229.95311:  #fix irregularity in the data
            lat=29.952807
        checkLatLong(lat, long, address, 'fixed')
        feature = dict()
        geom = dict()
        geom['coordinates'] = [lat, long]
        feature['geometry'] = geom
        if i % 500 == 0:
            featuredict.append(getFeature(lat,long, address, 'fixed'))
        counter+=1

with open('Nora.csv', 'rU') as csvfile:
    i=0
    for row in csv.reader(csvfile, delimiter=','):
        try:
            i = i + 1
            addres = row[1].strip('\n').strip().strip('/n')
            coord = row[7]
            long = coord.split(',')[0].replace('<Point><coordinates>',
                    '')
            lat = coord.split(',')[1]
            checkLatLong(lat, long, addres, 'nora')
            feature = dict()
            geom = dict()
            geom['coordinates'] = [lat, long]
            feature['geometry'] = geom
            if i % 500 == 0:
                featuredict.append(getFeature(lat,long, addres, 'nora'))
            counter+=1
        except:
            print(row)

with open('Sheriff.csv', 'rU') as csvfile:
    i=0
    for row in csv.reader(csvfile, delimiter=','):
        try:
            i = i + 1
            address = row[1]
            lat = row[6]
            long = row[7]
    	    checkLatLong(lat, long, address, 'sheriff')
    	    feature = dict()
    	    geom = dict()
    	    geom['coordinates'] = [lat, long]
    	    feature['geometry'] = geom
            if i % 500 == 0:
                featuredict.append(getFeature(lat,long, address, 'sheriff'))
    	    counter+=1
        except:
            print(row)

type = dict(type='FeatureCollection', features=featuredict)
f = open('static/out3.json', 'w')
print(json.dumps(type), file=f)
print(counter)