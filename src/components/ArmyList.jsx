export default function ArmyList({ units, onRemove }) {
  const TYPE_ORDER = [
    "Epic Hero",
    "Character",
    "Infantry",
    "Battleline",
    "Vehicle",
    "Monster",
    "Allied Units",
  ];

  // Group units by type
  const grouped = TYPE_ORDER.map(type => ({
    type,
    units: units.filter(unit => unit.type === type),
  }));

  const isEmpty = units.length === 0;

  return (
    <div className="space-y-6">
      {isEmpty ? (
        <p className="text-gray-500 italic">Your army is empty.</p>
      ) : (
        grouped.map(group =>
          group.units.length > 0 && (
            <section key={group.type}>
              <h3 className="text-md font-bold mb-2">{group.type}</h3>
              <ul className="space-y-2">
                {group.units.map(unit => (
                  <li
                    key={unit.id}
                    className="p-2 border rounded bg-white flex justify-between items-center text-black"
                  >
                    <div>
                      <strong>{unit.name}</strong>
                    </div>
                    <button
                      onClick={() => onRemove(unit.id)}
                      className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:text-red-600 shadow-xs hover:shadow-gray-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )
        )
      )}
    </div>
  );
}