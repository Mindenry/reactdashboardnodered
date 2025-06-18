import React from "react";
import { Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { SalaryStats } from "../types/employee";

interface StatsCardsProps {
  totalEmployees: number;
  salaryStats: SalaryStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalEmployees,
  salaryStats,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      title: "จำนวนพนักงานทั้งหมด",
      value: totalEmployees,
      icon: Users,
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "เงินเดือนเฉลี่ย",
      value: formatCurrency(salaryStats.average),
      icon: DollarSign,
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      title: "เงินเดือนสูงสุด",
      value: formatCurrency(salaryStats.max),
      icon: TrendingUp,
      color: "bg-purple-500",
      textColor: "text-purple-600",
    },
    {
      title: "เงินเดือนต่ำสุด",
      value: formatCurrency(salaryStats.min),
      icon: TrendingDown,
      color: "bg-orange-500",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                <IconComponent className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
