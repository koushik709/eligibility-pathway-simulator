# 🧭 Interactive Eligibility & Pathway Matrix Simulator

An interactive immigration eligibility assessment platform that helps prospective applicants explore potential immigration pathways based on their personal profile.

The platform collects applicant information through a guided assessment, evaluates the profile against configurable eligibility rules, and presents potential immigration pathways through an easy-to-understand comparison.

> **⚠️ Disclaimer:** This tool provides an initial eligibility assessment for informational purposes only. It does not constitute legal advice and does not guarantee immigration, visa, or application approval. Final eligibility should be reviewed by a qualified immigration professional.

---

## 📌 Project Status

> **Prototype / Proof of Concept**

This project demonstrates the core concept and technical architecture of an interactive eligibility assessment platform.

The prototype focuses on:

* Multi-step applicant assessment
* Dynamic question flow
* Backend eligibility evaluation
* Pathway scoring and comparison
* Eligibility strengths and gaps
* Personalized assessment results
* Lead / consultation capture

The architecture is designed so additional pathways, eligibility rules, integrations, and administrative functionality can be added later.

---

## 🎯 Project Overview

Traditional immigration websites often provide large amounts of information but leave applicants unsure about which pathway may be relevant to their situation.

This platform approaches the problem differently.

Instead of requiring users to manually research every pathway, the simulator guides them through a structured assessment and evaluates their profile against configured criteria.

### The basic concept

```text
Applicant
    │
    ▼
Interactive Assessment
    │
    ├── Personal Information
    ├── Education
    ├── Work Experience
    ├── Language Scores
    └── Other Eligibility Factors
    │
    ▼
Eligibility & Scoring Engine
    │
    ▼
Pathway Evaluation
    │
    ▼
Pathway Comparison
    │
    ├── Eligibility Score
    ├── Strengths
    ├── Potential Gaps
    └── Recommendations
    │
    ▼
Personalized Results
    │
    ▼
Consultation / Lead Capture
```

---

## ✨ Features

### 📝 Interactive Assessment

A guided multi-step questionnaire collects relevant applicant information without overwhelming the user with a large form.

### 🔄 Dynamic Questions

Questions can be displayed dynamically based on previously provided answers.

For example:

```text
Do you have work experience?
        │
        ├── Yes → Ask about occupation, duration, location, etc.
        │
        └── No  → Skip work-experience-specific questions
```

### ⚙️ Eligibility & Scoring Engine

Applicant profiles are evaluated against configurable eligibility criteria.

The backend can determine:

* Whether an applicant meets specific requirements
* Which criteria are satisfied
* Which criteria are missing
* Potential eligibility gaps
* Overall pathway scores

### 🛣️ Multiple Pathway Comparison

Applicants can compare multiple potential immigration pathways from a single assessment.

Example:

| Pathway   | Score | Status               |
| --------- | ----: | -------------------- |
| Pathway A |   85% | Strong Match         |
| Pathway B |   72% | Potential Match      |
| Pathway C |   48% | Requires Improvement |

### 📊 Visual Results

Assessment results can be presented using visual indicators and charts to make complex eligibility information easier to understand.

### 💪 Eligibility Strengths

The system identifies areas where the applicant profile performs well.

Examples:

* Strong language score
* Relevant work experience
* Appropriate education
* Required professional experience

### ⚠️ Potential Gaps

The system also highlights criteria that may require improvement or professional review.

Examples:

* Insufficient work experience
* Missing documentation
* Language score below configured threshold
* Education requirements not satisfied

### 🎯 Personalized Recommendations

Rather than showing generic immigration information, the platform generates pathway recommendations based on the applicant's assessment profile.

### 📥 Lead Capture

After receiving their assessment results, applicants can provide contact information to request a consultation or further assistance.

### 🔌 REST API Architecture

The frontend and backend are separated through REST APIs, allowing the system to evolve independently.

