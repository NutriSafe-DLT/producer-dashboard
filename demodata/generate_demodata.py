#  
import json 
import random
import http.client
import mimetypes
import requests

def save_object(obj, filename):
    with open(filename, 'wb') as output:  # Overwrites any existing file.
        json.dump(obj, output)

def init_demo_datastructures():
    init_demo_attributes()

def init_demo_attributes():
    attributeFileName = 'init_barcode_attribute.json'
    attributeFile = open ( attributeFileName, 'r' )
    payload = json.loads( attributeFile.read() )
    api_postasadmin_with_method ( 'META_addAttributeDefinition' , payload )



def api_postasadmin_with_method(methodname, payload):
    API_ENDPOINT = 'http://137.193.65.47:8080/submit?function=' + methodname
    currentToken = 'NONE'
    token_response = get_auth_token()
    if token_response:
        currentToken = token_response 
    print(currentToken)
    headers = {
    'Authorization': 'Bearer ' + currentToken,
    'Content-Type': 'application/json',
    'Cookie': 'JSESSIONID=C7CD65AFB9E312D4CFD2AD9ABE9F7A10'
    }
    r = requests.post( url = API_ENDPOINT, data = payload, headers = headers)  
    if r.status_code == requests.codes.unauthorized | r.status_code == requests.codes.forbidden:
        print('Renewing token...')
        token_response = get_auth_token()
        if token_response:
            currentToken = token_response 
        print(currentToken)
       

def get_auth_token():
    API_ENDPOINT = 'http://137.193.65.47:8080/auth'
    # data to be sent to api 
    data = {'username':'admin', 
            'password':'L2vmRsEmFb4gTU2L' 
           }  
    # sending post request and saving response as response object 
    r = requests.post(url = API_ENDPOINT, data = json.dumps(data)) 
    if r.status_code == requests.codes.ok:
      return r.json()['token']
    else:
        print(r.status_code)
        return False
   
    
# JSON string 
a = '{"name": "Bob", "languages": "English"}'

init_demo_datastructures()

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
    data['amount'] = random.randint(50,200)
    # Serializing json  
    json_object = json.dumps(data, indent = 2) 
    print(json_object)
    # sample usage
    save_object(data, 'milklot' + str(i) + '.json')



# Closing file 
fileProductTemplate.close() 

