# ✅ Practical Proficiency Task: Simple Task Management API Endpoint

### Estimated Time: 1 - 2 hours

### Goal: Build a RESTful API endpoint /tasks for creating and retrieving tasks using modern backend patterns and security best practices.

---

## 📌 Technology Stack

- **Language:** JavaScript (Node.js + Express)
- **ORM:** TypeORM
- **Database:** MySQL
- **Validation:** Joi + Celebrate
- **Auth:** Faux Bearer Token
- **Docs:** Postman docs
- **Other:** UUID for ID generation, service-layer architecture

---

## ✅ API Endpoints

### 🔐 All endpoints require:
```
Authorization: Bearer faketoken
```

---

### 📥 POST /tasks

Create a new task.

#### Request Body
```json
{
  "title": "string (required)",
  "description": "string (optional)"
}
```

Example `curl`
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer faketoken" \
  -d '{"title": "Write documentation", "description": "For the new API"}'
```

Response
```json
{
  "id": "uuid",
  "title": "Write documentation",
  "description": "For the new API",
  "createdAt": "timestamp"
}
```

### 📤 GET `/tasks?page=1&limit=10`

Retrieve all tasks, paginated.

Example `curl`
```bash
curl -H "Authorization: Bearer faketoken" http://localhost:3000/tasks?page=1&limit=5
```

Response
```json
{
  "tasks": [ ... ],
  
    "page": 1,
    "limit": 5,
    "total": 42
}
```

### 📄 GET `/tasks/:id`

Retrieve a specific task by its ID.

Example `curl`
```bash
curl -H "Authorization: Bearer faketoken" http://localhost:3000/tasks/abc123-id
```

Response (if found)
```json
{
  "id": "abc123-id",
  "title": "My Task",
  "description": "Details here"
}
```

If not found
```json
{
  "error": "Task not found"
}
```

## 🔐 Security Considerations

* **Faux Bearer Token Auth:** All endpoints require a `Bearer` token. The token is not validated — this is a mock auth layer to simulate restricted access.
* **Why faux?** This approach satisfies the brief's requirement for a "simple, secure" auth system without overengineering.
* **CORS:** Configured as `Access-Control-Allow-Origin: *` for development simplicity. Not recommended for production use.

## 🎯 Design Choices

* **MySQL + TypeORM:** Chosen over in-memory/SQLite for real-world ACID compliance.
* **UUIDs:** Server-generated unique IDs using `uuid`.
* **ACID Principles:**
   * **Atomicity & Isolation:** All write operations wrapped in transactions using TypeORM's `QueryRunner`.
   * **Consistency:** Enforced via schema + validation.
   * **Durability:** Guaranteed by MySQL.
* **Service Layer:** Business logic lives in dedicated services for maintainability.
* **Validation:** Done using Joi + Celebrate middleware.
* **Error Handling:** Centralized error handler ensures consistent responses.
* **Pagination:** Implemented in `GET /tasks` with metadata.
* **Git:** Clean, traceable commit history with descriptive messages.

## ⚙️ Running Locally (No Docker)

1. Clone & install
```bash
git clone https://github.com/your-username/task-api.git
cd task-api
npm install
```

2. Configure `.env`
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_db
JWT_SECRET=doesntmatter
```

3. Run migrations (if using)
```bash
npm run migration:run
```

4. Start the server
```bash
npm run dev
```

## 📂 Folder Structure

```
src/
├── controllers/
├── services/
├── routes/
├── middlewares/
├── validators/
├── entity/
├── utils/
├── data-source.ts
└── index.ts
```

## 🔚 Notes

This project was built from scratch specifically for this task. It contains no frontend per the instruction to keep this purely backend. Authentication, validation, error handling, and transaction logic are all scoped appropriately for the requirements.

## 📫 Author

**Oluwanifemi Akeju**  
akejunifemi11@gmail.com