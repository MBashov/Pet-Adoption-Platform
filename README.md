# 🐾 Pet Adoption Platform

## 📌 Overview
The **Pet Adoption Platform** is a web application that connects people with pets looking for a new home. Users can browse available pets, learn about the adoption process, and apply to adopt a pet. Registered users can manage their profiles, track adoption history, and submit adoption requests.

## 🚀 Features
### 🌍 Public Features (Accessible without authentication)
- **Browse Available Pets** – View a list of pets available for adoption (dogs, cats, etc.).
- **Pet Details Page** – Click on a pet to see detailed information, including photos, breed, age, and type.
- **Search & Filter Pets** – Filter pets based on type (dog, cat, etc.).
- **Adoption Process Info** – Read about the steps and requirements for adopting a pet.

### 🔒 Private Features (User Area)
- **User Registration/Login** – Users can create an account and log in.
- **User Profile** – View your pet applications and manage your added pets.
- **Apply for Pet Adoption** – Fill out an adoption request form.
- **Pet Management** – Users can add, edit, and delete their pet listings.

## 🛠 Tech Stack
### 🌐 Frontend
- **React.js** – Main UI framework
- **React Router** – Navigation between pages
- **Fetch API** – API calls for backend communication

### 💾 Backend
- **SoftUni Practice Server**

This project uses the SoftUni Practice Server for backend functionality. Please note that this database is not persistent, meaning all user data (registrations, pet listings, etc.) will be lost upon a server restart.
Learn more about the SoftUni Practice Server [here](https://github.com/softuni-practice-server/softuni-practice-server)


## 🏗 How to Run the Project
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/MBashov/Pet-Adoption-Platform

cd .\client\ 

npm install

npm run dev

Open second terminal to run the server

cd ./server/

node .\server.js

The app will run at http://localhost:5173
```


## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.