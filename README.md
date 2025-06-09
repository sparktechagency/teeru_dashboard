# 🖥️ Teeru Dashboard (Frontend)

The **Teeru Dashboard** is a modern web-based admin panel built with **React 19**, **TypeScript**, **Vite**, and **Ant Design**. It serves as the frontend interface for managing users, events, and system settings for the Teeru platform.

---

## 📦 Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Ant Design (v5)**
- **Redux Toolkit + Redux Persist**
- **Tailwind CSS**
- **React Router v7**
- **Axios**
- **Jodit React Editor**
- **DayJS** for date formatting
- **JWT Decode**, **JS Cookie** for auth
- **Recharts** for chart visualization
- **Sonner**, **React Spinners**, and more

---

## 🗂️ Project Structure

src/
├── Components/ # Reusable components
├── helpers/ # Utility functions
├── lib/ # External integrations or libs
├── pages/ # Application pages
├── redux/ # Redux store, slices
├── Routes/ # Route definitions
├── theme/ # Theme customization
├── types/ # Custom TypeScript types
├── ui/ # UI primitives (buttons, inputs)
├── utils/ # Additional utilities
├── App.tsx # Root component
├── main.tsx # App entry point
├── vite-env.d.ts # Vite environment types

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/teeru-dashboard.git
cd teeru-dashboard
2. Install Dependencies
Using Yarn:

bash
Copy
Edit
yarn install
Or using npm:

bash
Copy
Edit
npm install
3. Create Environment File
Copy .env.example to .env:

bash
Copy
Edit
cp .env.example .env
Update the VITE_PUBLIC_SERVER_URL with your backend URL:

env
Copy
Edit
VITE_PUBLIC_SERVER_URL=http://<server_ip>:<port>/api/v1  # Replace with your actual VPS IP and port
🧪 Available Scripts
Command	Description
yarn dev	Start development server with hot reload
yarn build	Build the app for production
yarn preview	Preview production build
yarn lint	Lint the project using ESLint

🖼️ UI Features
Responsive dashboard layout

User authentication using JWT

Real-time charts and analytics (via Recharts)

Rich text editor for descriptions (Jodit)

Redux-managed global state

Modular component architecture

Customizable theming with Tailwind + AntD

📩 Contact
👤 Rasel Chowdhury
📧 rasel@example.com (replace with your actual email)

📃 License
This project is licensed under the ISC License.

yaml
Copy
Edit

---

Let me know if you want it saved as a file or need deployment instructions added (e.g., for Vercel, Netlify, or VPS).