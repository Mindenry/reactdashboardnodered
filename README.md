# ระบบจัดการพนักงาน - React + Node-RED

ระบบจัดการพนักงานที่พัฒนาด้วย React Frontend และ Node-RED Backend พร้อมการเชื่อมต่อฐานข้อมูล MySQL

## คุณสมบัติ

- 📊 **Dashboard แบบ Real-time** - แสดงสถิติและข้อมูลพนักงานแบบสด
- 👥 **จัดการพนักงาน** - เพิ่ม แสดง และค้นหาพนักงาน
- 📈 **กราฟและชาร์ต** - แสดงข้อมูลในรูปแบบ Pie Chart และ Bar Chart
- 🔍 **การค้นหาและกรอง** - ค้นหาพนักงานและกรองตามแผนก
- 💰 **สถิติเงินเดือน** - แสดงค่าเฉลี่ย สูงสุด ต่ำสุดของเงินเดือน
- 🎨 **UI ที่สวยงาม** - ใช้ Tailwind CSS และ Lucide Icons

## โครงสร้างโปรเจค

```
dashboardnodered/
├── src/
│   ├── components/
│   │   ├── EmployeeTable.tsx      # ตารางแสดงพนักงาน
│   │   ├── AddEmployeeForm.tsx    # ฟอร์มเพิ่มพนักงาน
│   │   ├── DepartmentFilter.tsx   # กรองตามแผนก
│   │   ├── StatsCards.tsx         # การ์ดแสดงสถิติ
│   │   └── Charts.tsx             # กราฟและชาร์ต
│   ├── services/
│   │   └── api.ts                 # API service สำหรับ Node-RED
│   ├── types/
│   │   └── employee.ts            # TypeScript types
│   ├── App.tsx                    # Component หลัก
│   └── index.css                  # CSS หลัก
├── node-red-endpoints.json        # HTTP endpoints สำหรับ Node-RED
└── package.json
```

## การติดตั้งและใช้งาน

### 1. ติดตั้ง Dependencies

```bash
cd dashboardnodered
npm install
```

### 2. ตั้งค่า Node-RED

1. เปิด Node-RED ในเบราว์เซอร์ (http://localhost:1880)
2. Import ไฟล์ `node-red-endpoints.json` เข้าไปใน Node-RED
3. ตรวจสอบการเชื่อมต่อฐานข้อมูล MySQL
4. Deploy flow

### 3. ตั้งค่าฐานข้อมูล MySQL

สร้างฐานข้อมูลและตาราง:

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

### 4. รัน Frontend

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ http://localhost:5173

## API Endpoints

### GET /api/employees

ดึงข้อมูลพนักงานทั้งหมด

**Request:**

```json
{
  "topic": "SELECT * FROM employees ORDER BY join_date DESC"
}
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "John Smith",
    "email": "john.smith@company.com",
    "department": "Engineering",
    "salary": 75000,
    "join_date": "2023-01-15",
    "status": "Active"
  }
]
```

### POST /api/employees/add

เพิ่มพนักงานใหม่

**Request:**

```json
{
  "name": "New Employee",
  "email": "new@company.com",
  "department": "Engineering",
  "salary": "80000"
}
```

**Response:**

```json
{
  "success": true,
  "message": "เพิ่มพนักงานสำเร็จ",
  "id": 11
}
```

## การปรับแต่ง

### เปลี่ยน URL ของ Node-RED

แก้ไขไฟล์ `src/services/api.ts`:

```typescript
const API_BASE_URL = "http://your-node-red-url:1880";
```

### เพิ่มแผนกใหม่

แก้ไขไฟล์ `src/components/AddEmployeeForm.tsx`:

```typescript
const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "IT",
  "CPE",
  "New Department", // เพิ่มแผนกใหม่
];
```

## เทคโนโลยีที่ใช้

### Frontend

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Recharts** - Charts และ Graphs
- **Lucide React** - Icons
- **Axios** - HTTP Client

### Backend

- **Node-RED** - Flow-based Programming
- **MySQL** - Database
- **HTTP Nodes** - REST API

## การแก้ไขปัญหา

### 1. CORS Error

ตรวจสอบว่า Node-RED มี CORS headers ที่ถูกต้อง:

```json
{
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
}
```

### 2. Database Connection Error

ตรวจสอบการตั้งค่าการเชื่อมต่อ MySQL ใน Node-RED:

- Host: localhost
- Port: 3306
- Database: dashboard_db
- Username และ Password

### 3. API Timeout

เพิ่ม timeout ใน `src/services/api.ts`:

```typescript
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // เพิ่มเป็น 30 วินาที
});
```

## การพัฒนาเพิ่มเติม

### เพิ่มฟีเจอร์ใหม่

1. **การแก้ไขพนักงาน** - เพิ่มฟอร์มแก้ไขข้อมูล
2. **การลบพนักงาน** - เพิ่มปุ่มลบพร้อม confirmation
3. **Export ข้อมูล** - Export เป็น CSV หรือ Excel
4. **Authentication** - เพิ่มระบบล็อกอิน
5. **Real-time Updates** - ใช้ WebSocket สำหรับข้อมูลสด

### ปรับปรุง Performance

1. **Pagination** - แบ่งหน้าข้อมูล
2. **Caching** - Cache ข้อมูลใน localStorage
3. **Lazy Loading** - โหลดข้อมูลตามต้องการ
4. **Optimistic Updates** - อัปเดต UI ก่อน API response

## License

MIT License - ใช้งานได้อย่างอิสระ

## ผู้พัฒนา

พัฒนาด้วย ❤️ โดย AI Assistant
