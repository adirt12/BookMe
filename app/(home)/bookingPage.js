// import { View, Text, Pressable } from 'react-native'
// import React, { useState } from 'react'
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { Calendar, CalendarList, LocaleConfig } from 'react-native-calendars';
// import { FlatList } from 'react-native-gesture-handler';

// const bookingPage = () => {
//     const router = useRouter();
//     const [selected, setSelected] = useState('');
//     const { username } = useLocalSearchParams()
//     const { email } = useLocalSearchParams()


//     var day = new Date().getDate();
//     var month = new Date().getMonth() + 1;
//     var year = new Date().getFullYear();

//     return (
//         <View style={{ flex: 1 }}>
//         <View>
//             <Pressable onPress={() => router.push({ pathname: "experimentsEmc", params: { username: username, email: email } })}>
//                 <Ionicons name="arrow-back-circle-sharp" size={50} color="black" />
//             </Pressable>

//             <Calendar onDayPress={(day) => setSelected(day.dateString)}
//                 minDate={`${year}-${month}-${day}`}
//                 markedDates={{
//                     [selected]: { selected: true, marked: true, selectedColor: '#0EC4F5', dotColor: '#0E38F5' }
//                 }}
//                 enableSwipeMonths={true}
//             />
//             </View>
//         </View>
//     )
// }

// export default bookingPage

import React, { useState } from 'react';
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
    const [availableHours, setAvailableHours] = useState(['09:00 AM', '10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM']); // Replace with your available hours
    const { username } = useLocalSearchParams()
    const { email } = useLocalSearchParams()

    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    console.log(selectedHours)

    const handelBooking = async()=>{
        const ipAddress = Constants.expoConfig.hostUri.split(':')[0];
        const bookData ={
            email:"adi@gmail.com",
            date:"2023/12/12",
            time:"10:00",
            bookingType:"carMaint",
            bookingSubType:"berlingo",
            comment:"bla bla"
        }
        axios.post("http://" + ipAddress + ":8000/addBooking", bookData).then((response) => {
            console.log(response.data)
            alert(
                response.data.message,
            );
    })}

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        setSelectedHours([]);
    };

    const handleHourPress = (hour) => {
        if (selectedHours.includes(hour)) {
            setSelectedHours(selectedHours.filter((selectedHour) => selectedHour !== hour));
        } else {
            setSelectedHours([...selectedHours, hour]);
        }
        
    };

    const rows = availableHours.reduce((result, item, index) => {
        if (index % 3 === 0) {
            result.push([]);
        }
        result[result.length - 1].push(item);
        return result;
    }, []);

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
                    {rows.map((row, rowIndex) => (
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

                    <Pressable onPress={()=>handelBooking()} style={styles.hourText}>
                        <Text>Book</Text>
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
});

export default BookingPage;
