import { useEffect, useState } from "react";
import axios from "axios";

export default function Flights() {
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 20; // 20 flights per page
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");
                if (!token) {
                    setError("User is not authenticated");
                    setLoading(false);
                    return;
                }

                const res = await axios.get(
                    `http://localhost:8800/api/flights?limit=1000`, // merr krejt flights për pagination lokal
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Rendit nga id ASC
                const sorted = res.data.data.sort((a, b) => a.id - b.id);
                setFlights(sorted);
                setTotalPages(Math.ceil(sorted.length / limit));
            } catch (err) {
                console.error("Failed to fetch flights:", err.response?.data || err.message);
                setError("Failed to fetch flights");
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, []);

    // Filter flights by search
    useEffect(() => {
        const filtered = flights.filter(
            f =>
                f.flight_code.toLowerCase().includes(search.toLowerCase()) ||
                (f.airline && f.airline.toLowerCase().includes(search.toLowerCase()))
        );
        setFilteredFlights(filtered);
        setTotalPages(Math.ceil(filtered.length / limit));
        setPage(1); // reset to first page
    }, [search, flights]);

    // Paginate flights
    const displayedFlights = filteredFlights.slice((page - 1) * limit, page * limit);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this flight?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8800/api/flights/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const updated = flights.filter(f => f.id !== id);
            setFlights(updated);
        } catch (err) {
            console.error("Failed to delete flight:", err.response?.data || err.message);
            alert("Failed to delete flight");
        }
    };

    const handleEdit = (id) => {
        window.location.href = `/admin/flights-edit/${id}`;
    };

    if (loading) return <div className="p-6 text-center">Loading flights...</div>;
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-black">Flights</h1>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by code or airline..."
                    className="border p-2 rounded w-full sm:w-1/3"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-xl shadow border overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                        <tr>
                            <th className="p-3">Code</th>
                            <th>Airline</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedFlights.length > 0 ? (
                            displayedFlights.map(f => (
                                <tr key={f.id} className="border-t">
                                    <td className="p-3 font-bold">{f.flight_code}</td>
                                    <td>{f.airline}</td>
                                    <td>{f.origin} ({f.from_code})</td>
                                    <td>{f.destination} ({f.to_code})</td>
                                    <td>{f.departure_time}</td>
                                    <td>{f.arrival_time}</td>
                                    <td>€{f.price}</td>
                                    <td className="space-x-2">
                                        <button
                                            onClick={() => handleEdit(f.id)}
                                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(f.id)}
                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center p-3">
                                    No flights found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex gap-2 mt-4 justify-center">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="px-3 py-1">
                    {page} / {totalPages}
                </span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
