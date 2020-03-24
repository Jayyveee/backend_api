# backend_api

I implemented the simple REST API for the catalog of products using the Express.js.

REQUIREMENTS:
  1. Download and install node.js
  2. Download and install Visual Studio Code
  3. Postman - browser extension
 
STEPS:
  I have created the two files named index.js and package.json in the VS code.
	On the terminal,
		# npm install	// downloads all the dependencies
		# npm start 	// to start the server

NOTE: "nodemon" can be used in the dependency to auto start instead of stopping and starting again after any modifications.
  
  Save the code and start the server.
  In the browser or Postman, use http://localhost:3000/ and provide the correspoding objects and properties to access the categories or products
  Use the Postman to modify the category or product data like creating/updating/deleting
  
  OUTCOME:
    The code can implement the  following actions,
          ● Getting the list of all categories
          ● Getting the list of products of the concrete category
          ● Create/update/delete of category
          ● Create/update/delete of product
