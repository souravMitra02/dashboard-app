# Project Name
Dashboard Application

## Project Overview
A brief description of the project, e.g., "This is a Dashboard application built with Next.js and TypeScript that displays user data fetched from JSONPlaceholder API."

## Live Demo
https://dashboard-mpalw0ncg-sourav-mitras-projects.vercel.app/

## Features
- User List Page with table/grid view
- Search users by name or email
- Pagination (limit users per page)
- User Details Page (dynamic routing)
- Responsive Design for mobile and desktop
- Animations using Framer Motion
- Optional: 3D elements for visual enhancement

## Tech Stack
- Frontend: Next.js + TypeScript
- Styling: Tailwind CSS
- Animations: Framer Motion
- API: JSONPlaceholder
- Deployment: Vercel

## Project Structure
dashboard-app/
│── src/
│   ├── app/
│   │   ├── layout.tsx         
│   │   ├── page.tsx           
│   │   └── users/
│   │       ├── page.tsx       
│   │       └── [id]/page.tsx   
│   │
│   ├── components/             
│   │   ├── UserCard.tsx        
│   │   ├── SearchBar.tsx       
│   │   └── Pagination.tsx      
│   │
│   ├── types/                 
│   │   └── User.ts             
│   │# API helpers
│   │   └── fetchUsers.ts       
│   │
│   └── styles/                
│       └── globals.css
│
│── package.json
│── tsconfig.json
│── tailwind.config.js
│── postcss.config.js
│── next.config.js
│── README.md
│── public/ 


## Installation
1. Clone the repository:  
git clone https://github.com/souravMitra02/dashboard-app.git
cd my-dashboard
npm install
npm run dev

