<img width="3188" height="1202" alt="frame (3)" src="https://github.com/user-attachments/assets/517ad8e9-ad22-457d-9538-a9e62d137cd7" />


# അരികിൽ vibe-o-meter
# Team Info:
Team Lead : Shreya Padmakumar - NSS College of Engineering Palakkad

Member 2 : Anagha K - NSS College of Engineering Palakkad

# Project Description
അരികിൽ vibe-o-meter is an AI-powered web application that analyzes your photo to determine your overall “vibe,” providing a rating along with humorous and witty feedback. It combines advanced image analysis with playful commentary for an engaging and entertaining experience.


# The Problem (that doesn't exist)
In the age of social media, people often wonder how they are perceived by others based on their appearance, expressions, or style. However, there is no fun and engaging way to get instant, light-hearted feedback about one’s “vibe.” അരികിൽ vibe-o-meter addresses this gap by offering an AI-powered tool that humorously evaluates and rates a person’s vibe from a photo, making self-expression and perception analysis both entertaining and interactive.


# The Solution (that nobody asked for)
അരികിൽ vibe-o-meter uses AI-based face and emotion detection to analyze a user’s expression and generate a set of playful, percentage-based “vibe meters.” These meters—such as Sass Index, Main Character Energy, and Drama Magnet—are paired with witty, light-hearted responses, turning emotion recognition into an entertaining, shareable experience. The platform offers an engaging way to explore self-expression while keeping the tone humorous and user-friendly.


# Technical Details
Technologies/Components Used
Languages : JavaScript (ES6+), HTML5, CSS3, Node.js

Frameworks : Express.js

APIs/Libraries : @google/generative-ai (Google Gemini Pro Vision API), cors, dotenv

Tools : VS Code, Git & GitHub, npm


# Implementation
For Software :
# Installation
```bash 
git clone https://github.com/ShreyaPadmakumar/vibechecker.git
```

# Clone the repository
```bash
https://github.com/ShreyaPadmakumar/vibechecker.git
```

# Navigate to the project folder
```bash
cd vibechecker
```

# Install backend dependencies
```bash
npm install
```

# Create a .env file with your Gemini API key
echo "GEMINI_API_KEY=YOUR_API_KEY_HERE" > .env

# Start the backend server
```bash
node server.js
```

# Open index.html in your browser to use the app
How it Works

User uploads a photo and selects a mode (Compliment, Extreme Roast, Chaos, etc.).

Front-end sends the image and mode to the Node.js backend.

Backend calls Google Gemini Vision AI with a custom prompt based on the mode.

AI returns a JSON response analyzing the vibe with scores and witty commentary.

Front-end displays the results with vibe score, category, roast, and fun meters.

# Run
```
node server.js
```

# Project Documentation
For Software:

# Screenshots (Add at least 3)
![demo 2](https://github.com/user-attachments/assets/f69c549f-c456-4327-b80e-9d4fa60d1c78)

![demo 1](https://github.com/user-attachments/assets/74282255-5dfe-4e17-bd88-d2415d4db4bd)

![WhatsApp Image 2025-08-09 at 6 56 14 AM (1)](https://github.com/user-attachments/assets/a5f59426-4838-4d7f-9ffa-6263ce73fbf9)

![WhatsApp Image 2025-08-09 at 6 56 14 AM](https://github.com/user-attachments/assets/0ec5f56e-3611-4e15-b0fa-cbec40088a4f)


# Project Demo
# Video
(https://drive.google.com/file/d/1e4tL8HieCR-xHuME4Kvjm43kIfaKTxAq/view?usp=drive_link)

# Team Contributions
Shreya Padmakumar : Backend server, Gemini API integration, server logic.

Anagha K : Front-end development, AI prompt engineering, documentation


# Project URL or Live Demo:
https://vibechecker-sigma.vercel.app/

Made with ❤️ at TinkerHub Useless Projects
