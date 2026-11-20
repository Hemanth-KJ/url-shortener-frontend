# Distributed URL Shortener — Frontend

A modern and responsive URL shortening dashboard developed using **React, Vite, JavaScript, Axios, and CSS**.

The application provides an interactive interface for creating shortened URLs, managing links, viewing analytics, generating QR codes, and accessing the distributed Spring Boot backend.

## Live Application

**Website:** http://136.64.82.6/

**Backend Repository:** https://github.com/Hemanth-KJ/distributed-url-shortener

> The application is hosted on Google Cloud Compute Engine. The website is available while the deployment server is running.

## Features

### User Authentication

- User registration
- User login
- JWT-based authentication
- Authenticated API requests
- Token storage
- Logout functionality
- Protected application pages

### Dashboard

- Overview of shortened URLs
- Total URL count
- URL activity information
- Total clicks when analytics data is available
- Recent URL activity
- Navigation to URL management and analytics

### URL Shortening

- Create shortened URLs from long links
- Copy generated short URLs
- Open shortened links
- View original URLs
- Generate QR codes
- Support for expiring URLs

### My URLs

- View URLs created by the authenticated user
- Copy shortened URLs
- Open original and shortened links
- Navigate to individual URL analytics
- Display URL status when expiration metadata is available

### Analytics

- Original URL information
- Short code details
- Click count
- URL creation date
- Expiration date
- Active or expired status

### User Interface

- Responsive layout
- Reusable React components
- Navigation bar
- Dashboard cards
- Loading indicators
- Error handling
- Empty-state messages
- Copy-to-clipboard functionality

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend framework |
| Vite | Development server and build tool |
| JavaScript | Application logic |
| React Router | Client-side navigation |
| Axios | HTTP communication |
| CSS | Styling |
| JWT | Authentication |
| Nginx | Production hosting |
| Docker | Deployment environment |
| Google Cloud VM | Cloud hosting |

## Application Architecture

```text
                   User Browser
                        |
                        v
                   React + Vite
                        |
                        v
                  Axios API Calls
                        |
                        v
                    Nginx :80
                        |
                     /api/v1
                        |
                        v
                 Spring Boot API
                        |
               +--------+--------+
               |        |        |
               v        v        v
           PostgreSQL  Redis    Kafka
```

## Project Structure

Main frontend modules:

```text
frontend/
├── public/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MyUrls.jsx
│   │   └── Analytics.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── urlService.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

This structure illustrates the main application modules. Some filenames or directories may differ from the current repository.

## Getting Started

### Prerequisites

Install:

- Node.js
- npm
- Git
- VS Code or another code editor

A running backend API is required for authentication, URL creation, and analytics.

### Clone Repository

```bash
git clone <YOUR_FRONTEND_REPOSITORY_URL>

cd <FRONTEND_DIRECTORY>
```

Replace the placeholders with your actual frontend repository URL and directory.

### Install Dependencies

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the frontend root.

For the deployed backend:

```env
VITE_API_URL=http://136.64.82.6/api/v1
```

For local backend development:

```env
VITE_API_URL=http://localhost:8080/api/v1
```

The frontend API service can use:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default api;
```

The environment variable name must match the implementation in `src/services/api.js`.

### Start Development Server

```bash
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The build output is generated in:

```text
dist/
```

### Preview Production Build

```bash
npm run preview
```

## API Integration

The frontend communicates with the Spring Boot backend using REST APIs.

**API Base URL:**

```text
http://136.64.82.6/api/v1
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login |
| POST | `/urls` | Create shortened URL |
| GET | `/users/me/urls` | Retrieve user URLs |
| GET | `/urls/{shortCode}/analytics` | Fetch analytics |
| GET | `/urls/{shortCode}/qrcode` | Fetch QR code, if supported |

### Example: URL Service

```javascript
import api from "./api";

export const createShortUrl = async (urlData) => {
  const response = await api.post("/urls", urlData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  return response.data;
};

export const getMyUrls = async () => {
  const response = await api.get("/users/me/urls", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  return response.data;
};

export const getUrlAnalytics = async (shortCode) => {
  const response = await api.get(
    `/urls/${encodeURIComponent(shortCode)}/analytics`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  return response.data;
};
```

## Authentication Flow

```text
User
 |
 v
Login / Register
 |
 v
Spring Boot Authentication API
 |
 v
JWT Token
 |
 v
Frontend Stores Token
 |
 v
Authenticated API Requests
 |
 v
Dashboard / My URLs / Analytics
```

The frontend sends the JWT in the `Authorization` header for protected API endpoints.

For production use, review token storage and session handling to reduce exposure to cross-site scripting and other browser security risks.

## URL Expiration Handling

The analytics API returns expiration information using the field:

```json
{
  "expiresAt": "2026-07-29T15:40:00"
}
```

The frontend can compare the expiration timestamp against the current time.

However, the `/users/me/urls` endpoint may not include expiration metadata.

Example:

```json
{
  "originalUrl": "https://www.google.com",
  "shortCode": "google",
  "shortUrl": "http://136.64.82.6/google"
}
```

If expiration data is unavailable, the frontend should not automatically mark the URL as active.

For consistent status handling, the backend should return a standardized `expiresAt` field or a computed expiration status across relevant endpoints.

## Deployment

The React frontend is deployed on a Google Cloud VM using Nginx.

### Deployment Architecture

```text
                 Internet
                    |
                    v
           http://136.64.82.6
                    |
                    v
                 Nginx
                /     \
               /       \
        React Build   /api/
                         |
                         v
                    Spring Boot
                         |
                PostgreSQL / Redis / Kafka
```

### Step 1 — Generate Production Build

```bash
npm run build
```

### Step 2 — Upload Build to Server

Copy the generated `dist` directory to the Google Cloud VM using SCP, SFTP, or another secure deployment method.

### Step 3 — Configure Nginx

Example configuration:

```nginx
events {}

http {
    include /etc/nginx/mime.types;

    default_type application/octet-stream;

    server {
        listen 80;
        server_name _;

        root /usr/share/nginx/html;
        index index.html;

        location /api/ {
            proxy_pass http://app:8080;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

If short URLs are served at the root path, ensure that Nginx explicitly forwards the short-code route to Spring Boot rather than returning the React SPA for those requests. The exact routing rule depends on the backend redirect endpoint.

### Step 4 — Restart Nginx

```bash
docker compose restart nginx
```

### Step 5 — Verify Deployment

Open:

http://136.64.82.6/

Test the following:

- Registration
- Login
- URL creation
- URL redirection
- My URLs
- Analytics
- QR code generation
- Logout

## Screenshots

Add screenshots of the application to a `screenshots/` directory.

```text
screenshots/
├── login.png
├── register.png
├── dashboard.png
├── create-url.png
├── my-urls.png
└── analytics.png
```

### Login Page

![Login](screenshots/login.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### URL Management

![My URLs](screenshots/my-urls.png)

### Analytics

![Analytics](screenshots/analytics.png)

Add the actual screenshots before publishing these image references.

## Future Enhancements

- Dark and light theme support
- Advanced analytics charts
- URL search and filtering
- Pagination
- Improved expiration status synchronization
- Custom short-code management
- Better mobile responsiveness
- HTTPS support
- CI/CD pipeline
- Automated frontend tests

## Author

**Hemanth K J**

GitHub: https://github.com/Hemanth-KJ

## License

Add a `LICENSE` file if you want to specify reuse and distribution permissions.
