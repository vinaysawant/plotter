from pymongo import MongoClient
import requests
import json

client = MongoClient('localhost',27017)
db = client['locations']

print("db is {0}".format(str(db)))

def get_location():
	url = 'http://ec2-54-254-201-212.ap-southeast-1.compute.amazonaws.com/api/getLocation'
	data = {}
	data['driverId'] = 0
	data['tripId'] = 1

	response = requests.post(url=url,data=data)
	print(response)
	response = response.json()

	loc_data = {}
	loc_data['driverId'] = 0
	loc_data['tripId'] = 1
	loc_data['lat'] = response['data']['location'][0]['latitude']
	loc_data['lng'] = response['data']['location'][0]['longitude']

	print("{0}".format(str(loc_data)))
	result = db.drivers.insert_one(loc_data)
	print("Inserted data with ID {0}".format(str(result.inserted_id)))
	
	
 

if __name__ == "__main__":
	try:
		print("Cron started........")
		while True:
			get_location()
	except Exception as ex:
		print("Got exception {0}".format(str(ex)))
		
