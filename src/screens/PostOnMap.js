import React, { useState} from "react";
import {View, StyleSheet, Image, Dimensions, Text} from "react-native";
import {useTranslation} from "react-i18next";
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch, useSelector} from "react-redux";
import {actionPostCoord} from "../redux/actionCreator";
import mapStyle from "./../components/mapStyle.json";


function PostOnMap({navigation}){
    const {t} = useTranslation();
    const coord = useSelector((state)=> state.coord);
    const postCoord = useSelector((state)=> state.postCoord);
    const [state, setState] = useState({
        initialPosition: {
            latitude: coord[0],
            longitude: coord[1],
            latitudeDelta: 0.09,
            longitudeDelta: 0.09,
        }})
    const dispatch = useDispatch();


    return(
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                mapType={'standard'}
                customMapStyle={mapStyle}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={true}
                onPress={(c)=> {
                    dispatch(actionPostCoord([c.nativeEvent.coordinate.latitude, c.nativeEvent.coordinate.longitude]))
                    // navigation.navigate('Home');
                }}
                showsScale={true}
                initialRegion={state.initialPosition}
            >
                <Marker
                    coordinate={{latitude: postCoord ? postCoord[0] : coord[0], longitude: postCoord ? postCoord[1] : coord[1]}}
                    image={require('./../assets/icons/img/marker.png')}

                >
                    <Callout>
                        <Text>{'Your post location'}</Text>
                    </Callout>
                </Marker>
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});

export default PostOnMap;
