# NextAuth v5  Authentication

## A full-stack authentication system built with **Next.js** and **TypeScript**, focused on auth patterns.

##  Overview

This repository demonstrates an authentication flow in a Next.js application, combining a simple UI, security practices, and a type-safe backend. The project is designed as a solid foundation for applications that require user authentication and account management.


## 🔐 Core Features

### Authentication

* Email and password signup
* Secure credentials-based login using NextAuth v5
* Session management with the Next.js App Router

### Security

* Password reset via email
* Route protection to restrict access to authenticated users

### Forms & Validation

* Type-safe form handling with React Hook Form
* Schema-based validation using Zod
* Shared validation logic between client and server

### Database

* PostgreSQL hosted on Neon
* Type-safe database access with Drizzle ORM

### Email

* Transactional emails for password reset and account actions
* Email delivery powered by Resend

### OAuth providers
* use Googel as an provider for register and login the user
---

## 🛠️ Tech Stack

### Frontend

* **Next.js (App Router)**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **React Hook Form**
* **Zod**

### Backend & Auth

* **NextAuth v5 (Auth.js)**
* **Credentials Provider**
* **PostgreSQL (Neon)**
* **Drizzle ORM**

---

## 📁 Project Structure (High Level)

```
app/            # Next.js App Router
components/     # Reusable shad cn UI components
lib/            # utilities
db/             # Drizzle schema & migrations
public/        # project pictures
```

---

## ⚙️ Environment Variables

Create a `.env` file with the following configuration:

```
DATABASE_URL=
AUTH_SECRET=
RESEND_API_KE=
SITE_BASE_URL=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```


---

## 🎯 Purpose

This project serves as a reference implementation for building authentication-heavy applications with Next.js. It can be used as a starting point for production apps or as a sandbox for experimenting with advanced auth and security features.

---

## 🧩 Possible Enhancements

* Role-based access control (RBAC)
* Session management dashboard
* Rate limiting and advanced security policies

---

## 📄 License

free for all
