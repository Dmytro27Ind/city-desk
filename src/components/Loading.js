import React from "react";
import {View, ActivityIndicator, StyleSheet} from "react-native";

function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#4499ff"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Loading;