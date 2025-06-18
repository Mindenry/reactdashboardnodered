import React, { useState } from "react";
import { EmployeeFormData } from "../types/employee";
import { UserPlus, X } from "lucide-react";

interface AddEmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  loading: boolean;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({
  onSubmit,
  loading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    department: "",
    salary: "",
  });
  const [errors, setErrors] = useState<Partial<EmployeeFormData>>({});

  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "IT",
    "CPE",
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<EmployeeFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "กรุณากรอกชื่อ";
    }

    if (!formData.email.trim()) {
      newErrors.email = "กรุณากรอกอีเมล";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    if (!formData.department) {
      newErrors.department = "กรุณาเลือกแผนก";
    }

    if (!formData.salary) {
      newErrors.salary = "กรุณากรอกเงินเดือน";
    } else if (isNaN(Number(formData.salary)) || Number(formData.salary) <= 0) {
      newErrors.salary = "เงินเดือนต้องเป็นตัวเลขที่มากกว่า 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({
        name: "",
        email: "",
        department: "",
        salary: "",
      });
      setIsOpen(false);
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center gap-2"
      >
        <UserPlus className="w-4 h-4" />
        เพิ่มพนักงานใหม่
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                เพิ่มพนักงานใหม่
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อ *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`input-field ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="กรอกชื่อพนักงาน"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  อีเมล *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`input-field ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="กรอกอีเมล"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  แผนก *
                </label>
                <select
                  value={formData.department}
                  onChange={(e) =>
                    handleInputChange("department", e.target.value)
                  }
                  className={`input-field ${
                    errors.department ? "border-red-500" : ""
                  }`}
                >
                  <option value="">เลือกแผนก</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เงินเดือน (USD) *
                </label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  className={`input-field ${
                    errors.salary ? "border-red-500" : ""
                  }`}
                  placeholder="กรอกเงินเดือน"
                  min="0"
                  step="0.01"
                />
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      กำลังเพิ่ม...
                    </>
                  ) : (
                    "เพิ่มพนักงาน"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary flex-1"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmployeeForm;
