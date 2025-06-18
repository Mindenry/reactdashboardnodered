import React, { useState, useEffect } from "react";
import { Employee, EmployeeFormData, SalaryStats } from "./types/employee";
import { employeeApi } from "./services/api";
import EmployeeTable from "./components/EmployeeTable";
import AddEmployeeForm from "./components/AddEmployeeForm";
import DepartmentFilter from "./components/DepartmentFilter";
import StatsCards from "./components/StatsCards";
import Charts from "./components/Charts";
import { Users, Database, AlertCircle } from "lucide-react";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingEmployee, setAddingEmployee] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [salaryStats, setSalaryStats] = useState<SalaryStats>({
    average: 0,
    total: 0,
    max: 0,
    min: 0,
    count: 0,
  });

  // ดึงข้อมูลพนักงานทั้งหมด
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeApi.getAllEmployees();
      setEmployees(data);
      setFilteredEmployees(data);

      // คำนวณสถิติเงินเดือน
      const stats = await employeeApi.getSalaryStats();
      setSalaryStats(stats);
    } catch (err) {
      setError("ไม่สามารถดึงข้อมูลพนักงานได้");
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  // เพิ่มพนักงานใหม่
  const handleAddEmployee = async (employeeData: EmployeeFormData) => {
    try {
      setAddingEmployee(true);
      const result = await employeeApi.addEmployee(employeeData);

      if (result.success) {
        // รีเฟรชข้อมูลหลังจากเพิ่มสำเร็จ
        await fetchEmployees();
        alert("เพิ่มพนักงานสำเร็จ!");
      } else {
        alert(result.error || "เกิดข้อผิดพลาดในการเพิ่มพนักงาน");
      }
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการเพิ่มพนักงาน");
      console.error("Error adding employee:", err);
    } finally {
      setAddingEmployee(false);
    }
  };

  // กรองข้อมูลตามแผนก
  const handleDepartmentChange = async (department: string) => {
    setSelectedDepartment(department);
    try {
      setLoading(true);
      const data = await employeeApi.getEmployeesByDepartment(department);
      setFilteredEmployees(data);
    } catch (err) {
      setError("ไม่สามารถกรองข้อมูลตามแผนกได้");
      console.error("Error filtering by department:", err);
    } finally {
      setLoading(false);
    }
  };

  // ค้นหาพนักงาน
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(query.toLowerCase()) ||
        emp.email.toLowerCase().includes(query.toLowerCase()) ||
        emp.department.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  // ดึงข้อมูลเมื่อ component โหลด
  useEffect(() => {
    fetchEmployees();
  }, []);

  // สร้างรายการแผนกที่ไม่ซ้ำกัน
  const departments = Array.from(
    new Set(employees.map((emp) => emp.department))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                ระบบจัดการพนักงาน
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Database className="w-4 h-4" />
                <span>Node-RED Backend</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <StatsCards
          totalEmployees={employees.length}
          salaryStats={salaryStats}
        />

        {/* Charts */}
        <Charts employees={employees} />

        {/* Controls Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <DepartmentFilter
              selectedDepartment={selectedDepartment}
              onDepartmentChange={handleDepartmentChange}
              departments={departments}
            />
          </div>
          <div className="flex justify-end">
            <AddEmployeeForm
              onSubmit={handleAddEmployee}
              loading={addingEmployee}
            />
          </div>
        </div>

        {/* Employee Table */}
        <EmployeeTable
          employees={filteredEmployees}
          loading={loading}
          onRefresh={fetchEmployees}
          onSearch={handleSearch}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            © 2024 ระบบจัดการพนักงาน - พัฒนาด้วย React + Node-RED
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
