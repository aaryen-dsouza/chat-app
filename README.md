# ChatApp

A modern, real-time chat application built with React, TypeScript, Firebase, and Firestore, offering a sleek user experience with a feature-rich messaging platform. The application includes authentication, dynamic chat functionalities, user status updates, and much more.

## 🌟 Features

- **Real-Time Messaging:** Experience smooth and instantaneous chat updates powered by Firestore.
- **User Authentication:** Secure login and registration with Firebase Authentication.
- **Message Management:** Edit messages within a 15-minute window and delete them if needed.
- **User Status:** Real-time status updates to show if users are active, away, or offline.
- **Media Sharing:** Easily share images and media files within the chat.
- **Dark Mode UI:** A modern dark-themed interface for better usability.
- **Scroll to Bottom:** Automatic scroll to the latest message upon loading new messages.

## 🛠️ Technologies Used

- **React:** Building the UI components and structure.
- **TypeScript:** Type-safe code for enhanced reliability and maintainability.
- **Firebase:** Backend services for authentication, real-time database, and cloud storage.
- **Firestore:** Efficient data storage and synchronization for chat functionalities.
- **Zustand:** Lightweight state management for handling application state efficiently.
- **Tailwind CSS:** Utility-first CSS framework for fast and responsive styling.
- **Vite.js:** Fast build tool and development server for a modern frontend experience.

## 📂 Project Structure
.
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── public
│   ├── *.png, *.jpg, *.svg  # Image assets for the app
├── src
│   ├── App.tsx
│   ├── assets               # Asset management
│   ├── components           # Reusable UI components
│   │   ├── chat             # Chat-related components
│   │   ├── detail           # Detail view components
│   │   ├── list             # List view components
│   │   ├── login            # Login component
│   │   └── notification     # Notification management
│   ├── index.css            # Global styles
│   ├── lib                  # Firebase, Zustand, and utility functions
│   ├── main.tsx             # Entry point of the application
│   └── vite-env.d.ts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** or **yarn**
- **Firebase Account** with Firestore, Authentication, and Storage enabled

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chatapp.git
   cd chatapp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your Firebase project:

- Create a Firebase project at Firebase Console.
- Enable Firestore, Authentication, and Storage.
- Copy your Firebase configuration settings.

4. Create a .env file in the root directory with your Firebase configuration:
  ```bash
  VITE_API_KEY=your-firebase-api-key
  ```
5. Start the application:
  ```bash
  npm run dev
  ```