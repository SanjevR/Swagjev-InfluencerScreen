import "../styles/pivotMenu.css";
import { IconContext } from "react-icons";
import { IoMdRefresh } from "react-icons/io";
import { CiViewColumn } from "react-icons/ci";
import { HiTableCells } from "react-icons/hi2";
import { LuSigma } from "react-icons/lu";
import Draggable from 'react-draggable';
import React, { useState } from "react";
 

 
 const PivotMenu = ({data}) => {
  
  const uniqueKey = new Set();

  data.forEach((item) => {
      Object.keys(item).forEach(key => {uniqueKey.add(key)});
  })

  const keys = Array.from(uniqueKey);

    const [fields, setFields] = useState({
      columns: keys,
      rows: [],
      values: []
  });

  const handleDragStart = (e, field, source) => {
      e.dataTransfer.setData('field', field);
      e.dataTransfer.setData('source', source);
  };

  const handleDrop = (e, target) => {
      const field = e.dataTransfer.getData('field');
      const source = e.dataTransfer.getData('source');

      setFields(prevState => {
          const newFields = { ...prevState };
          if (newFields[source]) {
              newFields[source] = prevState[source].filter(f => f !== field);
          }
          if (newFields[target] && !newFields[target].includes(field)) {
              newFields[target] = [...prevState[target], field];
          }
          return newFields;
      });
  };

  const handleDragOver = (e) => {
      e.preventDefault();
  };

  return (
      <div className="container-menu">
           <button style={{marginLeft:"210px", marginBottom:"10px"}}  className="pivot-button" type="onSubmit">
              <IconContext.Provider value={{ color: "#4C97DF" }}>
              <IoMdRefresh />  
              </IconContext.Provider>
              Refresh
          </button>
          <div>
              <span className="iconClass"><CiViewColumn/></span>
              <span className="menuTitle">Columns</span>
              <div
                  className="menuRectangle columns"
                  onDrop={(e) => handleDrop(e, 'columns')}
                  onDragOver={handleDragOver}>
                  {fields.columns.map((field,index) => (
                      <div
                          key={field + index}
                          draggable
                          onDragStart={(e) => handleDragStart(e, field, 'columns')}
                          className="draggableVal">
                          {field}
                      </div>
                  ))}
              </div>
          </div>

          <div>
              <span className="iconClass"><HiTableCells/></span>
              <span className="menuTitle">Rows</span>
              <div
                  className="menuRectangle rows"
                  onDrop={(e) => handleDrop(e, 'rows')}
                  onDragOver={handleDragOver}
              >
                  {fields.rows.map((field, index) => (
                      <div
                          key={field + '-' + index}
                          draggable
                          onDragStart={(e) => handleDragStart(e, field, 'rows')}
                          className="draggableVal">
                          {field}
                      </div>
                  ))}
              </div>
          </div>

          <div>
              <span className="iconClass"><LuSigma/></span>
              <span className="menuTitle">Values</span>
              <div
                  className="menuRectangle values"
                  onDrop={(e) => handleDrop(e, 'values')}
                  onDragOver={handleDragOver}>
                  {fields.values.map((field, index) => (
                      <div
                          key={field + '_' + index}
                          draggable
                          onDragStart={(e) => handleDragStart(e, field, 'values')}
                          className="draggableVal">
                          {field}
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );
};

export default PivotMenu