### ⚙️ Configurable Eligibility Rules

Eligibility criteria are designed to be configurable rather than hard-coded into the frontend.

This makes it possible to introduce additional pathways and update rules without rebuilding the entire application.

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │        User         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Next.js Frontend  │
                         │      Port 3000       │
                         └──────────┬──────────┘
                                    │
                              REST API
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Laravel Backend   │
                         │      Port 8000       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       MySQL         │
                         └─────────────────────┘
```

### Architecture Principles

* Frontend and backend separation
* RESTful API communication
* Centralized eligibility evaluation
* Configurable rules
* Scalable pathway structure
* Database-driven assessment data
* Clear separation of presentation and business logic

---

# 📁 Project Structure

```text
eligibility-pathway-simulator/
│
├── backend/                         # Laravel REST API
│   ├── app/
│   │   ├── Http/
│   │   ├── Models/
│   │   └── Services/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   └── composer.json
│
├── frontend/                        # Next.js Application
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 🛠️ Technology Stack

## Frontend

| Technology       | Purpose                     |
| ---------------- | --------------------------- |
| **Next.js**      | React application framework |
| **React**        | User interface              |
| **TypeScript**   | Type-safe development       |
| **Tailwind CSS** | UI styling                  |
| **Chart.js**     | Data visualization          |

## Backend

| Technology   | Purpose                        |
| ------------ | ------------------------------ |
| **Laravel**  | REST API & business logic      |
| **PHP 8.2+** | Backend runtime                |
| **MySQL**    | Relational database            |
| **REST API** | Frontend/backend communication |

---

# 🔄 Assessment Flow

```text
┌─────────────────────────┐
│     Start Assessment    │
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│ Applicant Information   │
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│       Education         │
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│    Work Experience      │
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│    Language Scores      │
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│ Other Eligibility Data  │
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│ Backend Scoring Engine  │
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│  Pathway Evaluation     │
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│  Pathway Comparison     │
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│ Personalized Results    │
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│ Lead / Consultation     │
└─────────────────────────┘
```

---

# 🔌 API

The frontend communicates with the Laravel backend through REST APIs.

### Example Endpoint

```http
GET /api/eligibility/questions
```

Returns the questions required to begin the assessment.

### Assessment Submission

```http
POST /api/eligibility/assess
```

The applicant's answers are submitted to the backend, where the eligibility and scoring engine evaluates the profile.

### Conceptual API Flow

```text
GET /eligibility/questions
        │
        ▼
Frontend displays assessment
        │
        ▼
User submits answers
        │
        ▼
POST /eligibility/assess
        │
        ▼
Laravel Eligibility Engine
        │
        ▼
Evaluate Pathways
        │
        ▼
Return Assessment Results
```

---

# ⚙️ Local Development

## Prerequisites

Make sure the following are installed:

* PHP 8.2+
* Composer
* Node.js
* npm
* MySQL
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/eligibility-pathway-simulator.git

cd eligibility-pathway-simulator
```

---

# 🖥️ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install PHP dependencies:

```bash
composer install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

Configure your database in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=eligibility
DB_USERNAME=root
DB_PASSWORD=
```

Create the database before running migrations.

Then run:

```bash
php artisan migrate
```

Start the Laravel development server:

```bash
php artisan serve
```

Backend API:

```text
http://127.0.0.1:8000
```

---

# 🌐 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env.local
```

Configure:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

Start the Next.js development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

# 🧪 Development Workflow

```text
Frontend
   │
   │  HTTP / REST API
   ▼
Laravel API
   │
   ├── Validate Applicant Data
   │
   ├── Load Eligibility Rules
   │
   ├── Evaluate Pathways
   │
   ├── Calculate Scores
   │
   └── Generate Result
   │
   ▼
MySQL
```

---

# 🎯 Business Value

## Higher-Quality Leads

The platform collects meaningful applicant information before a consultation.

