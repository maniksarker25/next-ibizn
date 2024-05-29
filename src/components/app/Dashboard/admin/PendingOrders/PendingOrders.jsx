
const PendingOrders = () => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="text-center">
                        <th className="py-2 px-1 border-b">RESORT NAME</th>
                        <th className="py-2 px-1 border-b">REGION</th>
                        <th className="py-2 px-1 border-b">COUNTRY</th>
                        <th className="py-2 px-1 border-b">DISTRICT</th>
                        <th className="py-2 px-1 border-b">DELETE</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
};

export default PendingOrders;