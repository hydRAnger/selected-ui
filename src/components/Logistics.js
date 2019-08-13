import React from 'react';
import { css } from "emotion";

const typeModel = {
  order: {
    color: "#da6136"
  },
  item: {
    color: "#eeaa44"
  },
  batch: {
    color: "#5bb54b"
  },
  container: {
    color: "#58a7df"
  },
  shipment: {
    color: "#2357a9"
  }
};

function LogisticColumn(props) {
  const { type, entities, onSelect } = props;
  const columnStyle = type => css`
    background-color: ${typeModel[type].color};
  `;

  return (
    <div className={columnStyle(type)}>
      {entities.map(entity => (
        <div key={entity.id}>
          <input
            type="checkbox"
            defaultChecked={entity.selected}
            value={entity.id}
            onChange={() => {
              onSelect && onSelect(type, entity.id)
            }}
          />
          <label>{entity.name}</label>
        </div>
      ))}
    </div>
  );
}

export default function Logistics(props) {
  const { entities, onSelect } = props;
  const containerStyle = css`
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
  `;

  return (
    <div className={containerStyle}>
      <LogisticColumn type="order" entities={entities["order"]} onSelect={onSelect} />
      <LogisticColumn type="item" entities={entities["item"]} onSelect={onSelect} />
      <LogisticColumn type="batch" entities={entities["batch"]} onSelect={onSelect} />
      <LogisticColumn type="container" entities={entities["container"]} onSelect={onSelect} />
      <LogisticColumn type="shipment" entities={entities["shipment"]} onSelect={onSelect} />
    </div>
  );
}
