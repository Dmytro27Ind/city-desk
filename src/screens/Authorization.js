import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, Pressable, Image, Dimensions} from "react-native";
import {useDispatch} from "react-redux";
import Loading from "../components/Loading";
import {actionAuth, actionUserId} from "../redux/actionCreator";
import {google} from "../assets/icons";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

import {logo} from './../assets/logo'
import {useTranslation} from "react-i18next";

const WEB_CLIENT_ID = '112151857904-5carn3lk9vms7mb2cdaqa7rbpjehl68r.apps.googleusercontent.com';
const SERVER= 'https://hackathon-citydesk.herokuapp.com/';


GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
});


function Authorization({navigation}) {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const dispatch = useDispatch();
    const {t} = useTranslation();

    useEffect(() => onAuthStateChanged(async user => {
        setInitializing(true);
        let response = await authUser(user);


        // console.log('useEffect', response.status, response.id)
        if( !user || response.status === 200) {
            dispatch(actionAuth(user));
            dispatch(actionUserId(response ? response.id : null));
            setUser(user);
            if (initializing) setInitializing(false);
        }
    }), []);

    function onAuthStateChanged(action) {
        auth().onAuthStateChanged(action);
    }


    async function authUser(user) {
        console.log('authUser')

        if(!user) {
            console.log('cant get user')
            return null;
        }

        const requestOptions = {
            method: 'POST',

            headers: { 'Content-Type': 'application/json', apiaccsesskey: "QPOM48rfg873cdsTCY78as7xg" },
            body: JSON.stringify({
                id: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,

            })
        };
        console.log('data', requestOptions)
        let response = await fetch(`${SERVER}signIn`, requestOptions);
        console.log('response:', response.status);
        let r = await response.json()

        console.log('response:', response ,r);
        return {status: response.status, id: r.id};

    }

    async function logIn() {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    }

    if (initializing) return <Loading/>;

    if (user) {
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>

            <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#FFD369' : '#eee' }, styles.logIn ]} onPress={logIn}>
                <Text style={styles.logInText}>{t("authorization:login")}</Text>
                <Image source={google} style={styles.googleIcon}/>
            </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222831"
    },
    heading: {
        fontSize: 32,
        color: "#000",
        marginBottom: 40
    },
    logIn: {
        flexDirection: "row",
        width: "50%",
        elevation: 8,
        marginBottom: "10%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        bottom: 0,
        position: 'absolute',
    },
    logInText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: "2%",
        color: '#222831',
    },
    googleIcon: {
        width: 40,
        height: 40,
        alignSelf: "center",
        marginLeft: "10%"
    },logo: {
        width: 400,
        height: 400,
        marginBottom: "35%"
    }
});

export default Authorization;