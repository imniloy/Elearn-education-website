import React from "react";

const DashboardItem = ({ icon, title }) => {
  return (
    <div className="dashboard-item-card">
      <>{icon}</>

      <p className="text-slate-200 mt-3 ">{title}</p>
    </div>
  );
};

export default DashboardItem;
