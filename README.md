# Technical Event Management System

A comprehensive Event Management System built with React, Node.js, and SQLite.

## Features
- **Admin Portal**: Manage users and vendors.
- **Vendor Portal**: Add and manage products.
- **User Portal**: Browse vendors, add items to cart, and place orders.
- **Order Tracking**: Real-time order status updates.

## Prerequisites
- Node.js installed.

## Setup Instructions

### 1. Backend Setup
```bash
cd server
npm install
node verify_setup.js  # Optional: Check database
node server.js
```
The server will run on `http://localhost:5000`.

### 2. Frontend Setup
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Default Roles
- You can Sign Up as a **User**, **Vendor**, or **Admin** directly from the Signup page for testing purposes.
