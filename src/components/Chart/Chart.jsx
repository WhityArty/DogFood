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
  const text = 'Что выбирают наши покупатели'
  useEffect(() => {
    let option = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: 'Статистика'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Сухой корм' , 'Полуфабрикаты', 'Домашняя еда', 'Домашние Лакомства']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Сухой корм',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [156, 278, 157, 264, 90, 340, 250]
        },
        {
          name: 'Домашняя еда',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 236, 111, 224, 220, 340, 310]
        },
        {
          name: 'Полуфабрикаты',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [356, 147, 235, 304, 180, 150, 225]
        },
        {
          name: 'Домашние Лакомства',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 135)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 350, 231, 189, 200, 350, 450]
        },
      ]
    };

    const chartDom = document.getElementById('chartsId')
    const myChart = echarts.init(chartDom)
    option && myChart.setOption(option)
  }, [generateData])


  return (
    <>
      <div style={{ width: '40wh', height: '600px' }} id="chartsId"></div>
    </>
)}