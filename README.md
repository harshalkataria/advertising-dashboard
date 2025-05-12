# Advertising Dashboard (MVP)

A minimal advertising campaign dashboard built with React 19 and Vite 6.  
This single-page application allows users to authenticate, access a dashboard, create and manage ad campaigns with targeting options, and view basic campaign metrics.

---

## 🚀 Features

- 🔐 Authentication system with protected routes
- 📊 Dashboard interface with campaign management
- 📝 Campaign creation with banner uploads and targeting options
- 🌍 Location targeting across countries, regions, and cities
- 📈 Basic campaign metrics (impressions, clicks, CTR)
- 📱 Modern responsive design with Tailwind CSS
- 🚀 React 19 with latest hooks and patterns

---

## 🧠 Built With

- **Frontend:** React 19 + Vite 6
- **Routing:** React Router 7
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Persistence:** localStorage (no backend)
- **Linting:** ESLint 9

---

## 🧪 How to Run Locally

```bash
git clone [your-repository-url]
cd advertising-dashboard
npm install
npm run dev
```

> Access the app at `http://localhost:5173`

---

## 📦 Project Structure

```
advertising-dashboard/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── LoginForm.jsx    # Authentication form
│   │   └── ProtectedRoute.jsx # Route protection component
│   ├── pages/              # App pages
│   │   ├── LoginPage.jsx    # Login page
│   │   └── DashboardPage.jsx # Main dashboard
│   ├── context/            # App-wide state
│   │   └── AuthContext.jsx  # Authentication context
│   ├── utils/              # Helper functions
│   ├── assets/             # Images and other assets
│   ├── App.jsx             # Main app component with routing
│   └── main.jsx            # Entry point
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.cjs     # Tailwind CSS configuration
├── postcss.config.cjs      # PostCSS configuration
├── package.json            # Dependencies and scripts
├── CHANGELOG.md            # Version history
└── README.md               # Project documentation
```

---

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

---

## 🔒 Authentication

The app uses a simulated authentication system with React Context API and localStorage for persistence. User sessions are protected with the ProtectedRoute component.

---

## 🚧 Development Status

This project is currently in active development with the following components implemented:

- Authentication system
- Basic routing structure
- Login interface
- Dashboard with campaign cards
- Campaign creation functionality
- Banner upload and URL linking
- Targeting options (location, age, interests)
- Basic campaign metrics display

Upcoming features:

- Campaign analytics enhancement
- Campaign performance reporting
- Admin user management

---

## 📚 Dependencies

- React 19
- React Router 7
- Tailwind CSS
- Vite 6
- ESLint 9
