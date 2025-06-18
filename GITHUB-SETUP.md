# 🚀 คำสั่งอัพโหลดโปรเจคลง GitHub

## ขั้นตอนการสร้าง Repository และอัพโหลด

### 1. สร้าง Repository ใหม่บน GitHub

1. ไปที่ https://github.com
2. คลิกปุ่ม **"New"** หรือ **"+"** → **"New repository"**
3. ตั้งชื่อ repository เช่น: `employee-dashboard-nodered`
4. เลือก **Public** หรือ **Private**
5. **อย่า** เลือก "Add a README file" (เพราะเรามีแล้ว)
6. คลิก **"Create repository"**

### 2. เชื่อมต่อ Local Repository กับ GitHub

หลังจากสร้าง repository แล้ว GitHub จะแสดงคำสั่ง ให้รันคำสั่งเหล่านี้:

```bash
# เพิ่ม remote origin (แทนที่ YOUR_USERNAME และ REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# ตั้งชื่อ branch หลักเป็น main (ถ้าต้องการ)
git branch -M main

# อัพโหลดโค้ดขึ้น GitHub
git push -u origin main
```

### 3. ตัวอย่างคำสั่งที่สมบูรณ์

```bash
# ตัวอย่างสำหรับ username: mind และ repository: employee-dashboard-nodered
git remote add origin https://github.com/mind/employee-dashboard-nodered.git
git branch -M main
git push -u origin main
```

### 4. คำสั่งสำหรับการอัพเดทในอนาคต

```bash
# เพิ่มไฟล์ที่เปลี่ยนแปลง
git add .

# Commit การเปลี่ยนแปลง
git commit -m "อัพเดท: คำอธิบายการเปลี่ยนแปลง"

# อัพโหลดขึ้น GitHub
git push
```

## ข้อมูล Repository

- **ชื่อ**: Employee Dashboard with Node-RED Backend
- **คำอธิบาย**: ระบบจัดการพนักงานที่ใช้ React + TypeScript + Tailwind CSS สำหรับ Frontend และ Node-RED + MySQL สำหรับ Backend
- **เทคโนโลยี**: React, TypeScript, Tailwind CSS, Node-RED, MySQL, Recharts

## ไฟล์สำคัญ

- `README.md` - คู่มือการใช้งาน
- `QUICK-START.md` - เริ่มต้นใช้งานอย่างรวดเร็ว
- `SETUP-NODE-RED.md` - ตั้งค่า Node-RED
- `complete-node-red-flow.json` - Flow Node-RED พร้อมใช้งาน
- `src/` - โค้ด Frontend
- `package.json` - Dependencies

## การ Deploy

### Frontend (Vercel/Netlify)

```bash
npm run build
```

### Backend (Node-RED)

- Import flow จาก `complete-node-red-flow.json`
- ตั้งค่า MySQL connection
- Deploy flow

## สนับสนุน

หากมีปัญหาในการอัพโหลดหรือตั้งค่า สามารถดู:

- `README.md` - คู่มือการใช้งาน
- `QUICK-START.md` - เริ่มต้นใช้งานอย่างรวดเร็ว
- `SETUP-NODE-RED.md` - ตั้งค่า Node-RED
