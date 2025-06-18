import React from "react";
import { Employee } from "../types/employee";
import { RefreshCw, Search } from "lucide-react";

interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
  onRefresh: () => void;
  onSearch: (query: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  loading,
  onRefresh,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(salary);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH");
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">รายชื่อพนักงาน</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="ค้นหาพนักงาน..."
              value={searchQuery}
              onChange={handleSearch}
              className="input-field pl-10 pr-4"
            />
          </div>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="btn-secondary flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            รีเฟรช
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  ชื่อ
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  อีเมล
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  แผนก
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  เงินเดือน
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  วันที่เข้างาน
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  สถานะ
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-gray-600">{employee.id}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {employee.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{employee.email}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {employee.department}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-green-600">
                    {formatSalary(employee.salary)}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {formatDate(employee.join_date)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        employee.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              ไม่พบข้อมูลพนักงาน
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