This gives immigration professionals a better understanding of potential clients before beginning a consultation.

## Better User Engagement

Instead of simply reading informational pages, visitors actively interact with the platform and receive immediate personalized feedback.

## Personalized Experience

Applicants receive pathway recommendations based on their individual profile rather than generic immigration information.

## Lead Generation

The assessment naturally creates a conversion point where users can request a consultation after receiving their results.

## Data & Analytics

The system can potentially provide insights into:

* Applicant demographics
* Popular immigration pathways
* Common eligibility gaps
* Assessment completion rates
* Consultation requests
* Conversion trends

---

# 🧩 Extensibility

The architecture is designed to support additional functionality without fundamentally changing the application.

Potential extensions include:

```text
New Pathway
     │
     ▼
Eligibility Rules
     │
     ▼
Scoring Configuration
     │
     ▼
Assessment Engine
     │
     ▼
Results
```

This approach allows new pathways and rule sets to be introduced through backend configuration rather than rebuilding the frontend assessment flow.

---

# 🔮 Future Improvements

### Administration

* [ ] Admin dashboard
* [ ] Question management
* [ ] Eligibility rule management
* [ ] Pathway management
* [ ] Rule version management

### Applicant Experience

* [ ] Assessment history
* [ ] Save and resume assessment
* [ ] Multilingual support
* [ ] Improved pathway recommendations
* [ ] Downloadable assessment reports

### Business Integrations

* [ ] CRM integration
* [ ] Email notifications
* [ ] Automated follow-up workflows
* [ ] Consultation scheduling
* [ ] Lead management

### Analytics

* [ ] Assessment completion analytics
* [ ] Pathway popularity
* [ ] Eligibility gap analysis
* [ ] Lead conversion tracking
* [ ] Advanced reporting dashboard

---

# 🔐 Security & Data Considerations

Because the platform handles applicant information, a production implementation should include appropriate security and privacy controls.

Potential production requirements include:

* API authentication and authorization
* Input validation
* Rate limiting
* Secure data storage
* Database encryption where appropriate
* Audit logging
* Role-based access control
* Privacy and consent management
* Secure handling of personally identifiable information
* Production HTTPS configuration

---

# ⚠️ Disclaimer

This simulator is intended to provide an **initial informational assessment** based on configured eligibility criteria.

The results:

* Are not legal advice
* Do not guarantee immigration eligibility
* Do not guarantee visa or application approval
* Should not replace professional immigration advice

Final eligibility should always be reviewed by a qualified immigration professional using the applicable laws, regulations, policies, and current program requirements.

---

# 📸 Screenshots

Add screenshots or GIFs of the prototype here.

Example:

```text
/docs/
├── assessment.png
├── questions.png
├── results.png
└── pathway-comparison.png
```

Then reference them in the README:

```markdown
![Assessment](docs/assessment.png)

![Results](docs/results.png)
```

---

# 🚀 Project Vision

The long-term goal is to evolve this prototype into a configurable eligibility assessment platform that can support multiple immigration pathways, dynamic eligibility rules, personalized recommendations, lead management, and professional review workflows.

The separation between the **Next.js frontend**, **Laravel API**, and **eligibility engine** provides a foundation for scaling the platform as requirements grow.

```text
                    ┌──────────────────┐
                    │      Applicant   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Next.js Frontend │
                    └────────┬─────────┘
                             │
                          REST API
                             │
                             ▼
                    ┌──────────────────┐
                    │  Laravel API     │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐   ┌───────────┐   ┌──────────┐
        │ Questions│   │ Eligibility│   │  Leads   │
        │ & Rules  │   │   Engine   │   │          │
        └──────────┘   └─────┬─────┘   └──────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     MySQL        │
                    └──────────────────┘
```

---

## 📄 License

This project is currently a prototype / proof of concept.

Add the appropriate license here if the project is intended to be publicly distributed.
