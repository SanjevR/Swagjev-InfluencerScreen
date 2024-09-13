import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { dummyData } from '../../scripts/dummyData';

export function ChartBarComponent ({jsonData}) {
    const targetPassNos = jsonData.TARGET_RECORDS.map(record => record.PassNo);
    const targetExecutionVenues =jsonData.TARGET_RECORDS.map(record => record.EXECUTIONVENUE_13120);
    const targetPremiums = jsonData.TARGET_RECORDS.map(record => record.PREMIUM_13158);


    return(
        <Plot
        data={[
            {
                x: targetPassNos,
                y: targetExecutionVenues,
                type: 'bar',
                mode:'lines+points',
                textinfo:"label",
                marker: {color: 'blue'},
                name: 'ExecutionVenue'
             },
             {
                x: targetPassNos,
                y: targetPremiums,
                type: 'bar',
                mode:'lines+points',
                textinfo:"label",
                marker: {color: 'red'},
                name: 'Premiums'
             },


        ]}
        layout={{
            width: 800,
            height: 400,
            title: 'Example Bar Chart',
            
        }}
        />
    )
}

export function ChartScatterComponent({jsonData}){
    
    const sourcePassNos = jsonData.SOURCE_RECORDS.map(record => record.PassNo);
    const sourceExecutionVenues =jsonData.SOURCE_RECORDS.map(record => record.EXECUTIONVENUE_13120);
    const sourceParent = jsonData.SOURCE_RECORDS.map(record => record.PARENTLEGALENTITY_13113);

    
    return(
        <Plot
        data={[
            {
                x: sourcePassNos,
                y: sourceExecutionVenues,
                type: 'scatter',
                mode:'lines+markers',
                textinfo:"label",
                marker: {color: 'blue'},
                name: 'ExecutionVenue'
             },
             {
                x: sourcePassNos,
                y: sourceParent,
                type: 'scatter',
                mode:'lines+points',
                textinfo:"label",
                marker: {color: 'red'},
                name: 'Parent'
             },


        ]}
        layout={{
            width: 800,
            height: 400,
            title: 'Example Scatter Chart',
            
        }}
        />
    )

}

export function ChartBarHoriComponent({jsonData}){
    const targetPassNos = jsonData.TARGET_RECORDS.map(record => record.PassNo);
    const targetExecutionVenues =jsonData.TARGET_RECORDS.map(record => record.EXECUTIONVENUE_13120);
    const targetPremiums = jsonData.TARGET_RECORDS.map(record => record.PREMIUM_13158);


    return(
        <Plot
        data={[
            {
                x: targetExecutionVenues,
                y: targetPassNos,
                type: 'bar',
                orientation: 'h',
                textinfo:'label+text+value',
                name: 'ExecutionVenue'
             },
             {
                x: targetPremiums,
                y: targetPassNos,
                type: 'bar',
                orientation:'h',
                color: 'red',
                textinfo:'label+text+value',
                name: 'Premiums'
             },


        ]}
        layout={{
            width: 800,
            height: 400,
            title: 'Example Bar Horizontal Chart',
            
        }}
        />
    )
}

    export function ChartPieComponent({jsonData}){
        const targetReconTypeCode = jsonData.TARGET_RECORDS.map(record => record.ReconTypeCode);
        const targetExecutionVenues =jsonData.TARGET_RECORDS.map(record => record.EXECUTIONVENUE_13120);
    
    
        return(
            <Plot
            data={[
                {
                    values: targetExecutionVenues,
                    labels: targetReconTypeCode,
                    type: 'pie',
                    textinfo:'label+percent+name',
                    name: 'ExecutionVenue'
                 }

    
            ]}
            layout={{
                width: 800,
                height: 400,
                title: 'Example Pie Chart',
                
            }}
            />
        )


    }

    export function ChartHeatMapComponent({jsonData}){
        const targetReconTypeCode = jsonData.TARGET_RECORDS.map(record => record.ReconTypeCode);
        const targetExecutionVenues =jsonData.TARGET_RECORDS.map(record => {
         return  [record.EXECUTIONVENUE_13120,
                record.PREMIUM_13158,
                record.PARENTLEGALENTITY_13113,
                record.UNDERLYINGINSTRUMENT_13117]  
        });
        
    
        return(
            <Plot
            data={[
                {
                    z: targetExecutionVenues,
                    y: targetReconTypeCode,
                    type: 'heatmap',
                    hoverongaps: false
                 }

    
            ]}
            layout={{
                width: 800,
                height: 400,
                title: 'Example Heatmap Chart',
                
            }}
            />
        )
    }

