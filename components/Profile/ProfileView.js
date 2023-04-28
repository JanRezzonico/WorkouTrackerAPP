import { Text, View, StyleSheet, Image, Dimensions, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import DB from '../../api/api';
import colors from '../../assets/style/colors';
import WTIconButton from './../wt/WTIconButton';
import DataShow from './DataShow';
import DataEdit from './DataEdit';

const normalMargin = Dimensions.get('window').height * 0.02;
const cardH = Dimensions.get('window').height * 0.37;
const cardW = Dimensions.get('window').width * 0.9;

const bigFont = RFValue(27);
const normalFont = RFValue(18);
const subTitleFont = RFValue(12);

function ProfileView(props) {
    const [user, setUser] = useState({});
    const [edit, setEdit] = useState(false);
    const toggleEdit = () => {
        setEdit(!edit);
    }
    useEffect(() => {
        async function fetchData() {
            const data = await DB.user.get();
            setUser(data);
        }
        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <View>
                    <View style={styles.header}>
                        <Image source={user.imagePath ? { uri: user.imagePath } : require('../../assets/blank-profile-picture.png')} style={styles.profileImg} />
                        <Text style={styles.userName}>{user.username}</Text>
                    </View>
                    <View style={styles.contents}>
                        <View style={styles.btnIcon}>
                            {
                                !edit && <WTIconButton library='Feather' name="edit" onPress={toggleEdit} />
                            }
                        </View>
                        {
                            edit ? <DataEdit user={user} setUser={setUser} toggleEdit={toggleEdit} /> : <DataShow user={user} />
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfileView;

const styles = StyleSheet.create({
    header: {
        flex: 0.35,
        backgroundColor: colors.MAIN,
    },
    mainContainer: {
        backgroundColor: colors.MAIN,
        flex: 1,
        justifyContent: 'space-between',
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
    btnIcon: {
        marginRight: (Dimensions.get('window').width - cardW) / 2,
        fontSize: 20,
        color: 'white',
        alignSelf: 'flex-end'
    }
});
