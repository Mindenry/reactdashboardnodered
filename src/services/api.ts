import axios from "axios";
import { Employee, EmployeeFormData, ApiResponse } from "../types/employee";

const API_BASE_URL = "http://localhost:1880";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// API endpoints สำหรับ Node-RED
export const employeeApi = {
  // ดึงข้อมูลพนักงานทั้งหมด
  getAllEmployees: async (): Promise<Employee[]> => {
    try {
      // ส่ง request ไปยัง Node-RED endpoint ที่คุณสร้างไว้
      const response = await api.post("/api/employees", {
        topic: "SELECT * FROM employees ORDER BY join_date DESC",
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw new Error("ไม่สามารถดึงข้อมูลพนักงานได้");
    }
  },

  // ดึงข้อมูลพนักงานตามแผนก
  getEmployeesByDepartment: async (department: string): Promise<Employee[]> => {
    try {
      const query =
        department === "all"
          ? "SELECT * FROM employees ORDER BY join_date DESC"
          : `SELECT * FROM employees WHERE department = '${department}' ORDER BY join_date DESC`;

      const response = await api.post("/api/employees", {
        topic: query,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching employees by department:", error);
      throw new Error("ไม่สามารถดึงข้อมูลพนักงานตามแผนกได้");
    }
  },

  // เพิ่มพนักงานใหม่
  addEmployee: async (
    employeeData: EmployeeFormData
  ): Promise<ApiResponse<Employee>> => {
    try {
      const response = await api.post("/api/employees/add", employeeData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error adding employee:", error);
      return { success: false, error: "ไม่สามารถเพิ่มพนักงานได้" };
    }
  },

  // ดึงสถิติแผนก
  getDepartmentStats: async (): Promise<{ [key: string]: number }> => {
    try {
      const employees = await employeeApi.getAllEmployees();
      const stats: { [key: string]: number } = {};

      employees.forEach((emp) => {
        stats[emp.department] = (stats[emp.department] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error("Error getting department stats:", error);
      return {};
    }
  },

  // ดึงสถิติเงินเดือน
  getSalaryStats: async () => {
    try {
      const employees = await employeeApi.getAllEmployees();
      if (employees.length === 0) {
        return {
          average: 0,
          total: 0,
          max: 0,
          min: 0,
          count: 0,
        };
      }

      const salaries = employees.map((emp) => emp.salary);
      const total = salaries.reduce((sum, salary) => sum + salary, 0);
      const average = total / salaries.length;
      const max = Math.max(...salaries);
      const min = Math.min(...salaries);

      return {
        average: Math.round(average),
        total,
        max,
        min,
        count: salaries.length,
      };
    } catch (error) {
      console.error("Error getting salary stats:", error);
      return {
        average: 0,
        total: 0,
        max: 0,
        min: 0,
        count: 0,
      };
    }
  },
};

export default api;
