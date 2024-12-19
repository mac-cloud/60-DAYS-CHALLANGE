import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import 'Styles/style.css';

ChartJS.register( Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale );


const UserVisitors = () => {
    const [users, setUsers] = useState([]);
    const [dayCount, setDayCount] = useState({});

    useEffect(() => {
        //fetch user data and metric
        const fetchData = async () => {

            try {
                const response = await axios.get('http://localhost:5000/api/metrics');
                const userData = response.data.users;
                

                setUsers(userData);

                //visit per day
                const  visitByDay = calculateVisitByDay(userData);
                setDayCount(visitByDay);
            } catch (error) {
              console.error('Error fetching data:', error);  
            }
        }
        fetchData();
    }, []);

    // calculate visits per day of the week
    const calculateVisitByDay = (userData) => {
        const dayCounts = {
            
          'Sunday' : 0,
          'Monday' : 0,
          'Tuesday' : 0,
          'Wednesday' : 0,
          'Thursday' : 0,
          'Friday': 0,
          'Saturday': 0,
        };
        userData.forEach(user => {
            if (!user.timestamp) return;
            const date = new Date(user.timestamp);
            if (isNaN(date)) return;
            const dayName = date.toLocaleString('en-US', {weekday: 'long'});
            dayCounts[dayName]++;
        });
        return dayCounts;
    };

    const chartLabels = Object.keys(dayCount);
    const chartData = Object.values(dayCount);
    
    const pieChartData = {

        labels: chartLabels,
        datasets: [
            {
                data: chartData,
                backgroundColor: [
                        '#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FFD633',
                        '#33FFBD', '#FF8333'
                      ],
                      hoverOffset: 4
            }
        ]
    };

    return (
        <div className="container">
          <h1>Users Who Visited the Site</h1>
    
          {/* User Table */}
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id || index}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{new Date (user.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
    
          {/* Pie Chart */}
          {Object.keys(dayCount).length > 0 &&(
            <div className="chart-container">
            <Pie data={pieChartData} />
          </div>
          )}
          
        </div>
      );
    };

export default UserVisitors;