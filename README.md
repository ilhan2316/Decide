# DECIDE 🐻

A modern web application to help you make decisions with confidence.

![image](https://github.com/user-attachments/assets/71349bcf-b484-49e3-bb5d-b4f33f435f81)

## About DECIDE

DECIDE is a web-based decision-making tool that helps users make binary (yes/no) decisions through a guided process. The application features:

- Clean, intuitive UI with a purple theme
- Decision wheel visualization
- Emotional reflection to understand how you feel about your decisions
- User accounts to save your decision history
Note: This is a first attempt and will be approved over time.

The app aims to transform indecision into actionable choices with our philosophy that "Not making a decision is actually a decision — a decision to stay the same."

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Flask (Python)
- **Database**: TBD (SQLite/PostgreSQL)
- **Authentication**: Custom implementation

## Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/ilhan2316/decide.git
cd decide
```

2. Install frontend dependencies
```bash
cd client
npm install
```

3. Install backend dependencies
```bash
cd ../server
pip install -r requirements.txt
```

4. Create a virtual environment (recommended)
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

### Running the Application

1. Start the backend server
```bash
cd server
flask run --port=5000
```

2. Start the frontend application
```bash
cd client
npm start
```

The application should now be running at `http://localhost:3000`

## Project Structure

```
decide/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Application pages
│       │   ├── DecisionBoard.jsx
│       │   ├── LandingPage.jsx
│       │   └── LoginPage.jsx
│       └── services/       # API communication
├── server/                 # Backend Flask application
│   ├── app.py              # Main application entry point
│   └── requirements.txt    # Python dependencies
└── README.md
```

## Features

- **User Authentication**: Create an account, login, and maintain a decision history
- **Decision Input**: Enter specific yes/no questions
- **Decision Wheel**: Visual representation of the decision process
- **Reflection**: Analyze how you feel about the decision outcome
- **Guidance**: Receive meaningful insights based on your emotional response

## Roadmap

- [ ] Add decision history tracking
- [ ] Implement user profiles
- [ ] Add more sophisticated decision algorithms
- [ ] Create a mobile app version
- [ ] Add social sharing capabilities

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by decision-making research and cognitive psychology
- Quote: "Not making a decision is actually a decision — a decision to stay the same."
