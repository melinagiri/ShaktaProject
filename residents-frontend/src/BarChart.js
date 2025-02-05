import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DynamicBarChart = ({ data }) => {
    return (
        <div>
            <h3>Resident Distribution by Ward</h3>
            {data && data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p>No data available for the Bar Chart.</p>
            )}
        </div>
    );
};

export default BarChart;
