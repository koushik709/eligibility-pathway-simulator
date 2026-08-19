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

