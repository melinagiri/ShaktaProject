// src/ResidentsReport.js
import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const ResidentsReport = () => {
    const data = [
        { month: 'Jan', count: 12 },
        { month: 'Feb', count: 19 },
        { month: 'Mar', count: 3 },
        { month: 'Apr', count: 5 },
        { month: 'May', count: 2 },
        { month: 'Jun', count: 3 },
    ];

    // Tabular Data
    const tableData = data.map((entry) => ({
        month: entry.month,
        count: entry.count,
    }));

    // Pie Chart Data
    const pieData = {
        labels: data.map((entry) => entry.month),
        datasets: [
            {
                label: 'Residents Count',
                data: data.map((entry) => entry.count),
                backgroundColor: ['#FFB6C1', '#FF6347', '#32CD32', '#FFD700', '#ADD8E6', '#FF4500'],
                borderColor: ['#FF6347', '#32CD32', '#FFD700', '#ADD8E6', '#FF4500', '#FFB6C1'],
                borderWidth: 1,
            },
        ],
    };

    // Bar Chart Data
    const barData = {
        labels: data.map((entry) => entry.month),
        datasets: [
            {
                label: 'Residents Count',
                data: data.map((entry) => entry.count),
                backgroundColor: '#4BC0C0',
                borderColor: '#36A2EB',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Residents Report</h2>

            {/* Tabular Format */}
            <h3>Data Table</h3>
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.month}</td>
                            <td>{entry.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pie Chart */}
            <h3>Pie Chart</h3>
            <Pie data={pieData} />

            {/* Bar Chart */}
            <h3>Bar Chart</h3>
            <Bar data={barData} />
        </div>
    );
};

export default ResidentsReport;
