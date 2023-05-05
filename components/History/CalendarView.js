import { Text, View, StyleSheet, Image, Dimensions, SafeAreaView, ScrollView, StatusBar, Button, Alert, TouchableOpacity,Modal} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import colors from "../../assets/style/colors";

LocaleConfig.locales['en'] = {
  monthNames: [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER'
  ],
  monthNamesShort: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
  today: "Today",
};
LocaleConfig.defaultLocale = 'en';

const highlightColor = '#8c9596';
const fontColor = '#F9F9F9';
const blue = '#35A7FF'

function CalendarView({sessions, setSessions}) {
    return (
        <View>
            {/*
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => props.navigation.navigate("HistoryView")} style={styles.btnContain}>
                    <Icon name="arrow-back" style={styles.btnIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Calendar</Text>
            </View>
            */}
            <View style={styles.calendar}>
                <CalendarList
                    // Callback which gets executed when visible months change in scroll view. Default = undefined
                    onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={50}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={120}
                    // Enable or disable scrolling of calendar list
                    scrollEnabled={true}
                    // Enable or disable vertical scroll indicator. Default = false
                    showScrollIndicator={false}

                    //displayLoadingIndicator={true}

                    //---------------CalendarParams
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={day => {
                        console.log('selected day', day);
                    }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={day => {
                        console.log('long pressed day', day);
                    }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'MMMM yyyy'}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                    firstDay={1}
                    // Hide day names. Default = false
                    hideDayNames={false}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={false}
                    // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                    disableAllTouchEventsForDisabledDays={true}
                    // Specify theme properties to override specific styles for calendar parts. Default = {}
                    theme={{
                        backgroundColor: colors.MAIN,
                        calendarBackground: colors.MAIN,
                        textSectionTitleColor: fontColor,
                        textSectionTitleDisabledColor: '#d9e1e8',
                        selectedDayBackgroundColor: blue,
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: blue,
                        dayTextColor: highlightColor,
                        textDisabledColor: highlightColor,
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        monthTextColor: fontColor,
                        indicatorColor: fontColor,
                        textDayFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: 'bold',
                        textDayFontSize: 16,
                        textMonthFontSize: 18,
                        textDayHeaderFontSize: 15,
                        'stylesheet.calendar.header': {
                            dayTextAtIndex5: {
                              color: 'orange'
                            },
                            dayTextAtIndex6: {
                                color: 'orange'
                              }
                        },
                        marginBottom: StatusBar.currentHeight,
                    }}
                    markingType={'period'}
                    markedDates={{
                        //'{date}': {marked: true, dotColor: '{color based on number of templates}', marked with dot
                        /*highlight period of time, can also mark with dot
                        '2023-05-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
                        '2023-05-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
                        '2023-05-25': {endingDay: true, color: '#50cebb', textColor: 'white'}
                        */
                        
                    }}
                    
                />
            </View>
        </View>
    );
}

export default CalendarView;

const styles = StyleSheet.create({
    btnContain: {
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    btnIcon: {
        marginLeft: 10,
        fontSize: 20,
        color: fontColor,
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        backgroundColor: colors.MAIN,
        padding: 5,
        marginTop: 0,
        shadowColor: 'black',
        elevation: 20,
    },
    title: {
        flex: 1,
        fontSize: 15,
        marginLeft: 25,
        marginTop: 4,
        fontWeight: 'bold',
        color: fontColor,
    },
    calendar: {
        backgroundColor: 'black'
    },
});