export default function RequestTable({ requests, onStatus }) {
  return (
    <table className="w-full text-left border">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-2">Car ID</th>
          <th className="p-2">Buyer</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((r) => (
          <tr key={r.id} className="border-t">
            <td className="p-2">{r.carId}</td>
            <td className="p-2">{r.buyerEmail}</td>
            <td className="p-2">{r.status}</td>
            <td className="p-2 space-x-2">
              {r.status === "pending" && (
                <>
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => onStatus(r.id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => onStatus(r.id, "rejected")}
                  >
                    Reject
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
