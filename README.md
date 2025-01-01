# Steps to Run the Code

## Steps to Run the APIs Normally

1. Clone the code in your server or VM, install Node.js and npm, and modify the values in `.env` (MongoDB credentials).
2. Run `npm install` or `npm i` to install the necessary dependencies.
3. Run `npm run build`. This will generate a `dist` folder.
4. Run `npm run dev` for the development server or `npm start` for the production server.

## Steps to Run in a Docker Environment

1. Install Docker on your Ubuntu server or VM, then clone the code on the VM and modify the values in `.env` (MongoDB credentials).
2. Build the Docker image using the following command:
    ```bash
    docker build -t lobby-api-image .
    ```
3. Start the container with the above image using the following command:
    ```bash
    docker run -d -p 5000:5000 --name lobby-api-service lobby-api-image
    ```

## Testing the APIs Using Postman

For all APIs, you can add the header `Content-Type: application/json` (optional).

### 1. List All Movies

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/movies`
- **Response:** It will return all the movies in JSON format.

### 2. Add a Movie

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/movies`
- **Body:**
    ```json
    {
      "title": "darling",
      "genre": "roma",
      "rating": 9,
      "streamingLink": "https://www.netflix.com/pushpa"
    }
    ```
- **Notes:** It will not accept the same title for movies a second time (to avoid duplicates).

### 3. Search for a Movie

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/search?genre=drama&title=Salaar`
- **Notes:** This API can take zero, one, or two parameters. It handles case sensitivity and prefix matching. For example, if you add `genre=dr`, it will give all movies where the genre starts with "dr".

### 4. Update a Movie

- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/movies/:id` (Example: `http://localhost:5000/api/movies/676dfe76e636b906e87676e7`)
- **Header:** `x-role: admin`
- **Body:**
    ```json
    {
      "title": "Salaar",
      "genre": "de",
      "rating": 9,
      "streamingLink": "https://example.com/updated-link"
    }
    ```
- **Notes:** It will update the existing movie record. If the record is not present, it will return a 404 error. If the header is not added, it will return a 403 error.

### 5. Delete a Movie

- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/movies/:id` (Example: `http://localhost:5000/api/movies/676dfe76e636b906e87676e7`)
- **Header:** `x-role: admin`
- **Notes:** It will delete the existing movie record. If the record is not present, it will return a 404 error. If the header is not added, it will return a 403 error.
