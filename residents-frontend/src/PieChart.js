import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PieChart = ({ data }) => {
    const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];  // Adding a color for 'Other'  // Color for each slice (blue for male, orange for female)

    return (
        <div>
            <h3>Sex Distribution</h3>
            {/* Only render the chart if data is available */}
            {data && data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={80}
                            label
                            labelLine={false}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </RechartsPieChart>
                </ResponsiveContainer>
            ) : (
                <p>No data available for the Pie Chart.</p>
            )}
        </div>
    );
};

export default PieChart;
