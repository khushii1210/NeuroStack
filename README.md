# NeuroStack 🧠

> A Developer Knowledge Operating System that helps developers capture, connect, and retrieve knowledge.

## Overview

NeuroStack is a personal knowledge management platform built specifically for developers.

Instead of scattered notes, forgotten code snippets, and lost debugging solutions, NeuroStack provides a centralized workspace where everything is connected through a knowledge graph.

The goal is simple:

**Turn information into connected knowledge.**

---

## Features

### 📝 Notes Management

Create and organize development notes.

* Rich note editor
* Tags and categorization
* Search and filtering
* Connected to the knowledge graph

---

### 💻 Code Snippets

Store reusable code snippets.

* Language-specific snippets
* Syntax highlighting
* Search and filtering
* Connect snippets to notes and concepts

---

### 🐛 Bug Journal

Never solve the same bug twice.

Store:

* Error description
* Root cause
* Solution
* Related technologies

Build your own debugging knowledge base over time.

---

### 🕸️ Knowledge Graph

Visualize how concepts are connected.

Example:

```txt
React
 ├── Hooks
 ├── JWT
 ├── Authentication
 └── PostgreSQL
```

The graph helps developers discover relationships between technologies, notes, snippets, and bugs.

---

### 🤖 AI Assistant

AI-powered assistance for navigating and understanding stored knowledge using Google Gemini. Chat history is persisted per user, enabling memory-aware conversations grounded in your own notes, snippets, and bug history.

---

## Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS
* Framer Motion
* GSAP
* Zustand
* Axios
* React Router DOM
* Three.js + React Three Fiber

### Backend

* Node.js
* Express.js
* @google/generative-ai

### Database

* PostgreSQL
* Prisma ORM

### Visualization

* React Flow

### Authentication

* JWT
* bycryptjs
* cookie-parser

---

## Project Structure

```txt
NeuroStack
│
├── frontend
│   └── src
│       ├── api
│       ├── assets
│       ├── components
│       ├── hooks
│       ├── layouts
│       ├── pages
│       ├── store
│       └── utils
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── services
│   ├── utils
│   ├── config
│   └── prisma
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/khushii1210/neurostack.git
cd neurostack
```

### Install Dependencies

```bash
npm run install:all
```

### Configure Environment Variables

Inside the backend folder, create a .env file:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_secret"
GEMINI_API_KEY="your_gemini_api_key"
```

### Run Development Server

```bash
npm run dev
```

---

## Vision

Developers constantly learn new concepts, solve bugs, write snippets, and take notes.

Unfortunately, that knowledge is often lost across browsers, documents, and chats.

NeuroStack aims to become a developer's second brain by making knowledge searchable, connected, and reusable.

---

## Future Roadmap

* Rich knowledge graph nodes
* VS Code extension
* AI-powered memory search
* Automatic relationship suggestions
* Smart tagging
* Graph analytics
* Team workspaces

---

Built with ❤️ for developers who never want to lose knowledge again.