export function ChartAreaComponent({jsonData}){
    
        const sourcePassNos = jsonData.SOURCE_RECORDS.map(record => record.PassNo);
        const sourceExecutionVenues =jsonData.SOURCE_RECORDS.map(record => record.EXECUTIONVENUE_13120);
        const sourceParent = jsonData.SOURCE_RECORDS.map(record => record.PARENTLEGALENTITY_13113);
    
        
        return(
            <Plot
            data={[
                {
                    x: sourcePassNos,
                    y: sourceExecutionVenues,
                    type: 'scatter',
                    mode:'lines+markers',
                    fill:'tozeroy',
                    textinfo:"label",
                    marker: {color: 'blue'},
                    name: 'ExecutionVenue'
                 },
                 {
                    x: sourcePassNos,
                    y: sourceParent,
                    type: 'scatter',
                    fill:'tonexty',
                    mode:'lines+points',
                    textinfo:"label",
                    marker: {color: 'red'},
                    name: 'Parent'
                 },
    
    
            ]}
            layout={{
                width: 800,
                height: 400,
                title: 'Example Area Chart',
                
            }}
            />
        )
    
    }

export function ChartBubbleComponent({jsonData}){
    
        const sourcePassNos = jsonData.SOURCE_RECORDS.map(record => record.PassNo);
        const sourceExecutionVenues =jsonData.SOURCE_RECORDS.map(record => record.EXECUTIONVENUE_13120);
        const sourceParent = jsonData.SOURCE_RECORDS.map(record => record.PARENTLEGALENTITY_13113);
    
        
        return(
            <Plot
            data={[
                {
                    x: sourcePassNos,
                    y: sourceExecutionVenues,
                    mode:'markers',
                    marker: {    color: ['rgb(93, 164, 214)', 
                                        'rgb(255, 144, 14)',
                                        'rgb(44, 160, 101)',
                                        'rgb(255, 65, 54)'],
                            size: [40, 60, 80, 100], },
                    name: 'ExecutionVenue'
                 },
                 {
                    x: sourcePassNos,
                    y: sourceParent,
                    mode:'markers',
                    marker: {color: [ 'rgb(255, 144, 14)',
                        'rgb(255, 65, 54)',
                        'rgb(93, 164, 214)', 
                        'rgb(44, 160, 101)'
                        ],
            size: [40, 60, 80, 100],},
                    name: 'Parent'
                 },
    
    
            ]}
            layout={{
                width: 800,
                height: 400,
                title: 'Example Bubble Chart',
                showlegend: false
                
            }}
            />
        )
    
    }

    export function DisplayChartComponent({selectedOption}){
            console.log(selectedOption)
            const chartToDisplay = useMemo(() => {
                switch(selectedOption){
                    case 'barChart':
                    return <ChartBarComponent jsonData={dummyData}/>
        
                    case 'lineChart':
                    return <ChartScatterComponent jsonData={dummyData}/>
                    
                    case 'pieChart':
                    return <ChartPieComponent jsonData={dummyData}/>
        
                    case 'heatChart':
                    return <ChartHeatMapComponent jsonData={dummyData}/>
        
                    case 'barHorChart':
                    return <ChartBarHoriComponent jsonData={dummyData}/>
        
                    case 'areaChart':
                    return <ChartAreaComponent jsonData={dummyData}/>
        
                    case 'bubbleChart':
                    return <ChartBubbleComponent jsonData={dummyData}/>
        
                    default:
                    return null
                }
            }, [selectedOption]);
        return (
            <div>
                {chartToDisplay}
            </div>
        )
    }


