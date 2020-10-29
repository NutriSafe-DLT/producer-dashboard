#  
import json 
import pickle

def save_object(obj, filename):
    with open(filename, 'wb') as output:  # Overwrites any existing file.
        json.dump(obj, output)

# JSON string 
a = '{"name": "Bob", "languages": "English"}'


fileProductTemplate = open ('milklot_product_template.json', "r") 

# Reading from file 
data = json.loads(fileProductTemplate.read()) 

# Iterating through the json 
# list 
for i in data['id']: 
	print(i) 

# Generating new id
milklotAmount = input("Please enter the number of basic milklots to create: ")
for i in range(1,milklotAmount + 1):
    data['id'] = 'MILK' + str(i)
    # Serializing json  
    json_object = json.dumps(data, indent = 2) 
    print(json_object)
    # sample usage
    save_object(data, 'milklot' + str(i) + '.json')



# Closing file 
fileProductTemplate.close() 

