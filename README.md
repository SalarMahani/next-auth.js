# NextAuth v5  Authentication

### An authentication system built with **Next.js** and **TypeScript**, focused on auth patterns.

##  Overview

This repository demonstrates an authentication flow in a Next.js application, combining a simple UI, security practices, and a type-safe backend. The project is designed as a solid foundation for applications that require user authentication and account management.

⚠️ Important Note<br/>
This project uses NextAuth.js with Google authentication. In some countries, access to certain Google APIs may be restricted. If you experience issues during login, you may need to use a proxy or VPN to bypass these limitations.

🔗 Live Demo:
👉 https://next-auth-js-tau.vercel.app/

📧 Forgot Password (Demo Limitation):
In the live demo, the Forgot Password feature is limited because the project uses Resend as the email provider. Resend only allows sending emails to the account owner, so password reset emails cannot be delivered to other addresses. However, you can still use the rest of the feature.

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
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **React Hook Form**
* **Zod**

### Backend & Auth

* **NextAuth v5 (Auth.js)**
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

## 📄 License

free for all
