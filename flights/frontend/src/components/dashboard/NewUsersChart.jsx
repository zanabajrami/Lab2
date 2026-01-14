import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const NewUsersChart = ({ users }) => {
    const processData = () => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        // 1. Gjejmë 6 muajt e fundit në rend kronologjik
        const last6MonthsLabels = [];
        const counts = new Array(6).fill(0);
        const now = new Date();

        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            last6MonthsLabels.push({
                name: monthNames[d.getMonth()],
                month: d.getMonth(),
                year: d.getFullYear()
            });
        }

        // 2. Filtrojmë përdoruesit që hyjnë në këta 6 muaj
        users.forEach(user => {
            const userDate = new Date(user.created_at);
            const userMonth = userDate.getMonth();
            const userYear = userDate.getFullYear();

            // Kontrollojmë në cilin nga 6 muajt e fundit bën pjesë ky përdorues
            last6MonthsLabels.forEach((target, index) => {
                if (userMonth === target.month && userYear === target.year) {
                    counts[index]++;
                }
            });
        });

        return {
            labels: last6MonthsLabels.map(m => m.name), // Merr vetëm emrat "Oct", "Nov" etj.
            datasets: [
                {
                    label: "New Users",
                    data: counts,
                    fill: true,
                    borderColor: "#2563eb",
                    backgroundColor: "rgba(37, 99, 235, 0.1)",
                    borderWidth: 3,
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#2563eb",
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    tension: 0.4,
                },
            ],
        };
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0f172a',
                padding: 12,
                borderRadius: 12,
                titleFont: { size: 13, weight: 'bold' },
                bodyFont: { size: 14, weight: 'bold' },
                displayColors: false,
                callbacks: {
                    label: (context) => ` ${context.raw} New Users`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { 
                    stepSize: 1, 
                    font: { weight: '600', size: 11 }, 
                    color: '#94a3b8' 
                },
                grid: { color: "rgba(226, 232, 240, 0.4)", drawBorder: false }
            },
            x: {
                grid: { display: false },
                ticks: { 
                    font: { weight: '600', size: 11 }, 
                    color: '#94a3b8' 
                }
            }
        }
    };

    return <Line data={processData()} options={options} />;
};

export default NewUsersChart;