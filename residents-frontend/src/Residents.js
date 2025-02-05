import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Charts from './Charts';  // Import Charts component
import PieChart from './PieChart';
//import BarChart from './BarChart'; // Import the bar chart component
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Import necessary components

function Residents() {
    const [residents, setResidents] = useState([]);
    const [editingResident, setEditingResident] = useState(null);  // State for the resident being edited

    const [pieData, setPieData] = useState([]);
    const [wardCounts, setWardCounts] = useState([]);

    const [newResident, setNewResident] = useState({
        Ward: '',
        FullName: '',
        Caste: '',
        Sex: '',
        Age: '',
        Religion: '',
        Education: '',
        Occupation: '',
        Disability: ''
    });

    const [searchTerm, setSearchTerm] = useState('');

    // Calculate the count of residents by ward for the bar chart
    const prepareWardCounts = (residents) => {
        const wardCountMap = residents.reduce((acc, resident) => {
            const ward = resident.ward;
            if (acc[ward]) {
                acc[ward]++;
            } else {
                acc[ward] = 1;
            }
            return acc;
        }, {});

        // Convert the ward count map into an array of objects for the bar chart
        const wardData = Object.keys(wardCountMap).map((ward) => ({
            name: `Ward ${ward}`,
            count: wardCountMap[ward],
        }));

        setWardCounts(wardData);
    };

    // Fetch all residents from the backend API
    const fetchResidents = async () => {
        try {
            const response = await axios.get('http://localhost:5146/api/user');
            console.log("Fetched residents:", response.data); // Log the data
            setResidents(response.data); // Set data to state
            preparePieData(response.data);  // Prepare pie chart data when residents are fetched
            prepareWardCounts(response.data); // Prepare ward counts for the bar chart
        } catch (error) {
            console.error("Error fetching residents:", error);
        }
    };

    useEffect(() => {
        fetchResidents();
    }, []);

    const handleEdit = (resident) => {
        console.log("Editing resident with ID:", resident.id);
        setEditingResident(resident);  // Set the resident being edited
        setNewResident({
            Ward: resident.ward || '',
            FullName: resident.fullName || '',
            Caste: resident.caste || '',
            Sex: resident.sex || '',
            Age: resident.age || '',
            Religion: resident.religion || '',
            Education: resident.education || '',
            Occupation: resident.occupation || '',
            Disability: resident.disability || ''
        });
    };

    // Prepare the data for the pie chart (male vs female count)
    const preparePieData = (residents) => {
        const maleCount = residents.filter(resident => resident.sex && resident.sex.toLowerCase() === 'male').length;
        const femaleCount = residents.filter(resident => resident.sex && resident.sex.toLowerCase() === 'female').length;
        const otherCount = residents.filter((resident) => resident.sex && resident.sex.toLowerCase() === 'others').length; // Count for 'other'

        console.log('Male count:', maleCount);  // Debugging
        console.log('Female count:', femaleCount);  // Debugging

        const data = [
            { name: 'Male', value: maleCount },
            { name: 'Female', value: femaleCount },
            { name: 'Other', value: otherCount }, // Include 'Other'
        ];

        // If needed, filter out the categories with zero value
        const filteredPieData = pieData.filter(data => data.value > 0);

        console.log("Filtered Pie Data:", filteredPieData);
        console.log('Pie data:', data);  // Debugging

        setPieData(data);
    };

    

    // Handle input change for adding new resident
    const handleChange = (e) => {
        setNewResident({
            ...newResident,
            [e.target.name]: e.target.value
        });

        console.log(newResident); // Log to check if state is being updated
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newResident.FullName || !newResident.Caste || !newResident.Sex || !newResident.Religion || !newResident.Education || !newResident.Occupation || !newResident.Disability) {
            alert("Please fill all required fields!");
            return;
        }

        try {
            if (editingResident) {
                // Update the resident
                await axios.put(`http://localhost:5146/api/user/${editingResident.id}`, newResident);
                alert("Resident updated successfully!");
            } else {
                // Add a new resident
                await axios.post('http://localhost:5146/api/user', newResident);
                alert("Resident added successfully!");
            }

            fetchResidents(); // Refresh residents list
            setEditingResident(null);  // Reset the editing state
            setNewResident({});  // Clear the form after submit
        } catch (error) {
            console.error("Error during submission:", error);
            alert("An unexpected error occurred.");
        }
    };

    // Handle deleting a resident
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5146/api/user/${id}`);
        fetchResidents();
    };

    //// Filter residents based on search term
    //const filteredResidents = residents.filter(resident =>
    //    (resident.FullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    //    (resident.Caste?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    //);

    // Filter residents by search term across multiple columns
    const filteredResidents = residents.filter((resident) =>
        (resident.fullName && resident.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (resident.ward && resident.ward.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (resident.caste && resident.caste.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (resident.sex && resident.sex.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (resident.age && resident.age.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (resident.religion && resident.religion.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (resident.education && resident.education.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (resident.occupation && resident.occupation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (resident.disability && resident.disability.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    console.log(residents); // Log residents state

        return (
            <div>               
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="FullName"
                        value={newResident.FullName || ''}
                        onChange={handleChange}
                        placeholder="Full Name"
                    />
                    <input
                        type="number"
                        name="Ward"
                        value={newResident.Ward || ''}
                        onChange={handleChange}
                        placeholder="Ward"
                    />
                    <input
                        type="text"
                        name="Caste"
                        value={newResident.Caste || ''}
                        onChange={handleChange}
                        placeholder="Caste"
                    />
                    <input
                        type="text"
                        name="Sex"
                        value={newResident.Sex || ''}
                        onChange={handleChange}
                        placeholder="Sex"
                    />
                    <input
                        type="number"
                        name="Age"
                        value={newResident.Age || ''}
                        onChange={handleChange}
                        placeholder="Age"
                    />
                    <input
                        type="text"
                        name="Religion"
                        value={newResident.Religion || ''}
                        onChange={handleChange}
                        placeholder="Religion"
                    />
                    <input
                        type="text"
                        name="Education"
                        value={newResident.Education || ''}
                        onChange={handleChange}
                        placeholder="Education"
                    />
                    <input
                        type="text"
                        name="Occupation"
                        value={newResident.Occupation || ''}
                        onChange={handleChange}
                        placeholder="Occupation"
                    />
                    <input
                        type="text"
                        name="Disability"
                        value={newResident.Disability || ''}
                        onChange={handleChange}
                        placeholder="Disability"
                    />
                    <button type="submit">
                        {editingResident ? 'Update Resident' : 'Add Resident'}
                    </button>
                </form>

                 
                <h3> Search & Filter</h3>
                {/*<input*/}
                {/*    type="text" className="search-container"*/}
                {/*    placeholder="Search residents..."*/}
                {/*    onChange={(e) => setSearchTerm(e.target.value)}*/}
                {/*/>*/}
                {/* Search Bar */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by any field"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <h3>User Details</h3>
                {/* Render Residents Table */}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Ward</th>
                            <th>Caste</th>
                            <th>Sex</th>
                            <th>Age</th>
                            <th>Religion</th>
                            <th>Education</th>
                            <th>Occupation</th>
                            <th>Disability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResidents.map((resident) => (
                            <tr key={resident.id}>
                                <td>{resident.id}</td>
                                <td>{resident.fullName}</td>
                                <td>{resident.ward}</td>
                                <td>{resident.caste}</td>
                                <td>{resident.sex}</td>
                                <td>{resident.age}</td>
                                <td>{resident.religion}</td>
                                <td>{resident.education}</td>
                                <td>{resident.occupation}</td>
                                <td>{resident.disability}</td>
                                <td>
                                    <button>Edit</button>
                                    <button className="delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                {/* Display charts here */}
                <div className="charts-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                    {/* Pie Chart Section */}
                    <div className="chart1" style={{ flex: 1 }}>
                        <h3 style={{ textAlign: 'center' }}>Pie Chart</h3>
                        {pieData.length > 0 && <PieChart data={pieData} />}
                    </div>

                    {/* Bar Chart Section */}
                    <div className="chart2" style={{ flex: 1 }}>
                        <h3 style={{ textAlign: 'center' }}>Bar Chart</h3>
                        {wardCounts.length > 0 && (
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={wardCounts}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>


            </div>
        );
}
export default Residents;
