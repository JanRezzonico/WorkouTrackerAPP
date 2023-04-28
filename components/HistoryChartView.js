import { color } from '@rneui/themed/dist/config';
import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis, Tooltip } from 'react-native-responsive-linechart';
import colors from '../assets/style/colors';
//#region const
const normalMargin = Dimensions.get('window').height * 0.02;
const buttonWidth = Dimensions.get('window').width*0.5;
const chartHeight = Dimensions.get('window').height * 0.4;
const chartWidth = Dimensions.get('window').width;
const highlightColor = '#8c9596';
const fontColor = '#F9F9F9';
const blue = '#35A7FF';
const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
var chartLabels = days;
const data = [
    { x: 0, y: 15 },
    { x: 1, y: 7 },
    { x: 2, y: 6 },
    { x: 3, y: 3 },
    { x: 4, y: 5 },
    { x: 5, y: 8 },
    { x: 6, y: 12 },
    { x: 7, y: 14 },
    { x: 8, y: 12 },
    { x: 9, y: 13 },
    { x: 10, y: 18 },
];
const weeklyTime = [];
//#endregion const

function setXAxis(type){
    switch(type){
        case 'd':
            chartLabels = hours;
            console.log(chartLabels);
            break;
        case 'w':
            chartLabels = days;
            console.log(chartLabels);
            break;
        case 'm':
            break;
    }
}

function HistoryChartView(props){
    let maxDataX = Math.floor(Math.max(data[0].x,data[data.length-1].x));
    let maxDataY = Math.floor(Math.max(data[0].y,data[data.length-1].y));

    function getTicks(data, domain) {
        if(domain == 'x'){
            if (data.length != 23) {
                return data.length;
            }else{
                return 23;
            }
        }
    }

    return (
        <View style={styles.main}>
            <Chart
                style={styles.chart}
                data={data}
                padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                xDomain={{ min: 0, max: maxDataX }}
                yDomain={{ min: 0, max: maxDataY}}
                viewport={{ size: { width: 7, height: 10} }}
            >
                <VerticalAxis
                    tickCount={getTicks(data,'x')}
                    includeOriginTick={false}
                    theme={{
                        axis: { stroke: { color: 'white', width: 1 } },
                        ticks: { stroke: { color: highlightColor, width: 2 } },
                        labels: { 
                            visible: true, label: {fontSize: 15, fontWeight: 400, color: 'white'},
                            formatter: (v) => v.toFixed(0) 
                        },
                    }}
                />
                <HorizontalAxis
                    tickCount={7}
                    includeOriginTick={false}
                    theme={{
                        labels: { formatter: (v) => v.toFixed(2) },
                        axis: { stroke: { color: 'white', width: 1 } },
                        ticks: { stroke: { color: highlightColor, width: 2 } },
                        labels: {
                            visible: true, label: { fontSize: 15, fontWeight: 400, color: 'white'},
                            formatter: (v) => v.toFixed(0)
                        },
                    }}
                />
                <Line
                    hideTooltipAfter={1000}
                    tooltipComponent={
                        <Tooltip 
                            theme={{
                                label: { backgroundColor: 'white', fontSize: 15, fontWeight: 500,},
                                shape: {width:40,height:40,color:'black',rx:10}
                            }} 
                        />
                    }
                    theme={{ 
                        stroke: { color: '#2e42f8', width: 4 },
                        scatter: { default: { width: 8, height: 8, rx: 4, color: highlightColor }},
                    }} 
                    smoothing='none'
                />
                <Area 
                    theme={{
                        gradient: { from: { color: 'white', opacity: 0.4 },
                        to: { color: '#2e42f8', opacity: 0.5 }}
                    }}
                    smoothing='none' 
                />
            </Chart>
        </View>
      );
}
export default HistoryChartView;

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.MAIN,
        alignItems: 'center',
        paddingVertical: 10
    },
    appButtonContainer: {
        width: buttonWidth,
        elevation: 8,
        backgroundColor: '#2e42f8',
        borderRadius: 10,
        marginTop: normalMargin,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 10,
    },
    appButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    chart: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.MAIN,
        color: fontColor
    }
})