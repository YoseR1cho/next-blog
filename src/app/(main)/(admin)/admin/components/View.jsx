import React ,{useRef}from 'react';
import styles from '../page.module.scss'
import * as echarts from 'echarts';
import {useEffect} from "react";

const View = () => {
    const chartRef = useRef();
    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);

        let options  = {
            title:{
                text:'一周访客量',
                left:'38%'
            },
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line',
                    label:{
                        show:true,
                        position:'bottom',
                        textStyle:{
                            fontSize:16
                        }
                    }
                }
            ]
        };

        options && myChart.setOption(options);
    }, []);
    return (
        <div className={styles.chartContainer}>
            <div ref={chartRef} className={styles.chart}></div>
        </div>
    );
};

export default View;
