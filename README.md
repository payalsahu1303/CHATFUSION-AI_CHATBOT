# ChatFusion – AI Chat Assistant

ChatFusion is an intelligent, modern web-based chatbot that uses Google's Gemini AI API to generate smart responses. It features a beautiful UI built with React, TailwindCSS, and ShadCN UI, along with Firebase Authentication for secure user login via Google OAuth.

**Deployed Link**: [ChatFusion](https://chatfusion-web.netlify.app/)

![image](https://github.com/user-attachments/assets/7b8f3938-8c50-4923-8ae1-ea1ffede8470)

---

## Features

- Google OAuth 2.0 authentication with Firebase  
- AI-powered conversation using Gemini API (`gemini-2.0-flash`)  
- Real-time chat interface with smooth scrolling  
- Responsive design for mobile and desktop  
- Modern UI with TailwindCSS and ShadCN  
- Chat history and logout menu with profile avatar  
- Gemini logo branding in AI responses  

---

## Tech Stack

- [React + Vite](https://vitejs.dev/)  
- [Firebase Authentication](https://firebase.google.com/)  
- [Google Generative AI SDK (Gemini)](https://ai.google.dev/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [ShadCN UI](https://ui.shadcn.dev/)  
- [Lucide Icons](https://lucide.dev/)  

---

## Project Structure

```
src/
├── components/
│   └── Chat.jsx          # Main chat interface
├── assets/
│   └── logo.png          # App icon/logo
├── App.jsx               # App entry point
├── main.jsx              # React DOM bootstrap
└── firebase.js           # Firebase configuration
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/payalsahu1303/CHATFUSION-AI_CHATBOT.git
cd CHATFUSION-AI_CHATBOT
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory based on the example below:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Start the App

```bash
npm run dev
```

---

## Firebase Setup Notes

1. Go to Firebase Console → Authentication → Sign-in method  
2. Enable Google sign-in  
3. In Authentication > Settings, add your development and deployment domains to the authorized domains list:

   - `localhost`
   - `your-app.vercel.app` or `customdomain.com`

---

## Gemini API Setup

1. Get access at [Google AI Studio](https://makersuite.google.com/app)  
2. Generate a Gemini API key  
3. Add it to `.env` as `VITE_GEMINI_API_KEY`

---

## License

This project is licensed under the MIT License.

---

## Credits

- [Google Generative AI SDK](https://github.com/google/generative-ai-js)  
- [Firebase](https://firebase.google.com/)  
- [Lucide Icons](https://lucide.dev/)  
- [ShadCN UI](https://ui.shadcn.dev/)

