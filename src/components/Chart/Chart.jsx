import { useEffect, useMemo, useState } from 'react'
import * as echarts from 'echarts'

export const Chart = () => {
  const generateData = useMemo(() => {
    let data = []
    for (let i = 0; i < 100; i++) {
      const rnd = Math.random() * 100000
      data.push(rnd)
    }
    return data;
  },[])
  const text = 'React lesson'
  useEffect(() => {
    let option = {
      title: {
        text: text,
        show: true,
        textStyle: {
          // color: 'red',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        valueFormatter: (value) => 'bln ' + value,
      },
      legend: {
        //   data: [{
        //     name: '2011',
        //     // compulsorily set icon as a circle
        //     icon: 'circle',
        //     // set up the text in red
        //     textStyle: {
        //         color: 'red'
        //     }
        // }]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      // dataZoom: [
      //   {
      //     type: 'inside',
      //     xAxisIndex: [0],
      //     start: 10,
      //     end: 100,
      //     show: true,
      //   },
      //   {
      //     show: true,
      //     xAxisIndex: [0, 1],
      //     type: 'slider',
      //     bottom: 10,
      //     start: 10,
      //     end: 100,
      //   },
      // ],
      xAxis: {
        type: 'category',
        // boundaryGap: [0, 0.01]
        data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '2011',
          type: 'bar',
          data: [18203, 23489, 29034, 104970, 131744, 630230],
        },
        {
          name: '20asdfasdfasdf12',
          // type: 'bar',
          type: 'line',
          data: generateData,
          color: 'lightgreen',
        },
      ],
    }
    const chartDom = document.getElementById('chartsId')
    const myChart = echarts.init(chartDom)
    option && myChart.setOption(option)
  }, [generateData])

  return (
    <>
      <div style={{ width: '40wh', height: '700px' }} id="chartsId"></div>
    </>
  )
}
