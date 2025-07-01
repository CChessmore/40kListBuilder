export default function UnitSelector({ units, onSelect }) {
  // Define desired display order
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
    units: units.filter(unit => unit.type === type)
  }));

  return (
    <div className="space-y-6">
      {grouped.map(group => (
        group.units.length > 0 && (
          <section key={group.type}>
            <h3 className="text-md font-bold mb-2">{group.type}</h3>
            <ul className="space-y-1">
              {group.units.map(unit => (
                <li
                  key={unit.name}
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => onSelect(unit)}
                >
                  {unit.name}
                </li>
              ))}
            </ul>
          </section>
        )
      ))}
    </div>
  );
}