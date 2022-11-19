import React, {useEffect, useState} from "react";

import {Text, View, StyleSheet, Image, Button, TouchableOpacity, Alert, ScrollView, Pressable} from "react-native";

import {useTranslation} from "react-i18next";
import RBSheet from "react-native-raw-bottom-sheet";

function PostOverview({route}){
    const item = route.params.item;
    const {t} = useTranslation();
    const [sheet, setSheet] = useState(null)
    const message = 'Thank you for your compliment.\nAs soon as this post will be reviewed, you\'ll be notified  by email.';
    return(
        <View style={styles.container}>
            <ScrollView>
            <RBSheet
                ref={ref => {
                    setSheet(ref);
                }}
                height={300}
                openDuration={250}
                customStyles={{
                    container: {
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#2d333e"
                    }
                }}
            >
                <ScrollView>
                    <Text style={{color: '#eee', alignSelf: 'center', fontSize: 18, margin: 10}}>{t("post_overview:choose")}</Text>
                    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#FFD369' : '#eee' }, styles.panelButton ]} onPress={() => { Alert.alert('Complain',message); sheet.close()}}>
                        <Text style={{color: '#222831', alignSelf: 'center', fontSize: 16}}>{t("post_overview:spam")}</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#FFD369' : '#eee' }, styles.panelButton ]} onPress={() => { Alert.alert('Complain',message); sheet.close()}}>
                        <Text style={{color: '#222831', alignSelf: 'center', fontSize: 16}}>{t("post_overview:aggressive")}</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#FFD369' : '#eee' }, styles.panelButton ]} onPress={() => { Alert.alert('Complain',message); sheet.close()}}>
                        <Text style={{color: '#222831', alignSelf: 'center', fontSize: 16}}>{t("post_overview:sexual")}</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#FFD369' : '#eee' }, styles.panelButton ]} onPress={() => { Alert.alert('Complain',message); sheet.close()}}>
                        <Text style={{color: '#222831', alignSelf: 'center', fontSize: 16}}>{t("post_overview:violation")}</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#FFD369' : '#eee' }, styles.panelButton ]} onPress={() => { Alert.alert('Complain',message); sheet.close()}}>
                        <Text style={{color: '#222831', alignSelf: 'center', fontSize: 16}}>{t("post_overview:hateful")}</Text>
                    </Pressable>
                </ScrollView>
            </RBSheet>
            <Image style={styles.image} source={{uri: `${item.photoURL}`}}/>
            <Text style={styles.header}>{item.title}</Text>
            <Text style={styles.text}>{item.context}</Text>
            <View style={{flexDirection: "row", marginRight: 59}}>
                <View style={{width: "35%"}}>
                    <Text style={styles.extraHeader}>{t('post_overview:category')}:</Text>
                </View>
                <Text style={styles.extraInfo}> {item.organization}</Text>
            </View>
            <View style={{flexDirection: "row", marginRight: 59}}>
                <View style={{width: "35%"}}>
                    <Text style={styles.extraHeader}>{t('post_overview:author')}:</Text>
                </View>
                <Text style={styles.extraInfo}> {item.name}</Text>
            </View>
            <View style={{flexDirection: "row", marginRight: 59}}>
                <View style={{width: "35%"}}>
                    <Text style={styles.extraHeader}>{t('post_overview:date')}:</Text>
                </View>
                <Text style={styles.extraInfo}> {item.createdAt.substr(0,10)}</Text>
            </View>

            <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#FFD369' : '#eee' }, styles.sendButton ]} onPress={() => sheet.open()}>
                <Text style={{color: '#222831', alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>{t("post_overview:send_comp")}</Text>
            </Pressable>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831',
        paddingBottom:20
        // justifyContent: 'center',
    }, image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#eee"
    }, header: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 32,
        padding: 15,
        color: '#eee'
    }, text: {
        fontSize: 22,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#eee'
    }, extraInfo: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
        color: '#eee'
    },
    extraHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        color: '#ffd369'
    },
    sendButton: {
        padding: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width:"50%",
        borderRadius: 10,
        marginTop: "5%"
    },
    panelButton: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width: "80%",
        marginTop: "5%",
    }
});

export default PostOverview;
