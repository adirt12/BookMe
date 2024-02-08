import { Alert, Pressable, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation, useLocalSearchParams } from 'expo-router';
import { TextInput } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import axios from "axios";

const experimentsEmc = () => {
    const router = useRouter();
    const [NewTypeEx, setNewTypeEx] = useState(false)
    const [NameTypeEx, setNameTypeEx] = useState("")
    const [ExArray, setExArray] = useState([])
    const ipAddress = Constants.expoConfig.hostUri.split(':')[0];
    const [change, setChange] = useState(0)
    const [refresh, setRefresh] = useState(0)
    const [ButtonSetting, setButtonSetting] = useState(false)
    const [presentButton,setPresentButton]=useState("")
    const { username } = useLocalSearchParams()
    const { email } = useLocalSearchParams()
    const {title} = useLocalSearchParams()

    useEffect(() => {
        const collectionName = {
            title:title,
        }
        axios
            .post("http://" + ipAddress + ":8000/getExData",collectionName)
            .then((response) => {
                setExArray(response.data)
            })
    }, [refresh])


    const hendelSave = async () => {
        console.log(NameTypeEx)
        setNewTypeEx(!NewTypeEx)
        // setRefresh(refresh + 1)
        const ipAddress = Constants.expoConfig.hostUri.split(':')[0];
        const ExData = {
            title:title,
            NameTypeEx: NameTypeEx
        }
        axios
            .post("http://" + ipAddress + ":8000/addExType", ExData)
            .then((response) => {
                console.log(response.data)
                setRefresh(refresh + 1)
                Alert.alert(
                    response.data.message,
                );
                setNameTypeEx("");
            })
    }

    const hendelClick= (item) =>{
        setPresentButton(item.Name)
        setButtonSetting(!ButtonSetting)
    };

    const handelDelete=(item)=>{
        const data={
            _id: item._id,
            Name: item.Name
        }
        axios.delete("http://" + ipAddress + ":8000/deleteItem",{data}).then((response)=>{
            setRefresh(refresh + 1)
        })
    }

    const oneExType = ({ item }) => (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.itemContainer} onPress={() => router.push({ pathname: "bookingPage" , params: { username: username, email: email,exName:item.Name , title:title,page:"experimentsEmc"} })} onLongPress={() => hendelClick(item)} >
                <Text style={styles.itemText}>{item.Name}</Text>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                    <Image source={require('../../assets/emc.png')} style={{ width: 40, height: 40 }} />
                </View>
                {presentButton===item.Name && ButtonSetting && (
                    <View >
                        <View style={{padding:5}}>   
                            <Pressable style={{ borderRadius: 7, backgroundColor: 'red', padding: 5 }} onPress={()=>handelDelete(item)}>
                                <Text style={{ fontSize: 20 }}>Delete</Text>
                            </Pressable>
                        </View>
                        <View style={{padding:5}}>
                            <Pressable style={{ borderRadius: 7, backgroundColor: 'gray', padding: 5 }} onPress={() => alert("setting feture in progress...")}>
                                <Text style={{ fontSize: 20 }}>setting</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )

    

    return (
        <View style={{ flex: 1 }}>
            {NewTypeEx && (
                <View style={{ backgroundColor: 'white', height: "80%", width: "100%", padding: 16, borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
                    <TextInput value={NameTypeEx} placeholder='Enter new EX type' style={{ height: "10%", width: "90%", borderWidth: 2, borderColor: 'black', borderRadius: 10, marginBottom: 10, alignSelf: 'center' }}
                        onChangeText={setNameTypeEx}
                    />
                    <Pressable style={{ height: "8%", width: "50%", borderRadius: 10, alignSelf: 'center', justifyContent: 'center' }} onPress={hendelSave}>
                        <Text style={{ alignSelf: 'center', fontSize: 18 }}>Save</Text>
                    </Pressable>
                </View>
            )}

            {ExArray.length === 0 && (
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 5 }}>
                        <Pressable onPress={() => router.push("/(home)/homePage")}>
                            <Ionicons name="arrow-back-circle-sharp" size={50} color="black" />
                        </Pressable>
                        <Pressable onPress={() => setRefresh(refresh + 1)}>
                            <Ionicons name="refresh-circle" size={50} color="black" />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                        <Pressable onPress={() => setNewTypeEx(!NewTypeEx)}>
                            <AntDesign name="pluscircle" size={30} color="black" />
                        </Pressable>
                        <Text style={{ paddingTop: 10 }}>Add new experiments EMC type</Text>
                    </View>
                </View>
            )}

            {ExArray.length > 0 && (
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 5 }}>
                        <Pressable onPress={() => router.back()}>
                            <Ionicons name="arrow-back-circle-sharp" size={50} color="black" />
                        </Pressable>
                        <View style={{ flexDirection: 'column' }}>
                            <Pressable onPress={() => setNewTypeEx(!NewTypeEx)} style={{ alignSelf: 'center' }}>
                                <AntDesign name="pluscircle" size={30} color="black" />
                            </Pressable>
                            <Text style={{ paddingTop: 10, paddingLeft: 5 }}>Add new experiments EMC type</Text>
                        </View>
                        <Pressable onPress={() => setRefresh(refresh + 1)}>
                            <Ionicons name="refresh-circle" size={50} color="black" />
                        </Pressable>
                    </View>
                    <FlatList
                        data={ExArray}
                        renderItem={oneExType}
                        keyExtractor={(item) => item._id}
                        style={styles.flatList}
                    />
                </View>
            )}
        </View>
    )
}


export default experimentsEmc

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 18,
        marginLeft: 16,
    },
    flatList: {
        marginTop: 8,
        padding: 16,
    },
})

