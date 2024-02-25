import { ResponsiveLine } from '@nivo/line'
import { NivoLineChartData } from '../utill/NivoLineChart'

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
const findMaxValueFromNivoData = (nivoData :NivoLineChartData) =>{
  const maxValue :number = nivoData.data.reduce((acc : number,cur: {x:string, y:number}) :number => {
    if (acc< cur.y) {
      return cur.y
    } else {
      return acc
    }
  }, Number.NEGATIVE_INFINITY)
  return maxValue
}

const LineChart : React.FC<LineChartProps> = (props ) => {
    const {data} = props

    const minValueArray: number[] = data.map(findMinValueFromNivoData)
    const maxValueArray: number[] = data.map(findMaxValueFromNivoData)
    const minimum = minValueArray.reduce((acc : number,cur: number) =>{
      if (acc< cur) {
        return acc
      } else {
        return cur
      }
    },minValueArray[0])
    
    const maximum = maxValueArray.reduce((acc : number,cur: number) =>{
      if (acc < cur) {
        return cur
      } else {
        return acc
      }
    },maxValueArray[0])

    const createTickArray = (minimum : number, maximum : number, tickCount : number = 6) : number[] => {

      const result = [];
      const tickGap = Math.round( (maximum - minimum) / tickCount )
      const minTick = Math.round(minimum)
      for (let tick = minTick; tick <= maximum; tick += tickGap) {
        result.push(tick);
      }
      return result;
    }
    
    const tickArray = createTickArray(minimum,maximum)
    const axisLeftSetting = {
      tickValues: tickArray,
      format: (minimum > 10000) ? ".4s" : ""
    }
    const marginSetting = {
      bottom: 60,
      left: (minimum > 10000) ? 60: 40,
      right: 40,
      top: 20
    }
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
  axisBottom={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
}}
  enableArea
  areaBaselineValue={minimum}
  enableSlices='x'
  enableGridX={false}
  enableGridY={false}
  isInteractive


  enablePoints
  margin={marginSetting}
  
  xScale={{type:'point'}}
  yScale={{
    type: 'linear',
    min: minimum,
    max: maximum
  }}
  yFormat=" >-,.2~f"
  axisLeft={axisLeftSetting}
/>
}

export default LineChart;