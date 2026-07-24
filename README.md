# 🛒 CompareKaro

A grocery price comparison platform that helps users find the best deals across **Zepto** and **Blinkit** — two of India's leading 10-minute delivery platforms.

## 🌐 Live Demo
[https://comparekaro-frontend.onrender.com](https://comparekaro-frontend.onrender.com)

## 🔍 Features
- Search 3,400+ grocery products by name or category
- Side-by-side price comparison across Zepto and Blinkit
- Highlights the cheaper store and calculates savings
- JWT-based user authentication (register/login/logout)
- Clean retro-styled React frontend

## 🛠️ Tech Stack

**Backend**
- Java 17, Spring Boot
- Spring Data JPA, H2 Database
- Spring Security + JWT (jjwt)

**Frontend**
- React.js
- Fetch API for REST calls

**Data**
- Zepto Inventory Dataset (Kaggle) — 3,732 SKUs
- Blinkit Products Dataset (Kaggle) — 27,555 products
- Python seed script for data cleaning, keyword matching, and MongoDB seeding

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- Python 3.x (for seeding data)

### Backend Setup
```bash
cd comparekaro
.\mvnw.cmd spring-boot:run
```
Server runs on `http://localhost:8080`

### Seed Data
```bash
pip install pandas openpyxl
python seed.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
App runs on `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login and get JWT token | No |
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/search?name=` | Search by product name | No |
| GET | `/api/products/category/{category}` | Filter by category | No |

## 📊 Data Pipeline
1. Downloaded real product datasets from Kaggle (Zepto + Blinkit)
2. Cleaned and normalized prices (Zepto stores prices in paise)
3. Keyword-matched products across both platforms
4. Seeded 3,421 matched products into H2 database via `products.json`

## 🗂️ Project Structure
```
CompareKaro/
├── comparekaro/          # Spring Boot backend
│   └── src/main/java/com/comparekaro/comparekaro/
│       ├── controller/   # REST controllers
│       ├── model/        # JPA entities
│       ├── repository/   # Spring Data repositories
│       ├── service/      # Business logic + JWT
│       └── security/     # JWT filter + Security config
├── frontend/             # React frontend
│   └── src/
│       └── App.js
├── seed.py               # Data cleaning + seeding script
└── data/                 # Raw datasets (not tracked in git)
```
## 🔮 Planned Improvements
- MongoDB for persistent storage
- Redis caching for faster search
- Best Basket feature — compare total cart cost across stores
- Live price scraping
