# 🎓 Training & Placement Cell - GEC Siwan

A modern web application built to manage and showcase Training & Placement activities at Government Engineering College, Siwan.

---

## 🌐 Deployment Links

- **Live:** [https://training-and-placement-cell-gec-siwan.vercel.app/](https://training-and-placement-cell-gec-siwan.vercel.app/)
- **Pre-Production (Preview):** [https://preview-tpcellgecsiwan.vercel.app/](https://preview-tpcellgecsiwan.vercel.app/)

---

## 👤 Project Owner

**Md. Azad**  
📧 Email: [collezian@gmail.com](mailto:collezian@gmail.com)  
📱 Contact / WhatsApp: +91 9119172886  
🔗 GitHub: [@themdazad](https://github.com/themdazad)

---

## 👥 Contributions

**Frontend Developer**  
_(Add your name here)_

---

## Naming Conventions

| Element                        | Convention        | Example                       |
|--------------------------------|-------------------|-------------------------------|
| Components & Containers        | `PascalCase`      | `UserProfile`, `SidebarMenu`  |
| Variables, Functions, Utils    | `camelCase`       | `getUserData`, `formatDate`   |
| Routes & views                 | `kebab-case`      | `user-dashboard.js`           |
| Constants / ENV Variables      | `UPPER_CASE`      | `API_URL`, `JWT_SECRET`       |

> **Note**: Follow naming conventions strictly to maintain readability and consistency.

---

## 📂 Folder Structure

├── public/ # Static assets (HTML, favicon, etc.)
│
└── src/ # Application source code
├── assets/ # Static resources (non-code)
│ ├── data/ # JSON or mock data
│ └── images/ # Image assets
│
├── components/ # Global reusable components (incl. third-party UI)
│
├── api/ # Centralized API call handlers
│
├── hooks/ # Custom React hooks
│
├── modules/ # Feature-based modules by role
│ ├── admin/ # Admin-specific logic
│ │ ├── components/ # Admin-specific components
│ │ ├── views/ # Admin-specific views
│ │ └── styles/ # Admin page styles
│ │
│ ├── student/
│ │
│ └── web/ 
│
├── routes/ # Role-based routing
│ ├── example-admin-routes.js
│ ├── example-student-routes.js
│ └── example-web-routes.js
│
├── utils/ # Utility and helper functions
│
├── index.css # Global stylesheet
│
└── main.jsx # Application entry point


---

## 📦 Packages & Dependencies

Below are the key packages used in the project:

### 🧩 UI & Components
- `@heroui/accordion`: `2.2.8` – Accordion component from HeroUI
- `@heroui/card`: `^2.2.10` – Card components from HeroUI
- `@heroui/react`: `2.6.14` – Core HeroUI React components
- `@shadcn/ui`: `^0.0.4` – Headless, themeable components (based on Radix UI)
- `lucide-react`: `^0.474.0` – Beautiful icons in React

### 📊 Data & Exporting
- `papaparse`: `^5.5.2` – Fast CSV parser for client-side usage
- `jspdf`: `^3.0.1` – Generate PDF documents in the browser
- `html2canvas`: `^1.4.1` – Screenshots from DOM elements

### 🔁 HTTP & Storage
- `axios`: `^1.7.9` – Promise-based HTTP client
- `js-cookie`: `^3.0.5` – Simple cookie handling
- `react-storage-complete`: `^1.1.10` – React hooks for local/session storage

### 🧠 Animation & Effects
- `framer-motion`: `^11.2.10` – Animation library for React
- `react-blaze-slider`: `^1.7.2` – Lightweight and flexible slider
- `swiper`: `^11.2.1` – Touch slider library

### ⚙️ Routing & Notifications
- `react-router-dom`: `^6.30.0` – Routing for React apps
- `react-toastify`: `^11.0.5` – Toast notifications

### 🔧 Core Libraries
- `react`: `^18.2.0`
- `react-dom`: `^18.2.0`
- `react-icons`: `^5.1.0`

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/your-project-name.git

# Install dependencies
npm install

# Start the development server
npm run dev