import React from "react";

export default function ArmyBar({
  armyName,
  savedArmies,
  onNameChange,
  onSave,
  onLoad,
  onDelete,
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <input
          className="border px-2 py-1 rounded w-64"
          placeholder="Army Name"
          value={armyName}
          onChange={(e) => onNameChange(e.target.value)}
        />
        <button
          onClick={onSave}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <select
          className="border px-2 py-1 rounded"
          onChange={(e) => onLoad(e.target.value)}
          value={armyName || ""}
        >
          <option value="">-- Select Saved Army --</option>
          {Object.keys(savedArmies).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button
          onClick={() => onDelete(armyName)}
          className="px-3 py-1 bg-red-500 text-white rounded"
          disabled={!armyName}
        >
          Delete
        </button>
      </div>
    </div>
  );
}