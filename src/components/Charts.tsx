import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Employee } from "../types/employee";

interface ChartsProps {
  employees: Employee[];
}

const Charts: React.FC<ChartsProps> = ({ employees }) => {
  // สร้างข้อมูลสำหรับ Pie Chart (แผนก)
  const departmentData = React.useMemo(() => {
    const deptCount: { [key: string]: number } = {};
    employees.forEach((emp) => {
      deptCount[emp.department] = (deptCount[emp.department] || 0) + 1;
    });

    return Object.entries(deptCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [employees]);

  // สร้างข้อมูลสำหรับ Bar Chart (เงินเดือน)
  const salaryData = React.useMemo(() => {
    return employees
      .sort((a, b) => b.salary - a.salary)
      .slice(0, 10) // แสดงแค่ 10 อันดับแรก
      .map((emp) => ({
        name: emp.name,
        salary: emp.salary,
      }));
  }, [employees]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FFC658",
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Pie Chart - จำนวนพนักงานตามแผนก */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          จำนวนพนักงานตามแผนก
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {departmentData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} คน`, "จำนวนพนักงาน"]} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - เงินเดือนพนักงาน */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          เงินเดือนพนักงาน (10 อันดับแรก)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis tickFormatter={formatCurrency} fontSize={12} />
            <Tooltip
              formatter={(value) => [
                formatCurrency(Number(value)),
                "เงินเดือน",
              ]}
              labelFormatter={(label) => `ชื่อ: ${label}`}
            />
            <Bar dataKey="salary" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
