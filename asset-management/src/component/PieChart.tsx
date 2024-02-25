import React from 'react'
import { PieCustomLayer, ResponsivePie } from '@nivo/pie'
import { NivoPieChartData } from '../utill/NivoPieChart'

interface PieChartProps {
    data: NivoPieChartData[];
    title?: string; 
    centerX?: number;
    centerY?: number; 
}

const PieChart : React.FC<PieChartProps> = ({data, title}) => {
    const centerTitleLayer : PieCustomLayer<NivoPieChartData> = ({centerX, centerY} ) => (
        <text
        x={centerX}
        y={centerY}
        textAnchor='middle'
        dominantBaseline='central'
        style={{ fontSize: '12px', fontWeight: 'bold' }}
        >
            {title}
        </text>
    )
    return (<ResponsivePie
        layers={['arcLinkLabels', 'arcs', 'arcLabels', 'legends',centerTitleLayer] }
        data={data}
        margin={{ top: 40, right: 20, bottom: 30, left: 80 }}
        valueFormat=" >-,"
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        sortByValue={true}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        
        colors={{scheme :'category10'}}
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                justify: false,
                translateX: -56,
                translateY: -20,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />)
}


export default PieChart