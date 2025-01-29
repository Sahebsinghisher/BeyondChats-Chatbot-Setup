- Live Website
You can explore the live version of the project at: https://f374-120-138-102-198.ngrok-free.app/

How to Run Locally
1) Clone the repository:
- bash
$git clone https://github.com/Sahebsinghisher/BeyondChats-Chatbot-Setup.git

2) Change the directory:
$cd BeyondChats-Chatbot-Setup

3) Install dependencies:
$npm install

4)Folder Structure Requirement:
-Ensure that the following folders exist:
a) /src: This folder should contain all your React components and JavaScript files. (i.e css and js file)
b) /public: This folder should contain your static assets such as index.html and images. (i.e html file)
If these folders are missing, please create them and add the necessary files.

5) Run the application:
- sql
$npm start

6) Open your browser and visit http://localhost:3000 to view the app locally.

#)Folder Structure
- css
/BeyondChats-Chatbot-Setup
├── /public
│   └── index.html  (The main HTML file)
│   └── [other static files]
├── /src
│   └── index.js    (The main JavaScript entry point)
│   └── App.js      (The main App component)
│   └── [other React components and logic]
└── [other project files]

xxxxxxxxxx

This is a chatbot setup web application designed for businesses to easily integrate and configure a chatbot on their website. The application allows users to go through multiple stages of chatbot setup including user registration, organization setup, and chatbot integration & testing.

Features
1. User Registration
Users can sign up by entering their name, email, and password.
Option to continue the registration with Google.
An email verification process to ensure genuine registrations.
2. Setup Organization
Users provide company details including name, website URL, and description.
Meta description is auto-fetched from the website URL (if available).
A list of detected webpages is shown to the user, with the ability to view scraped data from each webpage.
Users can either wait for the chatbot training to finish or continue the setup.
3. Chatbot Integration & Testing
Users can test the chatbot integration with their website.
Instructions are provided to help the user integrate the chatbot onto their website.
Options for sharing integration instructions with the website developer.
A success page is displayed when integration is successful, with options to explore the admin panel or start chatting with the chatbot.
Social media sharing options for easy promotion of the chatbot.

Technologies Used
- Frontend: ReactJS, HTML, CSS
- Backend: (Assumed to be provided)
- Libraries: React Router for navigation, Fetch API for meta description fetching

