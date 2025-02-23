Project Summary: Backend Solution for Vehicle Test Drive Management
This project involves developing a backend system for a used car dealership that allows customers to test drive vehicles. The system ensures that test drives are monitored in real-time, with geolocation tracking and safety checks to prevent vehicles from entering restricted areas or exceeding a predefined radius from the dealership. The backend also handles notifications, user roles, and reporting functionalities.

Key Features
Test Drive Management:

Customers can schedule test drives, provided they have a valid license and are not restricted.

Employees can create, monitor, and finalize test drives, adding comments upon completion.

Geolocation Tracking:

Vehicles are equipped with GPS systems that send their real-time location to the backend.

The system checks if the vehicle is within the allowed radius or if it enters a restricted zone.

Notifications:

If a vehicle exceeds the allowed radius or enters a restricted zone, the system sends a notification to the employee in charge.

Customers who violate the rules are added to a restricted list and cannot schedule further test drives.

Reporting:

The system generates reports on incidents, test drive details, and kilometers driven by each vehicle.

Security:

The backend implements role-based access control (RBAC) using Keycloak to ensure that only authorized users (employees, vehicle users, and administrators) can perform specific actions.

Technical Implementation
1. Microservices Architecture
The backend is designed using a microservices architecture, with at least two microservices:

Test Drive Service: Handles test drive creation, monitoring, and finalization.

Geolocation Service: Manages real-time vehicle tracking and safety checks.

An API Gateway serves as the entry point for all requests, routing them to the appropriate microservice.

2. External API Integration
The system integrates with an external API to fetch configuration data, including:

Latitude and longitude of the dealership.

Maximum allowed radius for test drives.

List of restricted zones (defined by northwest and southeast coordinates).

3. Authentication and Authorization
The system uses Keycloak for authentication and role-based access control. Keycloak is configured with the following:

Client: cliente-tpi

Client Secret: ZmiMMce6zh4xKHde1FFKbfkiThDyYpyn

Roles: Admin, Employee, and Vehicle.

Users are assigned roles based on their responsibilities:

Admin: Can view reports and manage system settings.

Employee: Can create and manage test drives.

Vehicle: Can send real-time location updates.

4. Endpoints
The backend exposes the following endpoints:

Create Test Drive: Validates customer eligibility and vehicle availability.

List Ongoing Test Drives: Returns a list of all active test drives.

Finalize Test Drive: Allows employees to end a test drive and add comments.

Receive Vehicle Position: Checks if the vehicle is within the allowed radius or in a restricted zone.

Send Notification: Sends promotional notifications to one or more phone numbers.

Generate Reports: Provides detailed reports on incidents, test drives, and kilometers driven.

5. Security Measures
Only employees can create test drives and send notifications.

Only vehicle users can send real-time location updates.

Only administrators can view reports and system data.

Challenges and Solutions
Real-Time Geolocation Tracking:

Use a lightweight protocol (e.g., MQTT or WebSocket) for real-time updates.

Implement a geofencing algorithm to check if the vehicle is within the allowed radius or in a restricted zone.

Role-Based Access Control:

Use Keycloak to manage user roles and permissions.

Ensure that each endpoint validates the user's role before processing the request.

Scalability:

Design the system using microservices to ensure scalability and flexibility.

Use an API Gateway to manage traffic and route requests to the appropriate microservice.