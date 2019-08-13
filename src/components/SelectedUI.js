import React from "react";
import { css } from "emotion";

const caclulateSelectedInType = entities => {
  return entities.filter(e => e.selected).length;
};

const caclulateSelected = entities => {
  return Object.keys(entities).reduce((acc, type) => {
    return (acc += caclulateSelectedInType(entities[type]));
  }, 0);
};

function TypeCount(props) {
  const { type, icon, entities } = props;
  const count = caclulateSelectedInType(entities);
  const typeIconStyle = count => css`
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 11px;
    line-height: 11px;
    text-align: center;
    color: ${count > 0 ? "inherit" : "rgba(0, 0, 0, 0.2)"};
  `;

  const typeCountStyle = count => css`
    display: inline-block;
    width: 10px;
    height: 20px;
    margin-right: 5px;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    color: ${count > 0 ? "inherit" : "rgba(0, 0, 0, 0.2)"};
  `;

  return [
    <span key={`icon_${type}`} className={typeIconStyle(count)}>{icon}</span>,
    <span key={`count_${type}`} className={typeCountStyle(count)}>{count}</span>
  ];
}

export default function SelectedUI(props) {
  const { entities } = props;

  const wrapperStyle = css`
    width: 210px;
    height: 65px;
    margin: auto;
    padding-top: 5px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 25px 25px 0px 0px;
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    text-transform: uppercase;
    color: #11d1a6;
  `;

  const btnSumStyle = css`
    width: 200px;
    height: 40px;
    background: #ffffff;
    border: 4px solid rgba(17, 209, 166, 0.5);
    box-sizing: border-box;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    border-radius: 40px;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 2px;
    color: #11d1a6;
  `;

  return (
    <div className={wrapperStyle}>
      <button className={btnSumStyle}>
        {caclulateSelected(entities)} Selected
      </button>
      <div>
        <TypeCount type="order" icon="O" entities={entities["order"]} />
        <TypeCount type="item" icon="I" entities={entities["item"]} />
        <TypeCount type="batch" icon="B" entities={entities["batch"]} />
        <TypeCount type="container" icon="C" entities={entities["container"]} />
        <TypeCount type="shipment" icon="S" entities={entities["shipment"]} />
      </div>
    </div>
  );
}
