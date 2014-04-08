#!/usr/bin/python
# -*- coding: utf-8 -*-
from __future__ import print_function
from random import randint
import csv
import json
import random
import os
import math

types = ["nora", "sheriff", "demo", "fixed"]

featuredict = []
investigates = [
    'f',
    'f',
    'f',
    'f',
    't',
    'f',
    ]
demos = 'BlightStatus_Demolitions.csv'

counter = 0

def getFeature():
	feature = dict()
	geom = dict()
	feature["type"] = "Feature"
	geom["type"] = "Point"
	geom["coordinates"] = [random.uniform(-89.9, -90.12),random.uniform(29.9, 30.05)]
	geom["address"] = "123_Maple_St."
	feature["geometry"] = geom
	feature["properties"] = dict(category=types[randint(0,3)],investigates=investigates[randint(0,5)])
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
    for row in csv.reader(csvfile, delimiter=','):
        try:
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
            geom['address'] = address
            feature['geometry'] = geom
            feature['abatement'] = 'demo'
            feature['investigates'] = 'f'
            featuredict.append(getFeature())
            counter+=1
        except:
            print(row)

with open('Compliance.csv', 'rU') as csvfile:
    for row in csv.reader(csvfile, delimiter=','):
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
        geom['address'] = address
        feature['geometry'] = geom
        feature['abatement'] = 'fixed'
        feature['investigates'] = 'f'
        featuredict.append(getFeature())
        counter+=1

with open('Nora.csv', 'rU') as csvfile:
    for row in csv.reader(csvfile, delimiter=','):
        try:
            addres = row[1].strip('\n').strip().strip('/n')
            coord = row[7]
            long = coord.split(',')[0].replace('<Point><coordinates>',
                    '')
            lat = coord.split(',')[1]
            checkLatLong(lat, long, addres, 'nora')
            feature = dict()
            geom = dict()
            geom['coordinates'] = [lat, long]
            geom['address'] = addres
            feature['geometry'] = geom
            feature['abatement'] = 'nora'
            feature['investigates'] = 'f'
            featuredict.append(getFeature())
            counter+=1
        except:
            print(row)

with open('Sheriff.csv', 'rU') as csvfile:
    for row in csv.reader(csvfile, delimiter=','):
        address = row[1]
        lat = row[6]
        long = row[7]
    checkLatLong(lat, long, address, 'sheriff')
    feature = dict()
    geom = dict()
    geom['coordinates'] = [lat, long]
    geom['address'] = address
    feature['geometry'] = geom
    feature['abatement'] = 'sheriff'
    feature['investigates'] = 'f'
    featuredict.append(getFeature())
    counter+=1

type = dict(type='FeatureCollection', features=featuredict)
f = open('static/out.json', 'w')
print(json.dumps(type), file=f)
print(counter)