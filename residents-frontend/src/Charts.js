import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Charts({ residents }) {
    // Example: Generate Pie chart for Residents by Ward
    const pieData = {
        labels: ['Ward 1', 'Ward 2', 'Ward 3'],
        datasets: [
            {
                data: [
                    residents.filter(res => res.Ward === 1).length,
                    residents.filter(res => res.Ward === 2).length,
                    residents.filter(res => res.Ward === 3).length,
                ],
                backgroundColor: ['red', 'green', 'blue'],
            },
        ],
    };

    // Example: Generate Bar chart for Age distribution
    const barData = {
        labels: ['Age 20-30', 'Age 31-40', 'Age 41-50', 'Age 51+'],
        datasets: [
            {
                label: 'Residents by Age',
                data: [
                    residents.filter(res => res.Age >= 20 && res.Age <= 30).length,
                    residents.filter(res => res.Age >= 31 && res.Age <= 40).length,
                    residents.filter(res => res.Age >= 41 && res.Age <= 50).length,
                    residents.filter(res => res.Age > 50).length,
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Charts & Visualization</h2>
            <div>
                <h3>Pie Chart: Residents by Ward</h3>
                <Pie data={pieData} />
            </div>
            <div>
                <h3>Bar Chart: Residents by Age</h3>
                <Bar data={barData} />
            </div>
        </div>
    );
}

export default Charts;
