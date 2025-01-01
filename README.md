# steps to run this code

# steps to run the api's in normal way
1.clone the code in your server vm and install node js and npm in your server or vm and modify the values in .env(mongodb crednetials)
2.run "npm i or npm install"
3.run "npm run build"   it will generated dist folder
4. run "npm run dev" or develpement server and run "npm start" for production server

# steps to run in docker enviroment
1.Install docker in your ubuntu server or vm and clone the code in the vm and modify the values in .env(mongodb crednetails)
2.build the docker image using "docker build -t lobby-api-image ."
3.now start the container with abvoe image using below command 
"docker run -d -p 5000:5000 --name lobby-api-service lobby-api-image"

# testing the api's using post man
for all api's you can add one header content-type:application/json (optinal)
// first api to list all the movies
method:get  
url:http://localhost:5000/api/movies  
it will return all the moves in json format

// second api to add the movie
method:post 
url:http://localhost:5000/api/movies                                     
body: json type and content
{
  "title": "darling",
  "genre": "roma",
  "rating": 9,
  "streamingLink": "https://www.netflix.com/pushpa"
}
it will not accept the same tilte mvoies second time(to avoid duplicates)

// third api to search the movie
method:get
url:http://localhost:5000/api/search?genre=drama&title=Salaar
this api will take(zeros parameters,one parameter and two parameters)
it will handle case-sensitive and prefix match(example if you add genre=dr it will gives all movies having genre starts with dr)


// fourth api to update the movie
method:put
url:http://localhost:5000/api/movies/:id (ex:http://localhost:5000/api/movies/676dfe76e636b906e87676e7)
header: x-role:admin
body:
{
  "title": "Salaar",
  "genre": "de",
  "rating": 9,
  "streamingLink": "https://example.com/updated-link"
}
It will update the existing movie record if record is not present it will return 404 
If header is not added it will give 403 error


// fifth api to delete the movie
method:delete
url:http://localhost:5000/api/movies/:id (ex:http://localhost:5000/api/movies/676dfe76e636b906e87676e7)
header: x-role:admin

It will dlete the existing movie record if record is not present it will return 404 
If header is not added it will give 403 error





