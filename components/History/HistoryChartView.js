import { color } from '@rneui/themed/dist/config';
import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis, Tooltip } from 'react-native-responsive-linechart';
import colors from '../../assets/style/colors';
import { chartData } from './Model';
//#region const
const normalMargin = Dimensions.get('window').height * 0.02;
const buttonWidth = Dimensions.get('window').width * 0.5;
const chartHeight = Dimensions.get('window').height * 0.4;
const chartWidth = Dimensions.get('window').width;
const highlightColor = '#8c9596';
const fontColor = '#F9F9F9';
const blue = '#35A7FF';
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({length: 23}, (_,i) => i +1);
var chartLabels = days;
const data = chartData();
const weeklyTime = [];
//#endregion const

function setXAxis(type) {
    switch (type) {
        case 'd':
            chartLabels = hours;
            break;
        case 'w':
            chartLabels = days;
            break;
        case 'm':
            break;
    }
}

function HistoryChartView({sessions, setSessions}) {
    let maxDataX = Math.floor(Math.max(data[0].x, data[data.length - 1].x));
    let maxDataY = Math.floor(Math.max(data[0].y, data[data.length - 1].y));

    function getTicks(data, domain) {
        if (domain == 'x') {
            if (data.length != 23) {
                return data.length;
            } else {
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
                yDomain={{ min: 0, max: maxDataY }}
                viewport={{ size: { width: 7, height: 10 } }}
            >
                <VerticalAxis
                    tickCount={getTicks(data, 'x')}
                    includeOriginTick={false}
                    theme={{
                        axis: { stroke: { color: 'white', width: 1 } },
                        ticks: { stroke: { color: highlightColor, width: 2 } },
                        labels: {
                            visible: true, label: { fontSize: 15, fontWeight: 400, color: 'white' },
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
                            visible: true, label: { fontSize: 15, fontWeight: 400, color: 'white' },
                            formatter: (v) => v.toFixed(0)
                        },
                    }}
                />
                <Area
                    theme={{
                        gradient: {
                            from: { color: 'white', opacity: 0.4 },
                            to: { color: '#2e42f8', opacity: 0.5 }
                        }
                    }}
                    smoothing='none'
                />
                <Line
                    hideTooltipAfter={1000}
                    theme={{
                        stroke: { color: '#2e42f8', width: 4 },
                        scatter: { default: { width: 8, height: 8, rx: 4, color: highlightColor } },
                    }}
                    tooltipComponent={
                        <Tooltip
                            theme={{
                                label: { backgroundColor: 'white', fontSize: 15, fontWeight: 500, },
                                shape: { width: 40, height: 40, color: '#2e42f8', rx: 10 }
                            }}
                        />
                    }
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