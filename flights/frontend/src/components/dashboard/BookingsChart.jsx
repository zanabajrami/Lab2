import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function NewBookingsChart({ bookings }) {

    const monthlyData = useMemo(() => {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const counts = Array(12).fill(0);

        bookings.forEach(b => {
            const date = new Date(b.created_at || b.departure_date);
            if (!isNaN(date)) counts[date.getMonth()] += 1;
        });

        return { months, counts };
    }, [bookings]);

    const data = {
        labels: monthlyData.months,
        datasets: [
            {
                label: "Bookings",
                data: monthlyData.counts,
                backgroundColor: "rgba(59, 130, 246, 0.8)",
                borderRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Ky është çelësi për mobile
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true, titleColor: "#fff", bodyColor: "#fff" },
        },
        scales: {
            x: {
                ticks: { color: "#fff" },
                grid: { color: "rgba(255,255,255,0.1)" }
            },
            y: {
                beginAtZero: true,
                ticks: { color: "#fff", stepSize: 1 },
                grid: { color: "rgba(255,255,255,0.1)" }
            }
        }
    };

    return (
        <div className="bg-slate-900 p-4 sm:p-6 md:p-8 rounded-2xl w-full h-[400px] flex flex-col">
  {/* Header majtas */}
  <div className="mb-2">
    <h3 className="text-lg md:text-xl font-black text-slate-200">
      Monthly <span className="text-blue-600">Bookings</span>
    </h3>
  </div>

  {/* Chart që zë gjithë hapësirën e mbetur */}
  <div className="flex-1">
    <Bar data={data} options={options} />
  </div>
</div>
    );
}