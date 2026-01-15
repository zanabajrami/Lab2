import { ArrowUpRight, ArrowDownRight, Info } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip
);

function KPICard({
    title,
    value,
    percent,
    compareLabel,
    sparkline,
    icon,
    tooltip,
    isDark = false, // Prop i ri për të kontrolluar stilin
}) {
    const isPositive = percent > 0;
    const isNeutral = percent === 0;

    const sparklineData = {
        labels: sparkline.map((_, i) => i),
        datasets: [
            {
                data: sparkline,
                borderWidth: 2,
                tension: 0.4,
                // Nëse është dark, grafiku mund të jetë blu ose i bardhë për dukshmëri më të mirë
                borderColor: isDark ? "#60a5fa" : (isPositive ? "#22c55e" : "#ef4444"),
                pointRadius: 0,
            },
        ],
    };

    const sparklineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { display: false },
            y: { display: false },
        },
    };

    return (
        <div className={`rounded-xl p-5 shadow-sm transition-all border ${isDark
                ? "bg-slate-950 border-slate-800 text-white"
                : "bg-white border-slate-200 text-zinc-900"
            }`}>
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className={`flex items-center gap-2 text-sm ${isDark ? "text-slate-400" : "text-zinc-500"
                    }`}>
                    {title}
                    <div className="group relative">
                        <Info className="w-4 h-4 cursor-pointer" />
                        <div className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md -top-8 left-0 whitespace-nowrap z-10">
                            {tooltip}
                        </div>
                    </div>
                </div>
                {/* Ikona merr ngjyrë blu nëse është dark mode */}
                <div className={isDark ? "text-blue-400" : ""}>
                    {icon}
                </div>
            </div>

            {/* Value */}
            <div className="mt-3 text-3xl font-semibold">{value}</div>

            {/* Change */}
          <div className={`mt-1 flex items-center gap-1 text-sm font-medium ${
    isNeutral ? "text-slate-400" : (isPositive ? "text-green-500" : "text-red-500")
}`}>
    {!isNeutral && (isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />)}
    {Math.abs(percent)}% 
    <span className={isDark ? "text-slate-500" : "text-zinc-400"}> vs {compareLabel}</span>
</div>

            {/* Sparkline */}
            <div className="h-12 mt-3">
                <Line data={sparklineData} options={sparklineOptions} />
            </div>
        </div>
    );
}

export default KPICard;