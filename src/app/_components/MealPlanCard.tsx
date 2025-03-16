"use client";

import React from "react";

interface DayPlan {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

interface MealPlanCardProps {
  dayPlan: DayPlan;
}

const MealPlanCard: React.FC<MealPlanCardProps> = ({ dayPlan }) => {
  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-bold mb-4">{dayPlan.day}</h2>
      <div>
        <p className="mb-2">
          <span className="font-semibold">Breakfast:</span> {dayPlan.breakfast}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Lunch:</span> {dayPlan.lunch}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Dinner:</span> {dayPlan.dinner}
        </p>
      </div>
    </div>
  );
};

export default MealPlanCard;
