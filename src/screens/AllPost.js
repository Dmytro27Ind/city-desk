import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity, Button, Image, ScrollView} from "react-native";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import PostOverview from "./PostOverview";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";


function AllPost({navigation}){
    const [data, setData] = useState(null);
    const filter = useSelector((state)=> state.filter);

    useEffect( () => {
        updateData();
    }, []);

    useEffect(() => {
        setInterval(() => {
            updateData();
        }, 5000);
    }, [])

    async function updateData() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                apiaccsesskey: "QPOM48rfg873cdsTCY78as7xg"
            }
        }
        const GET_UNSLOVED_PROBLEMS = 'https://hackathon-citydesk.herokuapp.com/';
        let list = null;
        try {
            const response = await fetch(filter == 'unsolved' ? GET_UNSLOVED_PROBLEMS+'getAllUnsolvedProblems' : GET_UNSLOVED_PROBLEMS + 'getAllSolvedProblems', requestOptions);
            if(response.status === 200 ) {
                list = await response.json();
                list.map(async (item, index) =>{
                    const user_response = await fetch(`https://hackathon-citydesk.herokuapp.com/getUser/${item.authorID}`, requestOptions);
                    const org_response = await fetch(`https://hackathon-citydesk.herokuapp.com/getOrganization/${item.responsibleOrganizations[0]}`, requestOptions);
                    if(user_response.status === 200 && org_response.status == 200) {
                        let user = await user_response.json();
                        let org = await org_response.json();
                        list[index].name = user.name
                        list[index].organization = org.name
                    }else{
                        list[index].name = '';
                    }
                })

            }else
                list = [];
        } catch (error) {
            console.log(error.message);
        }
        setData({markers: [], list: list})

    }
    if(data==null)
        return <View/>

    function posts(){
        let posts = []
        for(let i=0; i<data.list.length; i++){
            posts.push(
                <Pressable key={`key_${data.list[i]._id}`} onPress={() => navigation.navigate('PostOverview', {item: data.list[i]})}>
                    <View style={styles.container}>
                        <Text style={styles.header}>{data.list[i].title}</Text>
                        <Image style={styles.image} source={{uri: `${data.list[i].photoURL}`}}/>
                        <Text style={styles.text}>{data.list[i].context}</Text>
                        <Text style={styles.extraInfo}>{data.list[i].createdAt.substr(0,10)}</Text>
                    </View>
                </Pressable>
            )
        }
        return (
            posts
        )
    }
    return(
        <ScrollView>
            {posts()}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        borderWidth: 0.2,
        backgroundColor: "#222831"
    },
    image: {
        width: '100%',
        height: 300,
        borderColor: '#eee',
        borderWidth: 0.5,
        borderRadius: 10
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        padding: 12,
        marginLeft: "3%",
        color: '#eee'
    },
    text: {
        fontSize: 18,
        padding: 8,
        color: '#eee'
    },
    extraInfo: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingLeft: 8,
        paddingBottom: 18,
        color: '#FFD369'
    }
});

export default AllPost;
