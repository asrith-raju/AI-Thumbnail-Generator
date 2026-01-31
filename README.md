# AI Thumbnail Generator

## Description

**AI Thumbnail Generator** is a full-stack web application that helps content creators generate **high-quality, click-worthy YouTube thumbnails** using AI.
Users can log in, customize thumbnail preferences (style, colors, aspect ratio, text overlay), generate thumbnails using **Google Gemini AI**, and manage their generated thumbnails in a personalized dashboard.

This project is built collaboratively, with a modern **React + Vite frontend** and a **Node.js + Express backend**, integrated with **MongoDB**, **ImageKit**, and **Gemini AI**.

---

## Features

* 🔐 User authentication with session-based login
* 🎨 AI-powered thumbnail generation using **Gemini API**
* 🖼️ Image storage and delivery via **ImageKit**
* 🧠 Smart prompt generation for accurate thumbnails
* 📐 Aspect ratio, style, color scheme, and text overlay selection
* 📂 User dashboard to view and manage generated thumbnails
* 🖥️ YouTube thumbnail preview mode
* 🌐 Fully responsive modern UI
* ⚡ Smooth animations and transitions

---

## Project Structure

```
AI-Thumbnail-Generator/
│
├── client/                  # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/           # Images & static assets
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # App pages
│   │   ├── sections/         # Landing page sections
│   │   ├── context/          # Auth context
│   │   ├── data/             # Static data (pricing, features, etc.)
│   │   └── configs/          # Axios API config
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
│
├── server/                  # Backend (Node.js + Express)
│   ├── configs/             # DB, Gemini, ImageKit configs
│   ├── controllers/         # Route controllers
│   ├── middlewares/         # Auth middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Prompt generation logic
│   ├── .env.example
│   ├── server.ts
│   └── package.json
│
└── README.md
```

---

## Technologies Used

### Frontend

* React 19
* Vite
* TypeScript
* Tailwind CSS
* Axios
* React Router
* Framer Motion
* Lenis (smooth scrolling)

### Backend

* Node.js
* Express
* TypeScript
* MongoDB & Mongoose
* express-session
* connect-mongo
* Google Gemini API (via OpenAI-compatible SDK)
* ImageKit
* Axios

---

## Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/AI-Thumbnail-Generator.git
cd AI-Thumbnail-Generator
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create `.env` using `.env.example`:

```env
PORT=5000
SESSION_SECRET=your_session_secret_here

MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

GEMINI_API_KEY=your_gemini_api_key_here

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key_here
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key_here
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

FRONTEND_URL=http://localhost:5173
```

Run backend:

```bash
npm run server
```

---

### 3️⃣ Setup Frontend

```bash
cd ../client
npm install
```

Create `.env` using `.env.example`:

```env
VITE_BASE_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

## Demo (Live Links)

* 🌐 **Demo**:  [https://ai-thumbnail-generator-rust.vercel.app](https://ai-thumbnail-generator-rust.vercel.app)

---

## License

This project is licensed under the **MIT License**.
See the [`LICENSE.md`](./LICENSE.md) file for details.

---

## Contributing

Contributions are welcome! 🚀

Please read the [`CONTRIBUTING.md`](./CONTRIBUTING.md) file for guidelines on:

* Branch naming
* Commit conventions
* Pull request process

---

## Authors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/laxman-thedev">
        <img src="https://github.com/laxman-thedev.png" width="80" height="80" style="border-radius: 50%;" />
        <br />
        <sub><b>Laxman</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/asrith-raju">
        <img src="https://github.com/asrith-raju.png" width="80" height="80" style="border-radius: 50%;" />
        <br />
        <sub><b>Asrith Raju</b></sub>
      </a>
    </td>
  </tr>
</table>

---