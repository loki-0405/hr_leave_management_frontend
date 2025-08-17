# 🚀 HR Leave Management Frontend (React + Vite + ShadCN + TypeScript)

This is the frontend for the **HR Leave Management System**, built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **ShadCN UI** components. It supports modern UI patterns, dynamic forms, charts, routing, theme switching, and more.

---

## 📦 Tech Stack
==================

- ✅ Vite (blazing fast build tool)
- ✅ React 18
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ ShadCN UI (Radix + Tailwind components)
- ✅ React Router
- ✅ React Hook Form + Zod for validation
- ✅ React Query for data fetching
- ✅ Lucide Icons, Charts, Carousels, Dialogs, etc.

---

## 📁 Project Structure

├───components
│   ├───dashboard
│   ├───layout
│   └───ui
├───hooks
├───lib
└───pages
    ├───employee
    └───hr

---

## 🛠️ Setup Instructions

### 1. 📥 Clone the Repository
=================================

bash
git clone https://github.com/loki-0405/hr_leave_management_frontend.git
cd hr_leave_management_frontend


2. 📦 Install Dependencies
 ===========================
Make sure you have Node.js ≥ 18 installed. Then:
npm install
# or
yarn install

🚧 Development Server
   =======================
Start the local development server:

npm run dev
# or
yarn dev
Visit: http://localhost:5173

🛠️ Available Scripts
======================
Script	                     Description
npm run dev	                Start development server
npm run build              	Build for production
npm run lint               	Run ESLint checks
npm run                     preview	Preview production build locally

🖌️ Styling & UI
==================
Tailwind CSS: Utility-first styling.

ShadCN UI: Pre-built components powered by Radix.

Themes supported with next-themes.

🔒 Auth & API
================
Integrate with backend APIs (via Axios or fetch in /lib/api).

Token storage (localStorage or cookies).

Form validation with zod.

📊 Features
=================
✅ Role-based dashboard UI

✅ Form handling with validation

✅ Dynamic routing and layouts

✅ Recharts integration

✅ Modal/Dialog/Tooltip components

✅ Dark/light mode support
