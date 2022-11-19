import React from "react";
import {Text, View, StyleSheet, Pressable, Image} from "react-native";
import i18n from "i18next";
import {Picker} from '@react-native-picker/picker';
import { useTranslation } from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
import {actionLanguage} from "../redux/actionCreator";
import auth from "@react-native-firebase/auth";
import {GoogleSignin} from "@react-native-google-signin/google-signin";

function Profile({navigation}){
    const {t} = useTranslation();
    const lang = useSelector((state)=> state.language);
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.auth.user);
    const userId = useSelector((state)=> state.userId);

    function logOut() {
        auth().signOut().then(r => r)
        GoogleSignin.revokeAccess();
        navigation.navigate('Authorization')
    }

    return(
        <View style={styles.container}>

            <Image source={{uri: `${user ? user.photoURL : ''}`}} style={styles.avatar}/>
            <Text style={{fontSize: 32, marginTop: 25, color:"#eee"}}>{ user ? user.displayName : '' }</Text>
            <Text style={{fontSize: 22, margin: 25, marginBottom: 50, color:"#eee"}}>{ user ? user.email : '' }</Text>

            <Text style={{fontSize: 22, color:"#eee"}}>{t('profile:lang')}:</Text>
            <Picker
                style={{ width: "100%", color: "#eee" }}
                dropdownIconColor={"#eee"}
                selectedValue={lang}
                onValueChange={(val) => {
                    dispatch(actionLanguage(val))
                    i18n.changeLanguage(val).then(r => console.log(r));;
                }}
            >
                <Picker.Item style={{color:"#eee", backgroundColor: "#222831"}} label={t('profile:en')} value="en" />
                <Picker.Item style={{color:"#eee", backgroundColor: "#222831"}} label={t('profile:sk')} value="sk" />
                <Picker.Item style={{color:"#eee", backgroundColor: "#222831"}} label={t('profile:uk')} value="uk" />
            </Picker>

            <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#FFD369' : '#eee' }, styles.logIn ]} onPress={logOut}>
                <Text style={styles.logOutText}>{t('profile:log_out')}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831',
        alignItems: 'center',

    },
    logIn: {
        flexDirection: "row",
        width: "45%",
        elevation: 8,
        padding: 12,
        marginBottom: 35,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        bottom: 0,
        position: 'absolute',
    }, avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: "8%",
        borderWidth: 1,
        borderColor: "#eee"

    },
    logOutText:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#222831',
    }

});

export default Profile;
