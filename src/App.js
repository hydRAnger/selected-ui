import React, { useState } from "react";

import "./App.css";
import Logistics from "./components/Logistics";
import SelectedUI from "./components/SelectedUI";

const generateEntities = () => {
  const entities = {};
  ["order", "item", "batch", "container", "shipment"].forEach(type => {
    const count = Math.round(Math.random() * Math.floor(10));
    entities[type] = [...Array(count).keys()].map(idx => ({
      type: type,
      id: `${type} - ${idx}`,
      name: `${type} - ${idx}`,
      selected: false
    }));
  });
  return entities;
};

function App() {
  const [entities, setEntities] = useState(generateEntities());

  const handleEntitySelect = (type, id) => {
    const targetIndex = entities[type].findIndex(e => e.id === id);
    if (targetIndex === -1) {
      console.error(`Entity not found: ${id}`);
      return;
    }
    const newEntities = {
      ...entities
    };
    newEntities[type][targetIndex].selected = !newEntities[type][targetIndex]
      .selected;
    setEntities(newEntities);
  };

  const handleResetAll = () => {
    const newEntities = Object.keys(entities).reduce((acc, type) => {
      acc[type] = entities[type].map(e => ({ ...e, selected: false }));
      return acc;
    }, {});
    setEntities(newEntities);
  };

  const handleResetType = type => {
    const newEntities = {
      ...entities
    };
    newEntities[type] = newEntities[type].map(e => ({
      ...e,
      selected: false
    }));
    setEntities(newEntities);
  };

  return (
    <div className="App">
      <Logistics entities={entities} onSelect={handleEntitySelect} />
      <SelectedUI
        entities={entities}
        onResetAll={handleResetAll}
        onResetType={handleResetType}
      />
    </div>
  );
}

export default App;
