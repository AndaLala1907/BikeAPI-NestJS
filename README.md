BikeAPI-NestJS Backend

BikeAPI is a modular backend system built with NestJS and MongoDB, designed to manage smart bicycles, devices, trips and user statistics.

## Live Deployment

-API Base URL: "https://bikeapi-nestjs.onrender.com"
-Swagger Docs: "https://bikeapi-nestjs.onrender.com/api-docs"

## Technologies

-NestJS (modular architecure)
-MongoDB + Mongoose
-JWT Authentication
-Role-based access control
-Swagger (OpenAPI) docs
-Soft delete with 'deletedAt'
-Automatic calorie tracking
-Webhook support
-Postman + Swagger tested

## Auth & Roles

-POST /auth/register - Register a new user
-POST /auth/login - Login & recieve JWT
-All routes protected via 'JwtAuthGuard'
-Role-based guards via '@Roles('admin')'

## Key Modules

'users'- user data, roles, weight
'bikes' - linked to user, barcode, types
'devices' - pairing/unpairing logic
'journeys' - start, ping, stop, calories
'logs' - journey logs with timestamp &type
'statistics' - generated from journeys
'roadtypes' / 'speedtypes' - classification
'webhooks' - recieve external events
'home' - dashboard overview

## API docs

Swagger UI available at '/api-docs' when running.

## Run Locality

bash
npm install
npm run start:dev
