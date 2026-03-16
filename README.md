# Koken Met Stefan 🍳

**Koken Met Stefan** is a modern, responsive recipe management application. This is a personal project where I have applied the full-stack development principles learned during my journey through [The Odin Project](https://www.theodinproject.com/). It serves as a personal digital cookbook with advanced filtering and real-time search capabilities.

## ✨ Features

* **Global Search:** Filter recipes by title or ingredients instantly (active after 3 characters).
* **Smart Filtering:** Sort recipes by cuisine type and source simultaneously.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.
* **State Management:** Built using React Context API for a seamless, "zero-prop-drilling" search experience.
* **Dynamic Routing:** Individual recipe pages with detailed ingredient lists and step-by-step instructions via `react-router-dom`.
* **Handcrafted UI:** Features a vibrant brand palette and custom typography.

## 🛠️ Tech Stack

* **Frontend Framework:** React 19 (Vite)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Routing:** React Router v7
* **Fonts:**
    * [Gaegu](https://fonts.google.com/specimen/Gaegu) via Google Fonts.
    * [Delight Typeface](https://rajputrajesh-448.gumroad.com/l/Delight9) by **Rajesh Rajput**.

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher recommended)
* npm or yarn

### Installation

1. **Fork the repository:**
   Click the **Fork** button at the top right of this page to create a copy of the project in your own account.

2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/koken-met-stefan.git
   cd koken-met-stefan
   ```

3. **Install dependencies:**
   `npm install`

4. **Start the development server:**
   `npm run dev`

## 📂 Project Structure

```text
.
├── public/           # Static assets (favicon, etc.)
├── src/
│   ├── assets/       # Fonts and local images
│   ├── components/   # Reusable UI components (Header, Navbar, RecipeCard)
│   ├── context/      # SearchContext and custom hooks
│   ├── data/         # Local recipe JSON data
│   ├── pages/        # Page-level components (Home, RecipeDetail, RecipeList)
│   ├── App.jsx       # Root component and routing
│   ├── index.css     # Global styles and Tailwind v4 config
│   └── main.jsx      # Entry point
├── .pretterrc        # Code formatting rules
├── eslint.config.js  # Linting configuration
├── index.html        # HTML template
├── package.json      # Dependencies and scripts
└── vite.config.js    # Vite configuration
```

## 🤝 Contributing

This is a personal learning project.

* **No Direct Pushes:** I do not accept direct contributions or Pull Requests to his repository.
* **Forks Welcome:** You are encouraged to fork this repository to use as a reference or to experiment with your own changes.

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.