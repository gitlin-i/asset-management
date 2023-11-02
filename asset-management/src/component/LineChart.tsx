import { ResponsiveLine } from '@nivo/line'
import { NivoLineChartData } from '../utill/NivoLineChart'


// type NivoLineChartData = {id:string, data: {x:string, y:number}[]}
interface LineChartProps {
    data : Array<NivoLineChartData>
}

const findMinValueFromNivoData = (nivoData :NivoLineChartData) =>{
    const minValue :number = nivoData.data.reduce((acc : number,cur: {x:string, y:number}) :number => {
      if (acc< cur.y) {
        return acc
      } else {
        return cur.y
      }
    }, Number.POSITIVE_INFINITY)
    return minValue
  }

const LineChart : React.FC<LineChartProps> = (props ) => {
    const {data} = props

    const minValueArray: number[] = data.map((nivodata: NivoLineChartData) => {
      return findMinValueFromNivoData(nivodata)
    })
    const minimum = minValueArray.reduce((acc : number,cur: number) =>{
      if (acc< cur) {
        return acc
      } else {
        return cur
      }
    },minValueArray[0])

    return <ResponsiveLine
    animate
    curve="linear"
    data={data}
    defs={[
      {
        colors: [
          {
            color: 'inherit',
            offset: 0
          },
          {
            color: 'inherit',
            offset: 100,
            opacity: 0
          }
        ],
        id: 'gradientA',
        type: 'linearGradient'
      }
    ]}
    fill={[
      {
        id: 'gradientA',
        match: '*'
      }
    ]}
  axisBottom={null}
  enableArea
  areaBaselineValue={minimum}
  enableSlices='x'
  enableGridX={false}
  enableGridY={false}
  isInteractive


  enablePoints
  margin={{
    bottom: 60,
    left: 40,
    right: 20,
    top: 20
  }}
  // xScale={{ type: 'linear', min: 'auto' , max: 'auto' }}
  xScale={{type:'point'}}
  yScale={{
    stacked: true,
    type: 'linear',
    min: 'auto',
    max: 'auto'
  }}
  
/>
}

export default LineChart;