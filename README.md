<div align="center">
  <img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logo=react&logoColor=white&color=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logo=appwrite&logoColor=white&color=FD366E" alt="Appwrite" />
  <img src="https://img.shields.io/badge/NativeWind-black?style=for-the-badge&logo=tailwindcss&logoColor=white&color=06B6D4" alt="NativeWind" />
  
  <h1 align="center">✨ Aora - Video Sharing App ✨</h1>
  <p>Your gateway to seamless video sharing and social engagement!</p>
</div>

---

## 📖 Table of Contents

1. ⚙️ [Tech Stack](#tech-stack)
2. 🌟 [Features](#features)
3. 🚀 [Getting Started](#getting-started)
4. 🛠️ [Environment Setup](#environment-setup)
5. 🔗 [Links & Resources](#links)

---

## ⚙️ Tech Stack <a name="tech-stack"></a>

Aora leverages cutting-edge technologies to deliver a seamless and interactive experience:

- **React Native**
- **Expo**
- **NativeWind**
- **React Native Animatable**
- **Appwrite**

---

## 🌟 Features <a name="features"></a>

Aora is designed with modern users in mind. Explore our top-notch features:

- **🌅 Onboarding Screen:** Welcoming visuals with intuitive instructions for first-time users.
- **🔒 Secure Authentication:** Robust email login for protecting user data.
- **🏠 Dynamic Home Screen:** Animated flat list showcasing trending and new videos.
- **🔄 Pull-to-Refresh:** Simple gesture-based content refresh.
- **🔍 Real-Time Search:** Quickly find videos with instant suggestions and results.
- **🗂️ Tab Navigation:** Effortlessly switch between Home, Search, and Profile.
- **📤 Media Uploads:** Upload your favorite videos and images directly from the app.
- **👤 Profile Insights:** Personalized profiles with activity overview, follower count, and uploads.
- **📱 Responsive Design:** Optimized for all screen sizes and devices.
- **🎭 Engaging Animations:** Stunning UI interactions powered by Animatable.

---

## 🚀 Getting Started <a name="getting-started"></a>

Follow these steps to set up and run Aora on your local machine:

### **Prerequisites**

Ensure the following are installed:

- **[Git](https://git-scm.com/)**
- **[Node.js](https://nodejs.org/en)**
- **[npm](https://www.npmjs.com/)**

### **Clone the Repository**

```bash
git clone https://github.com/vinayakvispute/aora.git
cd aora
```

### **Install Dependencies**

```bash
npm install
```

### **Setup Environment Variables**

Refer to the [Environment Setup](#environment-setup) section below to configure your `.env` file.

### **Run the App**

```bash
npm start
```

### **Launch on Your Device**

- Download the [Expo Go](https://expo.dev/go) app.
- Scan the QR code from your terminal to run Aora instantly.

---

## 🛠️ Environment Setup <a name="environment-setup"></a>

To run Aora locally, you need to configure the environment variables. Here's how:

1. Rename `env.example` to `.env`:

   ```bash
   mv env.example .env
   ```

2. Update the variables in the `.env` file with your project-specific details. Below is an explanation of each variable:

   ```plaintext
   EXPO_PUBLIC_ENDPOINT=         # Your Appwrite API endpoint (e.g., https://example.com/v1)
   EXPO_PUBLIC_PLATFORM=         # Platform identifier (e.g., "web" or "mobile")
   EXPO_PUBLIC_PROJECT=          # Your Appwrite project ID
   EXPO_PUBLIC_DATABASEID=       # Database ID for Appwrite
   EXPO_PUBLIC_USERS_COLLECTIONID= # Collection ID for users
   EXPO_PUBLIC_VIDEOS_COLLECTIONID= # Collection ID for video data
   EXPO_PUBLIC_STORAGEID=        # Storage bucket ID for video/image uploads
   ```

   ### Sample `.env` File

   ```env
   EXPO_PUBLIC_ENDPOINT=https://your-appwrite-endpoint.com/v1
   EXPO_PUBLIC_PLATFORM=web
   EXPO_PUBLIC_PROJECT=your_project_id
   EXPO_PUBLIC_DATABASEID=your_database_id
   EXPO_PUBLIC_USERS_COLLECTIONID=your_users_collection_id
   EXPO_PUBLIC_VIDEOS_COLLECTIONID=your_videos_collection_id
   EXPO_PUBLIC_STORAGEID=your_storage_id
   ```

3. Save the `.env` file and restart the development server for changes to take effect.

---

## 🔗 Links & Resources <a name="links"></a>

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Animatable](https://github.com/oblador/react-native-animatable)
- [NativeWind](https://www.nativewind.dev/)
- [Appwrite](https://appwrite.io/)

---

<div align="center">
  <h3>💬 Let's Build the Future of Video Sharing with Aora! 💬</h3>
</div>
