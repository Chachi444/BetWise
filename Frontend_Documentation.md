# BetWise Frontend Documentation

This document provides a breakdown of the BetWise frontend, including features, file structure, main components, and dependencies. Use this as a reference to understand, maintain, and help extend the project.

## Table of Contents

- [BetWise Frontend Documentation](#betwise-frontend-documentation)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [File \& Folder Structure](#file--folder-structure)
  - [Key Components](#key-components)
    - [`App.js`](#appjs)
    - [`LandingPage.js`](#landingpagejs)
    - [`Navbar.js`](#navbarjs)
    - [`LoginPage.js` \& `SignUpPage.js`](#loginpagejs--signuppagejs)
    - [`HomeBody.js`](#homebodyjs)
    - [`SportPage.js`](#sportpagejs)
    - [`DepositPage.js`, `WithdrawPage.js`, `ManualDeposit.js`, `PaystackDeposit.js`](#depositpagejs-withdrawpagejs-manualdepositjs-paystackdepositjs)
    - [`Profile.js`](#profilejs)
    - [`TransactionHistory.js`](#transactionhistoryjs)
    - [`Notification.js`](#notificationjs)
    - [`Leaderboard.js`](#leaderboardjs)
    - [`ReferFriend.js`](#referfriendjs)
    - [`AIChat.js`](#aichatjs)
    - [`Support.js`](#supportjs)
  - [Routing](#routing)
  - [State Management](#state-management)
  - [API Integration](#api-integration)
  - [Styling](#styling)
  - [Dependencies \& Installation](#dependencies--installation)
    - [Main Dependencies](#main-dependencies)
    - [Install All Dependencies](#install-all-dependencies)
  - [How to Run](#how-to-run)
  - [Extending the App](#extending-the-app)
  - [Tips](#tips)

## Project Overview

BetWise is a sports betting platform frontend built with React. It provides a modern, responsive UI for users to register, log in, view matches, place bets, manage their wallet, and more.

## Features

**Landing Page**: Carousel, top matches, feature cards, and a minimal navbar.
**Authentication**: Sign Up, Login, Logout, Reset Password.
**Protected Routes**: Only accessible when logged in (e.g., Home, Profile, Wallet).
**Top Matches**: Display of current sports matches with odds.
**Sports Pages**: Soccer, Basketball, Tennis, Virtuals, Casino, eSports, Specials.
**Wallet**: Deposit, Withdraw, Transaction History.
**Notifications**: User notifications.
**Leaderboard**: View top users.
**Refer a Friend**: Referral system.
**AI Chat**: Chatbot for support or tips.
**Support**: Contact/help page.
**Profile**: User profile management.
**Responsive Design**: Works on desktop and mobile.

## File & Folder Structure

betwise-frontend/
│
├── public/
│ └── index.html
│
├── src/
│ ├── assets/
│ │ └── logo.png
│ ├── Components/
│ │ ├── AuthenticatedLayout.js
│ │ ├── CasinoPage.js
│ │ ├── DepositPage.js
│ │ ├── HomeBody.js
│ │ ├── Leaderboard.js
│ │ ├── LandingPage.js
│ │ ├── LoginPage.js
│ │ ├── ManualDeposit.js
│ │ ├── MyBet.js
│ │ ├── Navbar.js
│ │ ├── Notification.js
│ │ ├── PaystackDeposit.js
│ │ ├── Profile.js
│ │ ├── ReferFriend.js
│ │ ├── ResetPassword.js
│ │ ├── ResetPasswordToken.js
│ │ ├── SignUpPage.js
│ │ ├── SportPage.js
│ │ ├── Support.js
│ │ ├── TransactionHistory.js
│ │ ├── VirtualsPage.js
│ │ ├── WithdrawPage.js
│ │ └── ... (other components)
│ ├── App.js
│ ├── index.js
│ └── ... (other files)
│
├── package.json
└── README.md

## Key Components

### `App.js`

Main entry for routing and authentication logic.
Defines all routes (public and protected).
Holds sample match data for each sport.

### `LandingPage.js`

Public landing page.
Includes carousel, top matches, feature cards, and a minimal navbar.

### `Navbar.js`

Displays logo, navigation links, and user actions (sign in/up, deposit, withdraw, etc.).
Responsive and context-aware (shows different links for logged-in/logged-out users).

### `LoginPage.js` & `SignUpPage.js`

Forms for user authentication.
Includes social login buttons (Google, Facebook - UI only).

### `HomeBody.js`

Main dashboard after login.
Shows user info, quick links, and possibly featured matches.

### `SportPage.js`

Displays matches for a given sport (soccer, basketball, etc.).
Receives match data as props.

### `DepositPage.js`, `WithdrawPage.js`, `ManualDeposit.js`, `PaystackDeposit.js`

Wallet management: deposit, withdraw, and payment integrations.

### `Profile.js`

User profile management.

### `TransactionHistory.js`

Shows user's wallet transactions.

### `Notification.js`

User notifications.

### `Leaderboard.js`

Displays top users.

### `ReferFriend.js`

Referral system.

### `AIChat.js`

Chatbot or AI assistant.

### `Support.js`

Support/contact page.

## Routing

Uses `react-router-dom` for client-side routing.
Public routes: `/`, `/login`, `/sign-up`, `/reset-password`, etc.
Protected routes: `/home`, `/profile`, `/wallet`, `/my-bets`, `/notifications`, `/leaderboard`, `/refer-friend`, `/ai-chat`, `/support`, `/deposit`, `/withdraw`, `/transactions`, `/paystack`, `/manual-deposit`, `/soccer`, `/basketball`, `/tennis`, `/virtuals`, `/casino`, `/esports`, `/specials`.
Uses `Navigate` for redirects (e.g., redirect to login if not authenticated)

## State Management

Uses React's `useState` and `useEffect` for local state.
Authentication state is managed in `App.js` and passed down as props/context.
Wallet and user info fetched from backend and stored in state.

## API Integration

Uses `axios` for HTTP requests.
Auth token stored in `localStorage` and sent in headers.
Endpoints (examples):
`/login`
`/sign-up`
`/my-wallet`
`/withdraw`
`/deposit`
`/profile`
`/transactions`
`/notifications`
`/leaderboard`
`/refer-friend`
`/ai-chat`
`/support`
`/paystack`
`/manual-deposit`
`/soccer`
`/basketball`
`/tennis`
`/virtuals`
`/casino`
`/esports`
`/specials`

## Styling

Inline styles for quick prototyping.
`Navbar.css` and other CSS files for component-specific styles.
Uses `react-icons` for icons (FontAwesome).

## Dependencies & Installation

### Main Dependencies

**react**: UI library
**react-dom**: DOM bindings for React
**react-router-dom**: Routing
**axios**: HTTP requests
**react-icons**: Icon library (FontAwesome, etc.)

### Install All Dependencies

```bash
npm install react react-dom react-router-dom axios react-icons
```

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
3. **Open your browser at:**  
   [http://localhost:3000](http://localhost:3000)

## Extending the App

**Add new sports:**  
 Add new match data in `App.js` and create new routes/components as needed.
**Add new features:**  
 Create new components in `src/Components/` and add routes in `App.js`.
**Improve UI:**  
 Move inline styles to CSS files or use a CSS-in-JS solution.
**Integrate real APIs:**  
 Replace mock data with real API endpoints.
**Add global state:**  
 Use Context API or Redux for more complex state management.

## Tips

Keep components small and focused.
Use props to pass data between components.
Use `useEffect` for side effects (fetching data).
Use `Navigate` from `react-router-dom` for redirects.
Store sensitive data (like tokens) securely.
Use environment variables for API URLs and keys.
