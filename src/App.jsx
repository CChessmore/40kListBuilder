import { useEffect, useState } from 'react'
import './App.css'
import MainLayout from './components/Layout/MainLayout'
import ArmyBar from './components/ArmyBar'
import UnitSelector from './components/UnitSelector'
import ArmyList from './components/ArmyList'
import UnitDetail from './components/UnitDetail'
import AssistantPanel from './components/AssistantPanel'

function App() {
  const [count, setCount] = useState(0)
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [armyName, setArmyName] = useState("");
  const [armyList, setArmyList] = useState([]);
  const [savedArmies, setSavedArmies] = useState({});
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

  const handleSaveArmy = () => {
  if(!armyName) {
    alert("Enter an army name first.");
    return;
  }
  //Add saved armies to currently existing array of saved armies
  const newSaves = {...savedArmies, [armyName]: armyList };
  setSavedArmies(newSaves);
  localStorage.setItem("savedArmies", JSON.stringify(newSaves));
  localStorage.setItem("armyList", JSON.stringify(armyList));
  localStorage.setItem("currentArmy", armyName);
  };
  
  
  //Load a saved army
  const handleLoadArmy = (name) => {
  setArmyName(name);
  const loaded = savedArmies[name] || [];
  setArmyList(loaded);
  localStorage.setItem("armyList", JSON.stringify(loaded));
  localStorage.setItem("currentArmy", name);
  }
  //Delete a saved army
  const handleDeleteArmy = (name) => {
  const confirmed = window.confirm(`Delete '${name}'?`);
  if (!confirmed) return;
  const newSaves = { ...savedArmies };
  delete newSaves[name];

  setSavedArmies(newSaves);
  localStorage.setItem("savedArmies", JSON.stringify(newSaves));

  if (armyName === name) {
    setArmyName("");
    setArmyList([]);
    localStorage.removeItem("armyList");
    localStorage.removeItem("currentArmy");
  }
};

  //Attempt to parse saved armies in local storage
  useEffect(() => {
    const saved = localStorage.getItem("armyList");
    if(saved) {
      try {
        const parsed = JSON.parse(saved);
        setArmyList(parsed);
      } catch (e) {
        console.error("Failed to parse saved army list.",e);
      }
    }
  }, []);

  //Save army list to local storage as JSON
  useEffect(() => {
    localStorage.setItem("armyList", JSON.stringify(armyList));
  },  [armyList]);

  //Get saved army lists
  useEffect(() => {
  const saved = localStorage.getItem("savedArmies");
  if (saved) {
    try {
      setSavedArmies(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to load saved armies:", e);
    }
  }},[]);

  //Get current army from local storage
  const current = localStorage.getItem("currentArmy");
  if (current) {
    setArmyName(current);
    const armyList = JSON.parse(localStorage.getItem("armyList"));
    if (armyList) {
      setArmyList(armyList);
    }
  };

  return (
    
    <MainLayout
     armyBar={<ArmyBar
      armyName={armyName}
      savedArmies={savedArmies}
      onNameChange={setArmyName}
      onSave={handleSaveArmy}
      onLoad={handleLoadArmy}
      onDelete={handleDeleteArmy}
    />}
    left={<UnitSelector units={units} onSelect={setSelectedUnit} />}
    center={<ArmyList units={armyList} onRemove={handleRemoveUnit} />}
    right={<UnitDetail unit={selectedUnit} onAdd={handleAddToArmy} />}
    assistant={<AssistantPanel/>}
    />
  );
}

export default App
