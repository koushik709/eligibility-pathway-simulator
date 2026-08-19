# Interactive Eligibility & Pathway Matrix Simulator

An interactive immigration eligibility assessment platform designed to help prospective applicants explore potential immigration pathways based on their personal profile.

The platform dynamically collects applicant information and evaluates the profile against configured eligibility rules, presenting potential pathways through an easy-to-understand visual comparison.

> **Note:** This tool is intended as an initial eligibility assessment and does not guarantee immigration or visa approval. Final eligibility should be reviewed by a qualified immigration professional.

---

## 🚀 Features

- Interactive multi-step eligibility assessment
- Dynamic questions based on applicant information
- Backend eligibility and scoring engine
- Multiple immigration pathway comparison
- Visual pathway scoring
- Eligibility strengths and potential gaps
- Personalized assessment results
- Lead capture after assessment
- REST API architecture
- Configurable eligibility rules
- Separate frontend and backend applications

---

## 🏗️ Architecture

```text
                    User
                     │
                     ▼
             Next.js Frontend
                Port 3000
                     │
                REST API
                     │
                     ▼
              Laravel Backend
                Port 8000
                     │
                     ▼
                  MySQL

## 📁 Project Structure

eligibility-pathway-simulator/
│
├── backend/              # Laravel REST API
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   └── routes/
│
├── frontend/             # Next.js application
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md

---
🛠️ Technology Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
Chart.js
Backend
Laravel
PHP 8.2+
REST API
MySQL
⚙️ Local Development
1. Clone the repository
git clone https://github.com/YOUR_USERNAME/eligibility-pathway-simulator.git


cd eligibility-pathway-simulator
Backend Setup

Navigate to the backend:

cd backend

Install PHP dependencies:

composer install

Create the environment file:

cp .env.example .env

Generate the Laravel application key:

php artisan key:generate

Configure the database in .env:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=eligibility
DB_USERNAME=root
DB_PASSWORD=

Run migrations:

php artisan migrate

Start the Laravel API:

php artisan serve

The backend will be available at:

http://127.0.0.1:8000
Frontend Setup

Open another terminal and navigate to:

cd frontend

Install dependencies:

npm install

Create the environment file:

cp .env.example .env.local

Configure:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

Start the development server:

npm run dev

The frontend will be available at:

http://localhost:3000
🔌 API

The frontend communicates with the Laravel backend through REST APIs.

Example:

GET /api/eligibility/questions

The API provides the questions required for the assessment.

Assessment answers are then submitted to the backend where the eligibility/scoring logic is processed.

📊 Assessment Flow
Start Assessment
       ↓
Applicant Information
       ↓
Education
       ↓
Work Experience
       ↓
Language Scores
       ↓
Other Eligibility Factors
       ↓
Backend Scoring Engine
       ↓
Pathway Comparison
       ↓
Personalized Results
       ↓
Lead / Consultation Request
🎯 Business Benefits
Higher-Quality Leads

The system collects meaningful applicant information before a consultation, allowing the team to better understand and prioritize potential clients.

Better User Engagement

Instead of simply reading website content, visitors actively interact with the platform and receive immediate value.

Personalized Experience

Users receive pathway recommendations based on their individual profile rather than generic immigration information.

Lead Generation

The assessment creates a natural conversion point where users can request a personalized consultation after receiving their results.

Data & Analytics

The system can provide insights into applicant profiles, popular pathways, common eligibility gaps, and conversion trends.

⚠️ Disclaimer

The simulator provides an initial eligibility assessment based on configured criteria.

Results should not be interpreted as legal advice or a guarantee of immigration, visa, or application approval. Final eligibility should be evaluated by a qualified immigration professional.

🔮 Future Improvements
Admin dashboard for managing questions and rules
Additional immigration pathways
CRM integration
Email notifications
Assessment history
Advanced analytics
Multilingual support
Improved pathway recommendations
Rule/version management
Automated follow-up workflows
📌 Project Status

Prototype / Proof of Concept

The current implementation demonstrates the core eligibility assessment workflow, backend scoring architecture, pathway comparison, and lead-generation concept.



---


## One thing I'd change for your company


Since this is currently a **demo/proposal**, don't make the README sound like the system is already production-ready.


Use:


> **Prototype / Proof of Concept**


That's honest and professional.


Your GitHub repository then becomes something you can show your boss:


```text
GitHub
  │
  ├── README → What / Why / Benefits
  │
  ├── frontend → Next.js UI
  │
  └── backend → Laravel API
