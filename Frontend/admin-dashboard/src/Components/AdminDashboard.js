import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import 'chart.js/auto'; // Required to auto-register all necessary chart components
import '../Styles/style.css'; // Assuming you separate the styles in a CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
    <Link to="/">Dashboard</Link>
    <Link to="/gallery">Gallery</Link>
    <Link to="/users">Users</Link>
    <Link to="/metric">Metrics</Link>
    <Link to="/payments">Payments</Link>
    <Link to="/notification">Notifications</Link>
    <Link to="/hiking">Hiking</Link>
    <Link to="/tent">Tent</Link>
    <Link to="/services">Services</Link>
    </div>
  );
};

const Card = ({ title, count }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  );
};

const ProjectCard = ({ company, members, budget, completion }) => {
  return (
    <div className="project-card">
      <div className="details">
        <p className="company">Company: {company}</p>
        <p className="members">Members: {members}</p>
        <p className="budget">Budget: ${budget}</p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${completion}%` }}></div>
        </div>
        <p>Completion: {completion}%</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    notifications: 0,
    usersVisited: 0,
    pendingCalls: 0,
    paymentsToday: 0,
    paymentsWeekly: [0, 0, 0, 0, 0, 0, 0]
  });

  useEffect(() => {
    // Mock data to simulate an API call
    const fetchData = () => {
      setDashboardData({
        notifications: 120,
        usersVisited: 3500,
        pendingCalls: 5,
        paymentsToday: 200,
        paymentsWeekly: [100, 150, 200, 50, 400, 500, 300]
      });
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Payments Done',
        data: dashboardData.paymentsWeekly,
        backgroundColor: 'rgba(52, 152, 219, 0.6)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="content">
      <h1>Admin Dashboard</h1>
      <div className="card-container">
        <Card title="Notifications" count={dashboardData.notifications} />
        <Card title="Users Visited" count={dashboardData.usersVisited} />
        <Card title="Pending Calls" count={dashboardData.pendingCalls} />
        <Card title="Payments Done Today" count={dashboardData.paymentsToday} />
      </div>

      <div className="chart-container">
        <h3>Payments Each Day of the Week</h3>
        <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
      </div>

      <div className="dashboard-container">
        <div className="project-section">
          <h3>Projects Overview</h3>
          <ProjectCard company="TechCorp" members={5} budget={100000} completion={80} />
          <ProjectCard company="Dev Solutions" members={8} budget={200000} completion={50} />
          <ProjectCard company="Green Innovations" members={4} budget={75000} completion={30} />
          <ProjectCard company="FutureTech" members={10} budget={150000} completion={60} />
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default AdminDashboard;
