export default function UnitDetail({ unit, onAdd }) {
  if (!unit) {
    return <p className="text-gray-600 italic">Select a unit to view details.</p>;
  }

  return (
    <div>
      <p><strong>Name:</strong> {unit.name}</p>
      <p><strong>Type:</strong> {unit.type}</p>
      <p><strong>Stats:</strong> {unit.stats}</p>
      <p><strong>Abilities:</strong> {unit.abilities.join(", ")}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700"
        onClick={() => onAdd(unit)}
      >
        Add to List
      </button>
    </div>
  );
}