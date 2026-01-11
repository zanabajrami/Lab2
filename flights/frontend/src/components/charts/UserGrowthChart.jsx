import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

export default function UserGrowthChart({ token }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchDailyStats = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/users/daily-stats", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setChartData(res.data);
            } catch (err) {
                console.error("Failed to fetch daily stats", err);
            }
        };

        fetchDailyStats();
    }, [token]);

    const data = {
        labels: chartData.map(d => d.day),
        datasets: [
            {
                label: "Users",
                data: chartData.map(d => d.total),
                borderColor: "blue",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                fill: true,
            }
        ]
    };

    return <Line data={data} />;
}
