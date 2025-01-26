# DONORA 🩸

# [🚀 Live site link](https://sritys-donora.netlify.app/)


# 💉 Blood Donation Management System (Frontend)

Welcome to the **Blood Donation Management System** frontend! This application is designed to connect blood donors and recipients seamlessly. It provides a user-friendly interface for managing donations, requests, and related activities.

---

## 📚 Table of Contents

- [🎯 Features](#features)
- [💻 Technologies Used](#technologies-used)
- [🛠️ Installation](#installation)
- [🚀 Usage](#usage)
- [🌱 Contributing](#contributing)
- [📄 License](#license)

---

## 🎯 Features

- **🔐 User Authentication**: Firebase-based authentication (supports email/password and third-party providers).
- **💳 Stripe Integration**: Secure payment processing with Stripe.
- **📱 Responsive Design**: Mobile-friendly interface powered by **Tailwind CSS** and **DaisyUI**.
- **📊 Dashboard**: Robust dashboard for administrators, volunteers, and users to manage operations.
- **📝 Blog Management**: Create, view, update, and delete blog posts.
- **👥 Role-Based Access Control (RBAC)**: Different features for admins, volunteers, and regular users.
- **🌙 Dark Mode**: Toggle between light and dark themes using Tailwind's dark mode feature.
- **🖼️ Image Upload**: Upload images via **imgbb API**.
- **🎬 Interactive Animations**: Beautiful animations with **Framer Motion** and **AOS**.
- **📈 Charts**: Visualize data using **Recharts**.

---

## 💻 Technologies Used

### Core Libraries
- **React**: Component-based UI framework for building the user interface.
- **React Router DOM**: Powerful routing and navigation library.
- **React Hook Form**: Efficient form handling and validation.

### Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid design and customization.
- **DaisyUI**: Pre-styled components for Tailwind CSS to speed up UI development.

### State Management and Queries
- **React Query**: A powerful library for data fetching, caching, and server state management.

### Backend Integration
- **Axios**: Promise-based HTTP client for making API calls.

### Animations
- **Framer Motion**: Smooth and interactive animations.
- **AOS (Animate on Scroll)**: Scroll-triggered animations for enhanced user experience.

### Additional Tools
- **Firebase**: Authentication and user management.
- **SweetAlert2**: Beautiful and customizable pop-up alerts.
- **React Icons**: A collection of icons to enhance the UI.
- **React Helmet**: For managing the `<head>` of the document dynamically.
- **React Loader Spinner**: Loading spinners to improve UX during data fetching.
- **imgbb API**: Image hosting and uploading service.

---

## 🛠️ Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Rahima-Akter.git
cd blood-donation-frontend
```
### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
- **Create a .env file at the root of your project and set up the following variables -->**
```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_STRIPE_PUBLIC_KEY=
VITE_IMGBB_API_KEY=
```

### Step 4: Start the Development Server
```bash
npm run dev
```

### 🎉 Acknowledgments
- **Firebase**: for seamless authentication and user management.
- **Stripe**: for secure payment integrations.
- **Tailwind**: CSS and DaisyUI for rapid UI development.
- **React Query**: for managing server state efficiently.

