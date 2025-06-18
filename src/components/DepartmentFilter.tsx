import React from "react";
import { Filter } from "lucide-react";

interface DepartmentFilterProps {
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  departments: string[];
}

const DepartmentFilter: React.FC<DepartmentFilterProps> = ({
  selectedDepartment,
  onDepartmentChange,
  departments,
}) => {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-800">กรองตามแผนก</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => onDepartmentChange("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedDepartment === "all"
              ? "bg-primary-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          ทั้งหมด
        </button>

        {departments.map((department) => (
          <button
            key={department}
            onClick={() => onDepartmentChange(department)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedDepartment === department
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {department}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DepartmentFilter;
