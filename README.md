# 🩸 BloodBridge — Frontend

A full-stack blood donation platform connecting donors with recipients across Bangladesh. Built with **React 19**, **React Router v7**, **TailwindCSS v4**, and **Firebase Auth**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://assignment-11-frontend-pi.vercel.app/)
[![Frontend Repo](https://img.shields.io/badge/Frontend-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Toufiqul2022/Blood-Donation-App)
[![Backend Repo](https://img.shields.io/badge/Backend-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Toufiqul2022/Assignment-11-Backend)

---

## ✨ Features

- 🔐 **Role-based auth** — Admin / Donor / Volunteer with auto-redirect dashboards
- 📋 **Donation request management** — create, update & track donation requests
- 🗺️ **Location-based search** — filter by District & Upazila across Bangladesh
- 💰 **Payment / Funding** — Stripe-powered donation flow with success handling
- 🔒 **JWT-secured routes** — protected API calls with `useAxiosSecure` hook
- ⚡ **TanStack Query** — data fetching, caching & background sync
- 📝 **Blog system** — public blog listing page
- 🚨 **Emergency requests** — dedicated emergency blood donation page
- 📊 **Statistics & Highlights** — live stats and platform highlights sections

---

## 🛠 Tech Stack

| Layer         | Tech                        |
| ------------- | --------------------------- |
| Framework     | React 19, React Router v7   |
| Styling       | TailwindCSS v4, DaisyUI v5  |
| Auth          | Firebase v12                |
| Data Fetching | TanStack Query v5, Axios    |
| Payment       | Stripe (via backend)        |
| Notifications | React Toastify, SweetAlert2 |
| Icons         | React Icons v5              |
| Build Tool    | Vite v7                     |

---

## 📁 Project Structure

```
src/
├── assets/               # Static images
├── components/           # Navbar, Footer, Aside, DonateModal
├── DashboardLayout/      # Dashboard wrapper layout
├── Firebase/             # Firebase config & auth init
├── hooks/                # useAxios, useAxiosSecure
├── Pages/
│   ├── Dashboard/        # Admin, Donor, Volunteer dashboards
│   ├── Payment/          # PaymentSuccess page
│   ├── Home, Login, Register, Blogs, Donate ...
├── Provider/             # AuthProvider (context)
├── RootLayout/           # Root layout wrapper
├── routes/               # Router config & PrivateRoute
├── config.js             # Backend API base URL
└── main.jsx              # App entry point
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Toufiqul2022/Blood-Donation-App.git
cd Blood-Donation-App
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root and add your Firebase credentials:

```env
VITE_ApiKey=your_firebase_api_key
VITE_AuthDomain=your_project.firebaseapp.com
VITE_ProjectId=your_project_id
VITE_StorageBucket=your_project.firebasestorage.app
VITE_MessagingSenderId=your_sender_id
VITE_AppId=your_app_id
```

> 🔑 Get these values from your [Firebase Console](https://console.firebase.google.com/) → Project Settings → Your Apps.

---

### 4. Configure Backend URL

Open `src/config.js` and update the API URL if you're running the backend locally:

```js
// src/config.js
export const API_URL = "http://localhost:5000"; // local backend
// or keep the deployed URL:
// export const API_URL = "https://assignment-11-backend-alpha.vercel.app";
```

---

### 5. Run the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 📜 Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint checks                |

---

## 🔐 User Roles & Dashboards

| Role          | Dashboard Route        | Access                                     |
| ------------- | ---------------------- | ------------------------------------------ |
| **Admin**     | `/dashboard/admin`     | All users, all requests, platform overview |
| **Donor**     | `/dashboard/donor`     | My requests, add request, profile          |
| **Volunteer** | `/dashboard/volunteer` | All blood donation requests                |

After login, users are automatically redirected to their respective dashboard.

---

## 🌐 Key Routes

| Route           | Description                       |
| --------------- | --------------------------------- |
| `/`             | Home page                         |
| `/login`        | Login                             |
| `/register`     | Register                          |
| `/search`       | Search blood requests by location |
| `/requests`     | All blood donation requests       |
| `/requests/:id` | Request detail (private)          |
| `/funding`      | Donation / payment page (private) |
| `/blogs`        | Blog listing                      |
| `/emergencyReq` | Emergency requests                |
| `/dashboard/*`  | Role-based dashboards (private)   |

---

## 🚀 Deployment

This project is deployed on **Vercel**.

To deploy your own:

1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add all `VITE_*` environment variables in the Vercel dashboard
4. Deploy — Vercel auto-detects Vite and sets the build command

---

## 🔗 Related

- **Backend Repo:** https://github.com/Toufiqul2022/Assignment-11-Backend
- **Live Demo:** https://assignment-11-frontend-pi.vercel.app/

---

## 👨‍💻 Author

**Md. Toufiqul Islam**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/toufiqul-islambd/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=flat&logo=gmail&logoColor=white)](mailto:toufiqul8865@gmail.com)
