import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import '../Styles/style.css';

const ApplicationMetrics = () => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null); // Reference for the canvas itself
    const [activityData, setActivityData] = useState({
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        signups: [],
        logins: [],
        purchases: []
    });

    const [logEntries, setLogEntries] = useState([]);

    useEffect(() => {
        // Fetching activity metrics from backend
        axios.get('http://localhost:5000/api/activity-metrics')
            .then(response => {
                const { signups, logins, purchases } = response.data; // Extract purchases as well
                setActivityData(prevData => ({
                    ...prevData,
                    signups,
                    logins,
                    purchases // Add purchases data
                }));
            })
            .catch(error => {
                console.error('Error fetching activity metrics:', error);
            });

        // Fetching log entries from backend
        axios.get('http://localhost:5000/api/log-entries')
            .then(response => {
                setLogEntries(response.data);
            })
            .catch(error => {
                console.error('Error fetching log entries:', error);
            });
    }, []);

    useEffect(() => {
        // Check if canvas exists
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');

        // Destroy previous chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Create new chart
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: activityData.labels,
                datasets: [
                    {
                        label: 'Signups',
                        data: activityData.signups,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Logins',
                        data: activityData.logins,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Purchases',
                        data: activityData.purchases,
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });

    }, [activityData]); // Run this effect whenever activityData changes

    // Render log entries by type
    const renderLogsByType = (type) => {
        const filteredLogs = logEntries.filter(log => log.type === type);
        return filteredLogs.map((log, index) => (
            <div key={index} className={`log-entry ${log.type}`}>
                {log.message}
            </div>
        ));
    };
        return (
            <div>
              <h1>User Activity Metrics</h1>
        
              {/* Metrics Graphs */}
              <div className="chart-container">
                <h2>User Signups, Logins (Weekly)</h2>
                <canvas id="activityChart"></canvas>
              </div>
        
              {/* Activity Logs */}
              <div className="log-container">
                <h2>Activity Logs</h2>
        
                <div className="log-category-header">Signups</div>
                <div id="signup-logs">
                  {renderLogsByType('signup')}
                </div>
        
                <div className="log-category-header">Logins</div>
                <div id="login-logs">
                  {renderLogsByType('login')}
                </div>
        
                <div className="log-category-header">Failed Attempts</div>
                <div id="failed-logs">
                  {renderLogsByType('failed')}
                </div>
              </div>
            </div>
          );
 };

export default ApplicationMetrics;