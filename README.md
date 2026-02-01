# HackIt

# 26 JAN PROMPT CHALLENGE 2026 - 

🌾 The Multilingual Mandi

A Real-Time Linguistic Bridge for Local Trade
Hackathon Project | AI + Full-Stack | Voice-First | Multilingual

**Live Demo**
Click this to view the project - https://mandi-lingua-bridge.lovable.app/
Click this to view the project video - https://drive.google.com/file/d/1ToMuZ1n8dZRWuvHXILNWIvMMdvvujX60/view?usp=sharing4

#  Problem Statement
Local mandi (market) ecosystems suffer from multiple challenges:

--Language barriers between farmers, vendors, and buyers <br>
--Unfair or unclear price discovery due to lack of transparency <br>
--Inefficient negotiations that depend on middlemen <br>
--Low literacy & digital comfort, making text-heavy apps unusable <br>
--Limited access to real-time market intelligence <br>
--These issues reduce farmers’ income and slow down local trade. <br>

# Solution Overview
The Multilingual Mandi is a mobile-first, AI-powered web platform that enables fair, transparent, and inclusive local trade by acting as a real-time linguistic and negotiation bridge.
Key Highlights <br>
🌐 Multilingual communication (Tamil, Hindi, English, Telugu, Kannada) <br>
🎙️ Voice-first interaction for semi-literate users <br>
🤖 AI-driven price discovery using mandi data <br>
💬 AI-assisted negotiation chatbot <br>
📱 Vendor-friendly mobile UI <br>
👥 User Roles <br>


1️⃣ Vendor (Farmer / Seller)
Login via mobile OTP or email <br>
Add products with quantity & expected price <br>
Speak product details using voice <br>
View AI-recommended fair prices <br>

2️⃣ Buyer (Trader / Shopkeeper)
Browse products by crop, price, and location <br>
Chat & negotiate in preferred language <br>
Use voice or text for communication <br>
Get AI-suggested counter-offers <br>
Negotiate with buyers in own language <br>

# Core Features

1) Multilingual Support
Auto language detection
Real-time text & voice translation
Language-specific UI and AI responses

3) AI-Powered Negotiation
Suggests fair counter-prices
Warns against unfair pricing
Maintains polite, local-market tone
Responds in user’s language

3) AI Price Discovery
Uses crop, location & season
Predicts Min / Fair / Max price
Confidence scoring included
Rule-based fallback if data is limited

4) Voice Capabilities
Voice → Text (speech input)
Text → Voice (AI replies)
Optimized for low-bandwidth rural usage

# React
A modern React-based project utilizing the latest frontend technologies and tools for building responsive web applications.

##  Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup

## Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
   
2. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 📁 Project Structure

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

##  Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

##  Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

##  Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


##  Deployment

Build the application for production:

```bash
npm run build
```
