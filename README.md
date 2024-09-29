# SignalHub

SignalHub is a real-time chat application that uses **SignalR** for seamless communication, offering features like chat rooms, user login, and room creation. This project is designed to provide a reliable, scalable, and interactive environment for users to communicate in real-time.

## Features

- **Real-Time Chat:** Instant messaging between users powered by SignalR.
- **Room Creation:** Users can create custom chat rooms and invite others.
- **Multiple Rooms:** Join and switch between multiple rooms with ease.
- **User Authentication:** Secure login and account management.
- **Responsive Design:** Accessible from desktop and mobile devices.

## Technologies Used

- **SignalR:** Real-time communication protocol for live chat.
- **.NET (Backend):** Used for managing server-side logic and user authentication.
- **React (Frontend):** User interface development with a focus on speed and simplicity.
- **SQL Server:** Database management for storing user data and chat logs.
- **Vercel:** Deployment of the frontend application for easy access.

## Setup and Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/yourusername/signalhub.git
    ```

2. Navigate to the project directory:
    ```bash
    cd signalhub
    ```

3. Install dependencies
        ```
           dotnet restore
        ```

4. Set up your database in **SQL Server**, and update the connection strings in the `appsettings.json` file in the backend project.

5. Start the **app**:
    ```
        dotnet run
    ```

## Usage

1. Navigate to `http://localhost:3000` to access the app.
2. Sign up or log in to start chatting.
3. Create or join a chat room and begin your real-time conversations.
