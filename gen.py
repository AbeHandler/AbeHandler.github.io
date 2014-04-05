from __future__ import print_function
from random import randint
import json
import random

featuredict = []
types = ["nora", "sheriff", "demo", "fixed"]
investigates = ["f", "f", "f", "f", "t", "f"]

for x in range(0, 7500):
	feature = dict()
	geom = dict()
	feature["type"] = "Feature"
	geom["type"] = "Point"
	geom["coordinates"] = [random.uniform(-89.9, -90.12),random.uniform(29.9, 30.05)]
	feature["geometry"] = geom
	feature["properties"] = dict(category=types[randint(0,3)],investigates=investigates[randint(0,5)])
	featuredict.append(feature)

type = dict(type="FeatureCollection", features = featuredict)
f = open("out.json", "w")
print(json.dumps(type), file=f)