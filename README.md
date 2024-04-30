# Full-Stack Application

## Description
This is a full-stack application built using Go for the backend and React.js for the frontend. It utilizes PostgreSQL as the database.

## Features
- **Authentication**: JWT-based authentication system.
- **API Endpoints**: RESTful API endpoints for CRUD operations.
- **Database Integration**: Interaction with a PostgreSQL database using GORM.
- **Frontend UI**: User interface built with React.js.
- **Responsive Design**: Responsive UI design using Tailwind CSS.
- **Environment Variables**: Utilizes `.env` files for environment-specific configurations.

## Technologies Used
### Backend
- Go
- Fiber (web framework)
- GORM (ORM library)
- PostgreSQL
- JWT-Go (JWT library)
- godotenv (Environment variable loader)

### Frontend
- React.js
- Tailwind CSS
- Axios (HTTP client)  
- Material UI

## Installation
### Backend
1. Clone this repository.
2. Navigate to the `backend` directory.
3. Install dependencies using `go mod tidy`.
4. Create a `.env` file based on the provided `.env`.
5. Start the server using `go run main.go`.

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies using `npm i --legacy-peer-deps`.
3. Start the development server using `npm run dev`.  

### Using Docker
1. Make sure Docker is installed on your machine.
2. Clone this repository.
3. Navigate to the root directory of the project.
4. Run docker-compose up --build to build and start the Docker containers.  

## Database Dump
1. Ensure PostgreSQL is installed on your local machine.
2. Run the following command to restore the database dump:

Replace `<username>` with your PostgreSQL username and `<database_name>` with the name of your PostgreSQL database.

## Usage
1. Once the backend server is running, you can access the API endpoints at [http://localhost:8880](http://localhost:8880).
2. The frontend UI will be available at [http://localhost:5173](http://localhost:5173) by default.


## Default Admin Credentials
- **Email**: admin@21_ccare.com
- **Password**: admin123

## Common BUGS  

-- please refresh sign-up page if you can't login  