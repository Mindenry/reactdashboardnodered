export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  join_date: string;
  status: string;
}

export interface EmployeeFormData {
  name: string;
  email: string;
  department: string;
  salary: string;
}

export interface DepartmentStats {
  department: string;
  count: number;
}

export interface SalaryStats {
  average: number;
  total: number;
  max: number;
  min: number;
  count: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
