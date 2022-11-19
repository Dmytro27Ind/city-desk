import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert, AppRegistry, ScrollView, Pressable,
} from "react-native";
import {useTranslation} from "react-i18next";
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from "@react-native-picker/picker";
import {useSelector} from "react-redux";
import storage from "@react-native-firebase/storage";




function Post({navigation}){
    const {t} = useTranslation()

    const [image, setImage] = useState(null);
    const [bs, setBs] = useState(React.createRef())
    const fall = new Animated.Value(1);
    const [responsible, setResponsible] = useState('')
    const userId = useSelector((state)=> state.userId);
    const coord = useSelector((state)=> state.coord);
    const postCoord = useSelector((state)=> state.postCoord);
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const [titleRef, setTitleRef] = useState(null);
    const [contextRef, setContextRef] = useState(null);


    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            // compressImageMaxWidth: 800,
            // compressImageMaxHeight: 800,
            cropping: true,

        }).then(image => {
            console.log(image);
            setImage(image.path);
            //hide the bar after choosing a photo
            bs.current.snapTo(1);
        }).catch(error => {
            switch (error){
                case "CAMERA_UNAVAILABLE":
                    Alert.alert(t('post:no_camera'),t('post:no_camera_description'));
                    break;
                case "OTHERS": case "PERMISSION": default:
                    Alert.alert(t('post:camera_error'),t('post:camera_error_description'));
            }
        });
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            // width: 800,
            // height: 800,
            cropping: true,
        }).then(image => {
            console.log(image);
            setImage(image.path);
            //hide the bar after choosing a photo
            bs.current.snapTo(1);
        });
    }

    const renderInner = () => (
        <View style={styles.panel}>

            <View style={{alignItems: 'center'}}>
                <Text style={styles.panelTitle}>{t('post:add_photo')}</Text>
                <Text style={styles.panelSubtitle}>{t('post:upload_problem_photo')}</Text>
            </View>

            <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#FFD369' : '#eee' }, styles.panelButton ]} onPress={takePhotoFromCamera}>
                <Text style={styles.panelButtonTitle}>{t('post:take_photo')}</Text>
            </Pressable>

            <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#FFD369' : '#eee' }, styles.panelButton ]} onPress={choosePhotoFromLibrary}>
                <Text style={styles.panelButtonTitle}>{t('post:choose_from_library')}</Text>
            </Pressable>

            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? '#FFD369' : '#eee' }, styles.panelButton ]}
                onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>{t('post:cancel_photo')}</Text>
            </Pressable>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>

        </View>
    );

    async function loadPhoto(imagePath) {
        let fileName = imagePath.substring(imagePath.lastIndexOf("/") + 1);
        // await auth().signInAnonymously();
        await storage().ref(fileName).putFile(imagePath);
        return storage().ref(fileName).getDownloadURL();
    }



    console.log(postCoord)
    console.log(coord)

    async function post() {
        const SERVER = 'https://hackathon-citydesk.herokuapp.com/'

        try {
            if(title == '' || context== '') {
                Alert.alert('Warning','Please choose fill the form')
                return;
            }
            if(responsible == '') {
                Alert.alert('Warning','Please choose the responsible organization')
                return;
            }
            if(image == null) {
                Alert.alert('Warning','Please choose an image')
                return;
            }
            if(context == '') {
                Alert.alert('Warning','Please fill the title')
                return;
            }
            let postImageUrl = await loadPhoto(image)
            let location = postCoord == null ? coord : postCoord;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', apiaccsesskey: "QPOM48rfg873cdsTCY78as7xg" },
                body: JSON.stringify({
                    title: title,
                    context: context,
                    authorId: userId,
                    photoURL: postImageUrl,
                    latitude: location[0],
                    longitude: location[1],
                    responsibleOrganizations: [responsible]

                })
            };
            setTitle('');
            setContext('');
            setResponsible('');
            setImage(null);
            if(titleRef)
                titleRef.clear();
            if(contextRef)
                contextRef.clear();
            console.log('data', requestOptions)
            let response = await fetch(`${SERVER}addProblem`, requestOptions);
            if(response.status != 200) {
                Alert.alert('Ups',`Server error ${response.status}\n Try again later`);
                return;
            // }else if(response.status != 402){
            //     Alert.alert('Ups',`Your account is banned, you can\'t send ant posts`);
            //     return;
            }else{
                Alert.alert('Success',`Post was successfully added`);
            }


        }catch (e){
            console.log(e.message())
        }
    }

    return(
        <View >
            <View style={styles.container}>
                <ScrollView>
                    <TextInput
                        ref={input => { setTitleRef(input)  }}
                        onChangeText={text => setTitle(text) }
                        placeholder={t('post:topic')}
                        multiline={true}
                        maxLength={35}
                        style={styles.topicInput}
                        placeholderTextColor={"#a7a7a7"}
                    >
                    </TextInput>
                    <TextInput
                        ref={input => { setContextRef(input)  }}
                        placeholder={t('post:description')}
                        multiline={true}
                        onChangeText={text => setContext(text)}
                        numberOfLines={10}
                        maxLength={500}
                        style={styles.descriptionInput}
                        placeholderTextColor={"#a7a7a7"}
                    >
                    </TextInput>

                    <Picker
                        style={{ width: "100%", color: "#eee" }}
                        dropdownIconColor={"#eee"}
                        selectedValue={responsible}
                        onValueChange={(val) => {
                            setResponsible(val)

                        }}
                    >
                        <Picker.Item style={{color:"#eee", backgroundColor: "#222831"}} value='' label={`${t('post:choose_responsible')}`} />
                        <Picker.Item style={{color:"#eee", backgroundColor: "#222831"}} label={t('post:zelene')} value="61a691bb995723164217eedd" />
                        <Picker.Item style={{color:"#eee", backgroundColor: "#222831"}} label={t("post:dopravny_podnik")} value="61a6927d35a0b6cb15e4cf80" />
                        <Picker.Item style={{color:"#eee", backgroundColor: "#222831"}} label={t("post:lesy")} value="61a6927d35a0b6cb15e4cf7f" />
                        <Picker.Item style={{color:"#eee", backgroundColor: "#222831"}} label={t("post:spp")} value="61a6927d35a0b6cb15e4cf82" />
                        <Picker.Item style={{color:"#eee", backgroundColor: "#222831"}} label={t("post:vodarenska")} value="61a6927d35a0b6cb15e4cf81" />
                        <Picker.Item style={{color:"#eee", backgroundColor: "#222831"}} label={t("post:dontknow")} value="61a762fa518121cf0cb8f921" />
                    </Picker>

                    <Pressable onPress={() => bs.current.snapTo(0)}>
                        {({pressed}) => (
                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                <Icon name="image" size={30} color={pressed? "#FFD369": "#eee"} />
                                <Text style={{fontSize: 18, color: pressed? "#FFD369": "#eee",  padding: 5}}>{image==null ? t('post:att_image') : 'Attached image'} </Text>
                            </View>
                        )}
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('PostOnMap')}>
                        {({pressed}) => (
                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                <Icon name="location" size={30} color={pressed? "#FFD369": "#eee"} />
                                <Text style={{fontSize: 18, color: pressed? "#FFD369": "#eee", padding: 5}}>{postCoord!=null ? "Location added" : "Current Location"} </Text>
                            </View>
                        )}
                    </Pressable>

                    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#FFD369' : '#eee' }, styles.postButton ]} onPress={() => post()}>
                        <Text style={styles.panelButtonTitle}>{t("post:post")}</Text>
                    </Pressable>
                </ScrollView>

            </View>
            <BottomSheet
                ref={bs}
                snapPoints={[330, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection:"column",
        backgroundColor: '#222831',
        // alignItems: 'center',
        // justifyContent: 'center',
        width:'100%',
        height:'100%',
        padding:15
    },
    post:{
        width:'80%',
        height:'90%',
    },
    topicInput:{
        // height: 50,
        borderBottomWidth:2,
        borderBottomColor: '#FFD369',
        fontSize:25,
        color:'#eee',
        fontWeight:'bold'
    },
    descriptionInput:{
        fontSize:18,
        height: "30%",
        borderBottomWidth: 2,
        borderBottomColor: '#FFD369',
        fontWeight:'normal',
        color:'#eee',
        marginVertical:10
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#2d333e',
        paddingTop: 20,
    },
    header: {
        backgroundColor: '#2d333e',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
        color: "#eee"
    },
    panelSubtitle: {
        fontSize: 14,
        color: '#a9a9a9',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width: "80%",
        marginTop: "5%",
    },
    postButton: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width: "50%",
        marginTop: "5%",
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#222831',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },

});

export default Post;
AppRegistry.registerComponent('AutogrowTextinput', () => Post);
