
# **📚 Bookstore API**  
A RESTful API for managing books and users, built with **Node.js, Express, MongoDB, and JWT Authentication**.

---

## **🛠 Features**
- 📘 **Books Management**: Create, read, update, and delete books.
- 🔐 **User Authentication**: Signup, login, and access protected routes with JWT.
- 🔍 **Search & Filtering**: Search books by title, filter by author, category, and rating.
- 🏎 **Optimized Backend**: Implemented batching, caching, and performance improvements.
- 📦 **Docker Support**: Easily run the API in a Docker container.

---

## **🚀 Installation & Setup**
### **🔧 Prerequisites**
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (running locally or on cloud)
- [Docker](https://www.docker.com/) (optional, for containerized setup)

---

## **📌 Local Development Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/bookstore-api.git
cd backend
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in the root directory and add:
```env
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=your_secret_key
PORT=9090
```

### **4️⃣  Run the Server**
```sh
npm start
```
API is now running on `http://localhost:9090`.

---

## **🐳 Docker Setup**
### **1️⃣ Build the Docker Image**
```sh
docker build -t book-api .
```

### **2️⃣ Run the Container**
```sh
docker run -d -p 9090:9090 --env-file .env --name book-store book-api
```
📌 **Note**: If MongoDB is running **outside** Docker, update `.env`:
```env
MONGO_URI=mongodb://host.docker.internal:27017
```

### **3️⃣ Verify Container is Running**
```sh
docker ps
```
API is now accessible at `http://localhost:9090`.

---

## **📖 API Endpoints**
### **🔑 Authentication**
| Method | Endpoint        | Description               |
|--------|----------------|---------------------------|
| `POST` | `/api/signup`  | Register a new user       |
| `POST` | `/api/login`   | Authenticate user & get JWT |

### **📚 Books**
| Method  | Endpoint           | Description                    |
|---------|-------------------|--------------------------------|
| `POST`  | `/api/books`      | Add a new book (protected)    |
| `GET`   | `/api/books`      | Get all books                 |
| `GET`   | `/api/books/:id`  | Get a book by ID              |
| `PUT`   | `/api/books/:id`  | Update a book (protected)     |
| `DELETE`| `/api/books/:id`  | Delete a book (protected)     |

### **🔍 Search & Filter**
| Method  | Endpoint                | Description |
|---------|------------------------|-------------|
| `GET`   | `/api/books?title=xyz`  | Search books by title |
| `GET`   | `/api/books?author=xyz` | Filter books by author |
| `GET`   | `/api/books?category=xyz` | Filter books by category |
| `GET`   | `/api/books?rating=4`   | Filter books by rating |

---

## **📜 License**
This project is licensed under the **MIT License**.

---

