import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Constants from 'expo-constants';
import axios from 'axios';

const BookingPage = () => {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedHours, setSelectedHours] = useState([]);
    const [availableHours, setAvailableHours] = useState(["05:00", "06:00", "09:00", "10:00", "15:00", "16:00"]); // Replace with your available hours ,"06:00","09:00","10:00","15:00","16:00"
    const { username } = useLocalSearchParams()
    const { email } = useLocalSearchParams()
    const { exName } = useLocalSearchParams()
    const { title } = useLocalSearchParams()
    const [x, setX] = useState([])
    const [taken_hours, settaken_hours] = useState([]);
    const [mongoHoursData, setMongoHoursData] = useState([])
    const ipAddress = Constants.expoConfig.hostUri.split(':')[0];
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    const handelBooking = async () => {
        const ipAddress = Constants.expoConfig.hostUri.split(':')[0];
        const bookData = {
            email: email,
            date: selectedDate,
            time: selectedHours,
            bookingType: title,
            bookingSubType: exName,
            comment: "bla bla"
        }
        axios.post("http://" + ipAddress + ":8000/addBooking", bookData).then((response) => {
            alert(
                `${exName} at ${selectedDate} ${selectedHours} as booked successfuly `
            );
        })
        setSelectedDate(day.dateString)
    }
    function filter_data(hours_that_taken) {
        const hours = availableHours.filter((element) => !hours_that_taken.includes(element))
        const nestedArray = [];
        console.log(hours)
        for (let i = 0; i < hours.length; i += 3) {
            const subArray = hours.slice(i, i + 3);
            nestedArray.push(subArray);
        }
        return nestedArray
    }
    const handleDayPress = async (day) => {
        setSelectedHours([])
        setSelectedDate(day.dateString);
        setX(filter_data(await getDataFromMongiDB(day.dateString)))
    };

    async function getDataFromMongiDB(myDay) {
        const data = {
            exName: exName,
            selectedDate: myDay
        }
        const response = await axios.post("http://" + ipAddress + ":8000/getBookingData", data)
        const res = response.data.message.flat()
        return res
    }

    const handleHourPress = (hour) => {
        if (selectedHours.includes(hour)) {
            setSelectedHours(selectedHours.filter((selectedHour) => selectedHour !== hour));
        } else {
            setSelectedHours([...selectedHours, hour]);
        }

    };

    // const getTimeArray = async () => {
    //     const data = {
    //         exName: exName,
    //         selectedDate: selectedDate
    //     }
    //     const ipAddress = Constants.expoConfig.hostUri.split(':')[0];
    //     await axios.post("http://" + ipAddress + ":8000/getBookingData", data).then((response) => {
    //         return response.data.message;
    //     });
    // }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => router.push({ pathname: "experimentsEmc", params: { username: username, email: email } })}>
                <Ionicons name="arrow-back-circle-sharp" size={50} color="black" />
            </Pressable>

            <Calendar
                onDayPress={handleDayPress}
                minDate={`${year}-${month}-${day}`}
                markedDates={{
                    [selectedDate]: { selected: true, marked: true, selectedColor: '#0EC4F5', dotColor: '#0E38F5' },
                }}
                enableSwipeMonths={true}
            />

            {selectedDate && (
                <ScrollView style={styles.hoursContainer}>
                    <Text style={styles.hoursTitle}>Available Hours for {selectedDate}</Text>
                    {x.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.hourRow}>
                            {row.map((hour) => (
                                <Pressable
                                    key={hour}
                                    style={[styles.hourButton, { backgroundColor: selectedHours.includes(hour) ? '#0EC4F5' : 'white' }]}
                                    onPress={() => handleHourPress(hour)}
                                >
                                    <Text style={[styles.hourText, { color: selectedHours.includes(hour) ? 'white' : 'black' }]}>{hour}</Text>
                                </Pressable>
                            ))}
                        </View>
                    ))}


                    <Pressable onPress={() => handelBooking()} style={styles.bookButton}>
                        <Text style={styles.bookText}>Book</Text>
                    </Pressable>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    hoursContainer: {
        marginTop: 20,
    },
    hoursTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    hourRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    hourButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#0EC4F5',
    },
    hourText: {
        fontSize: 16,
        textAlign: 'center',
    },
    bookButton:{
        flex:1,
        padding:5,
        marginLeft:"20%",
        marginRight:"20%",
        marginTop:"10%",
        borderRadius:5,
        backgroundColor:'#5DADE2',
    },
    bookText:{
        fontSize:20,
        color:'#283747',
        margin:8,
        alignSelf:'center'
    }
});

export default BookingPage;
