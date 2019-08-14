import React, { useState } from 'react';
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
  const { type, icon, entities, onReset } = props;
  const [hover, setHover] = useState(false);
  const count = caclulateSelectedInType(entities);

  const wrapperStyle = count => css`
    display: inline-block;
    margin-right: 5px;
    color: ${count > 0 ? "inherit" : "rgba(0, 0, 0, 0.2)"};
  `;

  const btnResetStyle = css`
    width: 30px;
    height: 14px;
    padding: 0;
    background: #ffffff;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
    border-radius: 50px;
    font-size: 11px;
    line-height: 11px;
    color: #ef4848;
  `;

  const typeIconStyle = css`
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 11px;
    line-height: 11px;
    text-align: center;
  `;

  const typeCountStyle = css`
    display: inline-block;
    width: 10px;
    height: 20px;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
  `;

  const handleReset = evt => {
    evt.preventDefault();
    onReset && onReset(type);
  };

  return (
    <div
      key={`type_${type}`}
      className={wrapperStyle(count)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && count > 0 ? (
        <button className={btnResetStyle} onClick={handleReset}>
          x
        </button>
      ) : (
        [
          <span key="icon" className={typeIconStyle}>
            {icon}
          </span>,
          <span key="count" className={typeCountStyle}>
            {count}
          </span>
        ]
      )}
    </div>
  );
}

export default function SelectedUI(props) {
  const { entities, onResetAll, onResetType } = props;

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

  const sumStyle = css`
    width: 200px;
    height: 40px;
    position: relative;
    left: 5px;
    padding: 10px 0;
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

  const btnResetAllStyle = css`
    width: 40px;
    height: 40px;
    border: none;
    padding: 0;
    background: transparent;
    position: absolute;
    top: -4px;
    left: 155px;
    color: #ccc;
    &:hover {
      color: #ef4848;
    }
  `;

  const handleResetAll = evt => {
    evt.preventDefault();
    onResetAll && onResetAll();
  };

  return (
    <div className={wrapperStyle}>
      <div className={sumStyle}>
        {caclulateSelected(entities)} Selected
        <button className={btnResetAllStyle} onClick={handleResetAll}>
          X
        </button>
      </div>
      <div>
        <TypeCount
          type="order"
          icon="O"
          entities={entities["order"]}
          onReset={onResetType}
        />
        <TypeCount
          type="item"
          icon="I"
          entities={entities["item"]}
          onReset={onResetType}
        />
        <TypeCount
          type="batch"
          icon="B"
          entities={entities["batch"]}
          onReset={onResetType}
        />
        <TypeCount
          type="container"
          icon="C"
          entities={entities["container"]}
          onReset={onResetType}
        />
        <TypeCount
          type="shipment"
          icon="S"
          entities={entities["shipment"]}
          onReset={onResetType}
        />
      </div>
    </div>
  );
}
