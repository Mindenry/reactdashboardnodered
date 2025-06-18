# 🚀 คู่มือเริ่มต้นใช้งานอย่างรวดเร็ว

## 📋 สิ่งที่คุณจะได้

ระบบจัดการพนักงานที่สมบูรณ์พร้อม:

- ✅ **Frontend**: React + TypeScript + Tailwind CSS
- ✅ **Backend**: Node-RED + MySQL
- ✅ **Features**: Dashboard, Charts, CRUD Operations
- ✅ **UI**: สวยงามและใช้งานง่าย

## ⚡ ขั้นตอนการเริ่มต้น

### 1. รัน Frontend

```bash
cd dashboardnodered
npm install
npm run dev
```

เปิด: http://localhost:5173

### 2. ตั้งค่า Node-RED

```bash
npm install -g node-red
node-red
```

เปิด: http://localhost:1880

### 3. ตั้งค่าฐานข้อมูล

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

### 4. Import Node-RED Flow

1. เปิด Node-RED
2. Import ไฟล์ `node-red-endpoints.json`
3. ตั้งค่า MySQL connection
4. Deploy

### 5. เพิ่มข้อมูลตัวอย่าง

```sql
INSERT INTO employees (name, email, department, salary, join_date, status) VALUES
('John Smith', 'john.smith@company.com', 'Engineering', 75000, '2023-01-15', 'Active'),
('Sarah Johnson', 'sarah.johnson@company.com', 'Marketing', 65000, '2023-02-01', 'Active'),
('Mike Chen', 'mike.chen@company.com', 'Engineering', 80000, '2023-01-20', 'Active');
```

## 🎯 ฟีเจอร์หลัก

### 📊 Dashboard

- สถิติจำนวนพนักงาน
- เงินเดือนเฉลี่ย/สูงสุด/ต่ำสุด
- กราฟแสดงข้อมูลตามแผนก
- กราฟแสดงเงินเดือน

### 👥 จัดการพนักงาน

- เพิ่มพนักงานใหม่
- แสดงรายชื่อพนักงาน
- ค้นหาพนักงาน
- กรองตามแผนก

### 📈 กราฟและชาร์ต

- Pie Chart: จำนวนพนักงานตามแผนก
- Bar Chart: เงินเดือนพนักงาน (10 อันดับแรก)

## 🔧 การปรับแต่ง

### เปลี่ยน URL Node-RED

แก้ไข `src/services/api.ts`:

```typescript
const API_BASE_URL = "http://your-node-red-url:1880";
```

### เพิ่มแผนกใหม่

แก้ไข `src/components/AddEmployeeForm.tsx`:

```typescript
const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "IT",
  "CPE",
  "New Department", // เพิ่มตรงนี้
];
```

## 🧪 ทดสอบ API

เปิดไฟล์ `test-api.html` ในเบราว์เซอร์เพื่อทดสอบ API endpoints

## 📁 โครงสร้างไฟล์

```
dashboardnodered/
├── src/
│   ├── components/          # React Components
│   ├── services/           # API Services
│   ├── types/              # TypeScript Types
│   └── App.tsx             # Main App
├── node-red-endpoints.json # Node-RED Flow
├── test-api.html          # API Testing
└── README.md              # คู่มือเต็ม
```

## 🆘 การแก้ไขปัญหา

### Frontend ไม่แสดงข้อมูล

- ตรวจสอบ Node-RED ทำงานอยู่
- ตรวจสอบ CORS settings
- ตรวจสอบ API endpoints

### Database Error

- ตรวจสอบ MySQL connection
- ตรวจสอบ table structure
- ตรวจสอบ SQL queries

### CORS Error

- ตรวจสอบ CORS headers ใน Node-RED
- ตรวจสอบ API URL

## 🎉 พร้อมใช้งาน!

หลังจากตั้งค่าเสร็จแล้ว คุณจะมีระบบจัดการพนักงานที่สมบูรณ์พร้อมใช้งาน!

---

**📞 ต้องการความช่วยเหลือ?** ดูไฟล์ `README.md` และ `NODE-RED-SETUP.md` สำหรับรายละเอียดเพิ่มเติม
