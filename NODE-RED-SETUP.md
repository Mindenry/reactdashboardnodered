# 🚀 คู่มือการตั้งค่า Node-RED สำหรับระบบจัดการพนักงาน

## ขั้นตอนการตั้งค่า

### 1. ติดตั้ง Node-RED

```bash
# ติดตั้ง Node-RED globally
npm install -g node-red

# รัน Node-RED
node-red
```

เปิดเบราว์เซอร์ไปที่: http://localhost:1880

### 2. ติดตั้ง Node-RED Dashboard

1. ไปที่ **Manage Palette** (ไอคอนเฟืองด้านขวาบน)
2. คลิก **Install** tab
3. ค้นหาและติดตั้ง:
   - `node-red-dashboard`
   - `node-red-node-mysql`

### 3. Import Flow

1. คลิก **Menu** (ไอคอนแฮมเบอร์เกอร์) → **Import**
2. คัดลอกและวาง JSON จากไฟล์ `node-red-endpoints.json`
3. คลิก **Import**

### 4. ตั้งค่าฐานข้อมูล MySQL

#### สร้างฐานข้อมูล

```sql
CREATE DATABASE dashboard_db;
USE dashboard_db;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    join_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Active'
);
```

#### เพิ่มข้อมูลตัวอย่าง

```sql
INSERT INTO employees (name, email, department, salary, join_date, status) VALUES
('John Smith', 'john.smith@company.com', 'Engineering', 75000, '2023-01-15', 'Active'),
('Sarah Johnson', 'sarah.johnson@company.com', 'Marketing', 65000, '2023-02-01', 'Active'),
('Mike Chen', 'mike.chen@company.com', 'Engineering', 80000, '2023-01-20', 'Active'),
('Lisa Brown', 'lisa.brown@company.com', 'HR', 55000, '2023-03-10', 'Active'),
('David Wilson', 'david.wilson@company.com', 'Sales', 70000, '2023-02-15', 'Active');
```

### 5. ตั้งค่า MySQL Connection

1. คลิกที่ node **mysql_config**
2. ตั้งค่าการเชื่อมต่อ:
   - **Host**: localhost
   - **Port**: 3306
   - **Database**: dashboard_db
   - **User**: root (หรือ username ของคุณ)
   - **Password**: (password ของคุณ)

### 6. เพิ่ม HTTP Endpoints

#### 6.1 HTTP In Node สำหรับดึงข้อมูล

- **URL**: `/api/employees`
- **Method**: POST
- **Name**: Get Employees

#### 6.2 HTTP In Node สำหรับเพิ่มพนักงาน

- **URL**: `/api/employees/add`
- **Method**: POST
- **Name**: Add Employee

#### 6.3 HTTP Response Nodes

ตั้งค่า headers สำหรับ CORS:

```json
{
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
}
```

### 7. เชื่อมต่อ Nodes

#### Flow สำหรับดึงข้อมูล:

```
HTTP In (Get Employees) → Function (Parse Query) → MySQL → Function (Format Response) → HTTP Response
```

#### Flow สำหรับเพิ่มพนักงาน:

```
HTTP In (Add Employee) → Function (Prepare Add) → MySQL → Function (Format Add Response) → HTTP Response
```

### 8. Deploy Flow

1. คลิกปุ่ม **Deploy** (สีแดง)
2. ตรวจสอบว่าไม่มี error ใน Debug panel

### 9. ทดสอบ API

#### ทดสอบด้วย curl:

```bash
# ดึงข้อมูลพนักงาน
curl -X POST http://localhost:1880/api/employees \
  -H "Content-Type: application/json" \
  -d '{"topic": "SELECT * FROM employees ORDER BY join_date DESC"}'

# เพิ่มพนักงาน
curl -X POST http://localhost:1880/api/employees/add \
  -H "Content-Type: application/json" \
  -d '{
    "name": "สมชาย ใจดี",
    "email": "somchai@company.com",
    "department": "Engineering",
    "salary": "75000"
  }'
```

#### ทดสอบด้วยไฟล์ test-api.html:

1. เปิดไฟล์ `test-api.html` ในเบราว์เซอร์
2. ทดสอบการดึงข้อมูลและเพิ่มพนักงาน

### 10. ตรวจสอบการทำงาน

#### ตรวจสอบใน Node-RED:

1. **Debug Panel** - ดูข้อมูลที่ส่งผ่าน nodes
2. **Flow Status** - ตรวจสอบว่า nodes ทำงานปกติ
3. **MySQL Connection** - ตรวจสอบการเชื่อมต่อฐานข้อมูล

#### ตรวจสอบใน Frontend:

1. รัน `npm run dev` ในโฟลเดอร์ `dashboardnodered`
2. เปิด http://localhost:5173
3. ตรวจสอบว่าข้อมูลแสดงผลถูกต้อง

## การแก้ไขปัญหา

### 1. MySQL Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**วิธีแก้:**

- ตรวจสอบว่า MySQL ทำงานอยู่
- ตรวจสอบ username/password
- ตรวจสอบ port และ host

### 2. CORS Error

```
Access to fetch at 'http://localhost:1880/api/employees' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**วิธีแก้:**

- ตรวจสอบ CORS headers ใน HTTP Response nodes
- เพิ่ม OPTIONS method handler

### 3. API Timeout

```
Request timeout
```

**วิธีแก้:**

- เพิ่ม timeout ใน frontend
- ตรวจสอบการเชื่อมต่อ network
- ตรวจสอบ Node-RED performance

### 4. Database Query Error

```
You have an error in your SQL syntax
```

**วิธีแก้:**

- ตรวจสอบ SQL query ใน Function nodes
- ตรวจสอบการ escape ข้อมูล
- ทดสอบ query ใน MySQL client

## การปรับแต่งเพิ่มเติม

### 1. เพิ่ม Authentication

```javascript
// ใน Function node
if (!msg.req.headers.authorization) {
  msg.statusCode = 401;
  return msg;
}
```

### 2. เพิ่ม Logging

```javascript
// ใน Function node
node.log("Processing request: " + JSON.stringify(msg.payload));
```

### 3. เพิ่ม Error Handling

```javascript
// ใน Function node
try {
  // your code
} catch (error) {
  node.error("Error: " + error.message);
  msg.statusCode = 500;
  msg.payload = { error: error.message };
}
```

### 4. เพิ่ม Rate Limiting

ใช้ `node-red-node-redis` สำหรับ rate limiting

## การ Monitor และ Maintenance

### 1. ตรวจสอบ Performance

- ใช้ Node-RED Dashboard สำหรับ monitoring
- ตรวจสอบ memory usage
- ตรวจสอบ database performance

### 2. Backup ข้อมูล

```bash
# Backup database
mysqldump -u root -p dashboard_db > backup.sql

# Restore database
mysql -u root -p dashboard_db < backup.sql
```

### 3. Log Rotation

ตั้งค่า log rotation ใน Node-RED settings

## สรุป

หลังจากตั้งค่าเสร็จแล้ว คุณจะมี:

- ✅ Node-RED backend ที่เชื่อมต่อกับ MySQL
- ✅ HTTP API endpoints สำหรับ CRUD operations
- ✅ CORS support สำหรับ frontend
- ✅ Error handling และ logging
- ✅ ระบบที่พร้อมใช้งาน

ตอนนี้คุณสามารถรัน frontend และทดสอบการทำงานได้แล้ว! 🎉
