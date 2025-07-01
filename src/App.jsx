import { useState } from 'react'
import './App.css'
import MainLayout from './components/Layout/MainLayout'
import UnitSelector from './components/UnitSelector'
import ArmyList from './components/ArmyList'
import UnitDetail from './components/UnitDetail'
import AssistantPanel from './components/AssistantPanel'

function App() {
  const [count, setCount] = useState(0)
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [armyList, setArmyList] = useState([]);
  const units = [
    {
      id: 1,
      name: "Termagants",
      type: "Battleline",
      stats: "M6” WS4+ BS4+ S3 T3 W1",
      abilities: ["Swarm", "Objective Secured"]
    },
    {
      id: 2,
      name: "Zoanthropes",
      type: "Infantry",
      stats: "M6” WS4+ BS3+ S5 T5 W4",
      abilities: ["Warp Blast", "Synapse"]
    },
    {
      id: 3,
      name: "Carnifex",
      type: "Monster",
      stats: "M8” WS3+ BS4+ S6 T7 W8",
      abilities: ["Blistering Assault"]
    }
  ];

  const handleAddToArmy = (unit) => {
    if(unit && unit.name && unit.type) {
      const instance = {
        ...unit,
        id: crypto.randomUUID()
      };
    
    setArmyList(prevList => [...prevList, instance]);
    }
  };

  const handleRemoveUnit = (IDToRemove) => {
    setArmyList(prevList => prevList.filter(unit => unit.id !== IDToRemove)
    );
  };

  return (
    <MainLayout 
    left={<UnitSelector units={units} onSelect={setSelectedUnit} />}
    center={<ArmyList units={armyList} onRemove={handleRemoveUnit} />}
    right={<UnitDetail unit={selectedUnit} onAdd={handleAddToArmy} />}
    assistant={<AssistantPanel/>}
    />
  );
}

export default App
