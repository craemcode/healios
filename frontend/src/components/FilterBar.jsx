export default function FilterBar({ category, setCategory }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <label className="font-medium text-gray-700">Filter by Category:</label>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded-lg focus:outline-none focus:border-orange-500"
      >
        <option value="">All</option>
        <option value="clinical">Clinical</option>
        <option value="electronics">Electronics</option>
        <option value="sanitation">Sanitation</option>
      </select>
    </div>
  );
}
