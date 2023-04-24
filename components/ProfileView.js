import { Text, View, StyleSheet, Image, Dimensions, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import BMIView from './BMI/BMIView';
import WTButton from './wt/WTButton';
import DB from '../api/api';
import UserInfoModal from './UserInfoModal';
import colors from '../assets/style/colors';
import { RFValue } from 'react-native-responsive-fontsize';

const normalMargin = Dimensions.get('window').height * 0.02;
const cardH = Dimensions.get('window').height * 0.37;
const cardW = Dimensions.get('window').width * 0.9;

const bigFont = RFValue(27);
const normalFont = RFValue(18);
const subTitleFont = RFValue(12);

function ProfileView(props) {
    const [user, setUser] = useState({});
    useEffect(() => {
        async function fetchData() {
            const data = await DB.user.get();
            setUser(data);
        }
        fetchData();
    }, []);
    const [modalVisible, setModalVisible] = useState(false);
    const [userInfoModalVisible, setUserInfoModalVisible] = useState(false);
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={require('../assets/blank-profile-picture.png')}  style={styles.profileImg} />
                        <Text style={styles.userName}>{user.username}</Text>
                    </View>
                    <View style={styles.contents}>
                        <TouchableOpacity onPress={() => { setUserInfoModalVisible(true) }}>
                            <Feather name="settings" style={styles.btnIcon} />
                        </TouchableOpacity>
                        <Modal
                            animationType='fade'
                            visible={userInfoModalVisible}
                            transparent={true}
                            onRequestClose={() => {
                                setUserInfoModalVisible(!userInfoModalVisible);
                            }}>
                            {/* Pop-up content*/}
                            <UserInfoModal user={user} setUser={setUser} />
                        </Modal>
                        <View style={styles.card}>
                            <Text style={styles.labelInfo} >Name</Text>
                            <Text style={styles.displayedInfo}>{user.first_name}</Text>
                            <Text style={styles.labelInfo}>Surname</Text>
                            <Text style={styles.displayedInfo}>{user.last_name}</Text>
                            <Text style={styles.labelInfo}>Birthday</Text>
                            <Text style={styles.displayedInfo}>{new Date(user.birthday).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.bottomCard}>
                            <View style={styles.info}>
                                <Text style={styles.labelInfo}>Height</Text>
                                <View style={styles.horizontalContainer}>
                                    <Text style={styles.displayedInfo}>{user.height}</Text>
                                    <Text style={styles.displayedInfo}> cm</Text>
                                </View>
                                <Text style={styles.labelInfo}>Weight</Text>
                                <View style={styles.horizontalContainer}>
                                    <Text style={styles.displayedInfo}>{user.weight}</Text>
                                    <Text style={styles.displayedInfo}> kg</Text>
                                </View>
                            </View>
                            {/* the component modal is used to show a pop-up when BMIButton is clicked*/}
                            <Modal
                                animationType='fade'
                                visible={modalVisible}
                                transparent={true}
                                onRequestClose={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                {/* Pop-up content*/}
                                <View style={styles.popUpCenter}>
                                    <View style={styles.popUp}>
                                        <BMIView weight={user.weight} height={user.height} />
                                        {/* Close pop-up button */}
                                        <WTButton onPress={() => { setModalVisible(!modalVisible); }} text={"Close"}></WTButton>
                                    </View>
                                </View>
                            </Modal>
                            {/* Open BMI pop-up button */}
                            <WTButton onPress={() => { setModalVisible(true); }} text={"BMI"} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfileView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        flex: 0.35,
        backgroundColor: colors.MAIN,
    },
    mainContainer: {
        backgroundColor: colors.MAIN,
    },
    contents: {
        flex: 0.65,
    },
    profileImg: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.3,
        marginTop: StatusBar.currentHeight,
        alignSelf: 'center',
        //borderWidth: 3,
        //borderColor: '#2e42f8'
    },
    userName: {
        color: 'white',
        alignSelf: 'center',
        fontSize: bigFont,
        marginTop: normalMargin,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    card: {
        width: cardW,
        height: cardH,
        borderRadius: 10,
        backgroundColor: colors.MAIN,
        backfaceVisibility: 'hidden',
        alignSelf: 'center',
        marginTop: normalMargin,
        paddingTop: 25,
        paddingLeft: 20,
        borderColor: '#8c9596',
        borderWidth: 1,
    },
    bottomCard: {
        width: cardW,
        height: cardH,
        borderRadius: 10,
        backgroundColor: colors.MAIN,
        backfaceVisibility: 'hidden',
        alignSelf: 'center',
        marginTop: normalMargin,
        paddingTop: 25,
        borderColor: '#8c9596',
        borderWidth: 1,
        marginBottom: StatusBar.currentHeight,
    },
    info: {
        paddingLeft: 20,
    },
    labelInfo: {
        fontSize: subTitleFont,
        color: 'white',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    displayedInfo: {
        fontSize: normalFont,
        color: '#dddddd',
        marginBottom: 10,
        fontWeight: 'thin'
    },
    appButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
    popUp: {
        backgroundColor: colors.MAIN,
        borderRadius: 10,
        padding: 10,
        height: Dimensions.get('window').height / 2,
        width: Dimensions.get('window').width * 0.75,
        elevation: 20,
        shadowColor: 'black',
    },
    popUpCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginTop: Dimensions.get('window').height / 4,
    },
    popUpButton: {
        backgroundColor: "#2e42f8",
        elevation: 8,
        borderRadius: 10,
        marginTop: normalMargin,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 10,
        marginBottom: normalMargin
    },
    btnIcon: {
        marginRight: (Dimensions.get('window').width - cardW) / 2,
        fontSize: 20,
        color: 'white',
        alignSelf: 'flex-end'
    },
    horizontalContainer: {
        flexDirection: "row",
    },
});
