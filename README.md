# Stockify — Frontend

**Stockify** is an inventory & profit-tracking web app built for importers and retailers.  
This repository contains the **frontend** of Stockify — a React + Tailwind UI.

---

## Features

### Authentication & Account
- Sign In / Sign Up
- Forgot Password
- Update display name
- JWT-based authentication (integration with backend)
- Light / Dark theme toggle

### Inventory & Batches
- Add import / retail batches
- Add products under a batch
- View batches and batch-specific inventory
- Low-stock alert (UI)

### Sales & Reporting
- Record a sale and auto-update inventory
- View all sales per batch
- Dashboard analytics and summarized reports
- Top-performing products

### Expenses
- Add expense batches (shipping, customs, logistics)
- View/filter expenses by batch, category, and date
- Edit expense entries

### Filters & Search
- Filter batches by date
- Filter sales by date
- Filter products by date and name
- Filter expenses by category and date

### Charts (Chart.js)
- Top selling products (Bar chart)
- Low stock (Horizontal bar chart)
- Sales vs Expense (Double bar chart)
- Inventory breakdown (Pie / Doughnut chart)

---

## Tech Stack

**Frontend**
- React
- Tailwind CSS
- Zustand (state management)
- React Router
- Framer Motion (animations)
- Chart.js (charts) + `react-chartjs-2`
- React Icons
- PropTypes

**Dev / Deploy**
- Vite
- Git & GitHub
- Vercel (frontend deployment)

---

## Contributing
Suggested workflow:
- Fork the repo
- Create a feature branch: git checkout -b feat/your-feature
- Commit your changes and push
- Open a Pull Request with a clear description

Please follow the existing code style and keep components small and composable.

---

## Author
Chiemezie Uchenwoke 
- [Email](mailto:uchenwoke.chiemezie@gmail.com)
- [Portfolio](https://chiemezie-uche.vercel.app/)
- [LinkedIn Profile](https://www.linkedin.com/in/chiemezieuche/)