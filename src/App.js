import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Pressable, LogBox, StatusBar} from "react-native";
import store from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Provider, useSelector, useDispatch } from "react-redux";
import {PERMISSIONS, request} from "react-native-permissions";
import Geolocation from '@react-native-community/geolocation';
import './i18njs'
import {Image, Platform} from "react-native";
import {actionCoord, actionFilter} from "./redux/actionCreator";
import Profile from "./screens/Profile";
import Post from "./screens/Post";
import Map from "./screens/Map";
import { useTranslation } from "react-i18next";
import PostOverview from "./screens/PostOverview";
import Authorization from "./screens/Authorization";
import PostOnMap from "./screens/PostOnMap";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AllPost from "./screens/AllPost";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home({ navigation }){
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const filter = useSelector((state)=> state.filter);

    useEffect( () => {
        requestLocationPermission();
    }, []);

    useEffect(() => {
        setInterval(() => {
            requestLocationPermission();
        }, 30000);
    }, [])




    const requestLocationPermission = async()=>{
        if(Platform.OS==='ios'){
            let response = request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if(response==='granted')
                await Geolocation.getCurrentPosition(
                    position => {
                        dispatch(actionCoord([position.coords.latitude,position.coords.longitude]))
                    },
                    (error) => console.log(error.message)
                )
        }else{

            let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if(response==='granted')
                await Geolocation.getCurrentPosition(
                    position => {
                        dispatch(actionCoord([position.coords.latitude,position.coords.longitude]))
                    },
                    (error) => console.log(error.message)
                )
        }
    }


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#FFD369',
                tabBarInactiveTintColor: '#eee',
                tabBarActiveBackgroundColor: "#222831",
                tabBarInactiveBackgroundColor: "#222831",
                headerStyle:{backgroundColor: "#2d333e"}, headerTintColor: "#eee",
                tabBarIcon: ({ focused,color, size }) =>
                {
                  if (route.name === 'Post') {
                    return (
                      <MaterialIcons name="post-add" size={size} color={color}/>
                    );
                  }
                  else if (route.name === 'AllPosts') {
                    return (
                      <MaterialIcons name="list-alt" size={size} color={color}/>
                    );
                  }
                  else if (route.name === 'Map') {
                    return (
                      <FontAwesomeIcon name="map-marked-alt" size={size} color={color}/>
                    );
                  }
                }
            })}
        >
            <Tab.Screen
                name="Post"
                component={Post}
                options={{
                    title: t('interface:post'),
                    headerRight: () => (
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Pressable  name="search" size={28} color="black" style={{padding: 10}} onPress={() => navigation.navigate("Profile")}>
                                <FontAwesomeIcon name="user" size={25} color={"#eee"}/>
                            </Pressable>
                        </View>
                    )
                }}/>

            <Tab.Screen
                name="AllPosts"
                component={AllPost}
                options={{
                    title: t('interface:all_post'),
                    headerRight: () => (
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Pressable  name="search" size={28} color="black" style={{padding: 10}} onPress={() => navigation.navigate("Profile")}>
                                <FontAwesomeIcon name="user" size={25} color={"#eee"} style={{marginRight: "3%"}}/>
                            </Pressable>
                        </View>
                    )
                }}/>

            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    title: t('interface:map'),
                    headerShown: false,
                }}/>
        </Tab.Navigator>
    );
}

function App (){
    const {t} = useTranslation();

    //TODO:remove this statement later
    LogBox.ignoreAllLogs();


    return (
      <Provider store={store}>
        <StatusBar backgroundColor={"#2d333e"}/>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerStyle:{backgroundColor: "#2d333e"}, headerTintColor: "#eee"}}>
              <Stack.Screen name="Authorization" component={Authorization} options={{ title: t("authorization:auth") }}/>
              <Stack.Screen name="Home" component={Home} options={{headerShown: false,}} />
              <Stack.Screen name="Profile" component={Profile} options={{ title: t('interface:profile') }}/>
              <Stack.Screen name="PostOverview" component={PostOverview} options={{ title: t('interface:post_overview') }}/>
              <Stack.Screen name="PostOnMap" component={PostOnMap} options={{ title: t('interface:location') }}/>
              <Stack.Screen name="AllPost" component={AllPost} options={{ title: t('interface:all_post') }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
};

const styles = StyleSheet.create({
    icon: {
        aspectRatio: 1,
        width: 25,
        height: 25,
        alignSelf: 'flex-end'
    }
})


export default App;
