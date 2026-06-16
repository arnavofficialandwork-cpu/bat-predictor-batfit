# 🏏 BatFit — Cricket Bat Predictor
# Frontend- https://batfit-frontend.vercel.app/
# Backend- https://batfit-backend.vercel.app/


BatFit is a full stack web application that recommends the most suitable cricket bat for a player based on their batting profile, physical attributes, playing style, and budget.

---

## 🚀 Features

- 🧠 **Smart Bat Matching Engine** — scores and ranks bats based on 10+ player attributes
- 📊 **Top 3 Recommendations** — returns the best 3 bats with compatibility percentage
- 📋 **Player Profile Card** — displays a summary of the player's batting profile
- 🖨️ **Downloadable BatFit Report** — printable PDF-style assessment report
- 💸 **Budget-Aware** — filters and penalises bats outside the player's budget

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Axios, CSS |
| Backend | Node.js, Express.js |
| Data | Custom bat dataset (`data.js`) |
| Environment | dotenv |

---

## 📁 Project Structure

```
bat-predictor-batfit/
├── BATFIT/          # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
├── BACKEND/         # Express backend
│   ├── index.js
│   ├── data.js
│   └── package.json
└── .gitignore
```

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/arnavofficialandwork-cpu/bat-predictor-batfit.git
cd bat-predictor-batfit
```

### 2. Start the Backend
```bash
cd BACKEND
npm install
node index.js
```
Backend runs at: `http://localhost:3001`

### 3. Start the Frontend
```bash
cd BATFIT
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## 🧩 How It Works

1. Player fills in their profile — height, age, budget, batting style, strength, weakness etc.
2. Frontend sends the data to the backend via a `POST /players` request
3. Backend scores every bat in the database against the player's profile
4. Top 3 bats are returned with a **compatibility percentage**
5. Player can view their profile card, bat recommendations, and download a full report

---

## 📬 API Endpoint

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/players` | Submit player profile, returns top 3 bat recommendations |

### Example Request Body
```json
{
  "name": "Arnav",
  "height": "175",
  "age": "18",
  "budget": "200",
  "handleShape": "Oval",
  "weightPreference": "Medium",
  "battingStyle": "Front Foot",
  "playingLevel": "Club",
  "battingApproach": "Vertical Bat",
  "strength": "Timing",
  "battingweakness": "Spin"
}
```

---

## 🙌 Author

Made with ❤️ by [arnavofficialandwork-cpu](https://github.com/arnavofficialandwork-cpu)
