import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/statistics/StatisticsPie.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const StatisticsPie = () => {
    const { lessonId } = useParams();
    const COLORS = ['#95A5A6', '#F1C40F', '#2ECC71']; // grey, yellow, green
    const [studentProgress, setStudentProgress] = useState({
        not_started: 0,
        in_progress: 0,
        completed: 0
    });
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentProgress = async () => {
            try {
                // setLoading(true);
                const response = await fetch(`http://localhost:8000/lessons/studentProgress/${lessonId}/`);
                if (!response.ok) throw new Error("Failed to fetch progress");
                
                const data = await response.json();
                setStudentProgress(data);
            } catch (error) {
                console.error("Error fetching student progress:", error);
            } finally{
                // setLoading(false);
            }
        };
        if(lessonId){
            fetchStudentProgress();
        }
    }, [lessonId]);

    useEffect(() => {
        console.log("Updated student progress:", studentProgress);
        console.log("Lesson id: ", lessonId )
    }, [studentProgress, lessonId]);

    const chartData = [
        { name: 'Not Started', value: studentProgress.not_started },
        { name: 'In Progress', value: studentProgress.in_progress },
        { name: 'Completed', value: studentProgress.completed }
    ];

    return (
        <div className="pie-container">
            <span className="pie-title">Lesson Progress</span>
            <div className="pie">
                <PieChart width={300} height={300}>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60} // Donut effect
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={3}
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export default StatisticsPie;