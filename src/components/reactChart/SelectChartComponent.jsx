import React from 'react';

export default function SelectChartComponent({handleChange}){


const handleSelectedChange = (e) => {
          handleChange(e.target.value);
        }

        return (
            <label className="form-autoMatchDebug">
            <span>Chart Type:</span>
            <select onChange={(e) => handleSelectedChange(e)}>
                <option value="">Select chart type</option>
              <option value="barChart">Bar Chart</option>
              <option value="lineChart">Line Chart</option>
              <option value="pieChart">Pie Chart</option>
              <option value="heatChart">Heatmap Chart</option>
              <option value="barHorChart">Bar Horizontal Chart</option>
              <option value="areaChart">Area Chart</option>
              <option value="bubbleChart">Bubble Chart</option>
            </select>
          </label>
        );  
}