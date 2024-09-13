import React from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import "../styles/pivotTable.css"
import createPlotlyRenderer from 'react-pivottable/PlotlyRenderers';
import { dummyData } from '../../scripts/dummyData';
import {useState} from "react";



export default function PivotTableComponent () {
    const PlotlyRenderers = createPlotlyRenderer(Plot);
    const [state, setState] = useState([]);
    
        return (
            <PivotTableUI
                data={dummyData.TARGET_RECORDS}
                unusedOrientationCutoff={Infinity}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                onChange={(s) => setState(s)}
                {...state}
                />
       
        );
    }

