# 🚀 ตั้งค่า Node-RED อย่างรวดเร็ว

## ขั้นตอนการตั้งค่า (5 นาที)

### 1. เปิด Node-RED

เปิดเบราว์เซอร์ไปที่: http://localhost:1880

### 2. ติดตั้ง MySQL Node

1. คลิก **Manage Palette** (ไอคอนเฟืองด้านขวาบน)
2. คลิก **Install** tab
3. ค้นหา: `node-red-node-mysql`
4. คลิก **Install**

### 3. Import Flow

1. คลิก **Menu** (ไอคอนแฮมเบอร์เกอร์) → **Import**
2. คัดลอกเนื้อหาจากไฟล์ `complete-node-red-flow.json`
3. วางในช่อง Import
4. คลิก **Import**

### 4. ตั้งค่า MySQL Connection

1. คลิกที่ node **mysql_config** (สีน้ำเงิน)
2. ตั้งค่า:
   - **Host**: localhost
   - **Port**: 3306
   - **Database**: dashboard_db
   - **User**: root (หรือ username ของคุณ)
   - **Password**: (password ของคุณ)
3. คลิก **Done**

### 5. สร้างฐานข้อมูล MySQL

เปิด Terminal และรัน:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE dashboard_db;
USE dashboard_db;
```

### 6. Deploy Flow

คลิกปุ่ม **Deploy** (สีแดง)

### 7. ทดสอบ API

```bash
# ทดสอบดึงข้อมูล
curl -X POST http://localhost:1880/api/employees \
  -H "Content-Type: application/json" \
  -d '{"topic": "SELECT * FROM employees ORDER BY join_date DESC"}'
```

## ตรวจสอบการทำงาน

### ใน Node-RED:

- ดู **Debug Panel** (ด้านขวา) - ควรเห็นข้อความ "Sample Data Created"
- ตรวจสอบว่า nodes ทั้งหมดเป็นสีเขียว

### ใน Frontend:

- รีเฟรชหน้าเว็บ http://localhost:5173
- ควรเห็นข้อมูลพนักงานแสดงผล

## การแก้ไขปัญหา

### ถ้า MySQL Connection Error:

- ตรวจสอบ MySQL ทำงานอยู่: `brew services list | grep mysql`
- ตรวจสอบ username/password
- ตรวจสอบ database `dashboard_db` มีอยู่

### ถ้า CORS Error:

- ตรวจสอบ CORS headers ใน HTTP Response nodes
- ตรวจสอบ OPTIONS method handler

### ถ้า 404 Error:

- ตรวจสอบ URL ใน HTTP In nodes: `/api/employees` และ `/api/employees/add`
- ตรวจสอบ Deploy flow แล้ว

## Flow ที่จะได้

```
HTTP In (/api/employees) → Parse Query → MySQL → Format Response → HTTP Response
HTTP In (/api/employees/add) → Prepare Add → MySQL → Format Add Response → HTTP Response
```

## สรุป

หลังจากทำตามขั้นตอนนี้ คุณจะมี:

- ✅ HTTP API endpoints พร้อมใช้งาน
- ✅ การเชื่อมต่อ MySQL
- ✅ ข้อมูลตัวอย่างในฐานข้อมูล
- ✅ CORS support สำหรับ frontend

ตอนนี้ frontend ควรเชื่อมต่อกับ Node-RED ได้แล้ว! 🎉
