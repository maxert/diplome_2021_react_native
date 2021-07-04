import {ScrollView, StyleSheet, Text, useWindowDimensions, View, TouchableOpacity, Platform} from "react-native";
import {Button, Header, ListItem} from "react-native-elements";
import {Col, Grid, Row} from "react-native-easy-grid";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import 'moment/locale/ru';
import {GroupContext} from "./ContextGroup";
import Icon from '@expo/vector-icons/FontAwesome';

let fullTime = moment.duration("10:40").asSeconds();
let now = moment.duration(moment().format('LTS')).asSeconds() - moment.duration("08:30:00").asSeconds();
let proc = now * 100 / fullTime;

function SheludeContainer({history}) {
    const NoteGroup = useContext(GroupContext);

    const [week, setWeek] = useState(moment("10-01-2020", "MMDDYYYY").isoWeek());
    const [heightTimeLine, setTimeHeight] = useState(proc);
    const weekArray = Array.apply(null, Array(7)).map(function (_, i) {
        return moment(i, 'e').startOf('week').isoWeekday(i + 1).format('dddd');
    });
    const [schedule, setScheduleArray] = useState([]);
    const arrayTime = [
        ["", ""],
        ["8:30", "10:05"],
        ["10:15", "11:50"],
        ["12:10", "13:45"],
        ["13:55", "15:30"],
        ["15:50", "17:25"],
        ["17:35", "19:10"]
    ]

    const NextWeek = () => {
        if (week !== 0) {
            setWeek(week + 1)
            axios.post('http://floating-shore-77435.herokuapp.com/schedule', {
                groupNumber: NoteGroup.valueGroup,
                EmployeeNumber: NoteGroup.valueEmployee,
                WeekNumber: week,
                studentNumber: NoteGroup.valueStudent
            }).then(res => {
                setScheduleArray(res.data);
            }).catch(error => console.log(error));
        }
    }
    const PrevWeek = () => {
        if (week !== 0) {
            setWeek(week - 1)
            axios.post('http://floating-shore-77435.herokuapp.com/schedule', {
                groupNumber: NoteGroup.valueGroup,
                WeekNumber: week,
                EmployeeNumber: NoteGroup.valueEmployee,
                studentNumber: NoteGroup.valueStudent
            }).then(res => {
                setScheduleArray(res.data);
                console.log(res.data);
            }).catch(error => console.log(error));
        }
    }

    const StartWeek = () => {
        setWeek(moment("10-01-2020", "MMDDYYYY").isoWeek());
        axios.post('http://floating-shore-77435.herokuapp.com/schedule', {
            groupNumber: NoteGroup.valueGroup,
            WeekNumber: moment("10-01-2020", "MMDDYYYY").isoWeek(),
            EmployeeNumber: NoteGroup.valueEmployee,
            studentNumber: NoteGroup.valueStudent
        }).then(res => {
            setScheduleArray(res.data);
            console.log(res.data);
        }).catch(error => console.log(error));
    }
    const SheludeFunc = () => {
        axios.post('http://floating-shore-77435.herokuapp.com/schedule', {
            groupNumber: NoteGroup.valueGroup,
            WeekNumber: week,
            EmployeeNumber: NoteGroup.valueEmployee,
            studentNumber: NoteGroup.valueStudent
        }).then(res => {
            setScheduleArray(res.data);
            console.log(res.data);
        }).catch(error => console.log(error));
    }
    if (proc <= 100) {
        setInterval(() => {

            let fullTime = moment.duration("10:40").asSeconds();
            let now = moment.duration(moment().format('LTS')).asSeconds() - moment.duration("08:30:00").asSeconds();
            let proc = now * 100 / fullTime;

            setTimeHeight(proc);
        }, 1000)
    }
    useEffect(() => {
        if (proc >= 100) {
            setTimeHeight(0);
        }
    }, [])
    useEffect(() => {
        SheludeFunc();

    }, [week])


    const windowHeight = useWindowDimensions().height;
    const [height, setHeight] = useState(0);
    return (
        <View>
            <ScrollView style={styles.container}>
                <View style={{position: "relative"}}>
                    <Header

                        leftComponent={
                            <TouchableOpacity onPress={() => {
                                history.goBack();
                            }} style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                cursor: "pointer"
                            }}>
                                <Icon
                                    name="arrow-circle-left"
                                    size={30}
                                    color="white"
                                />
                                <Text style={{
                                    marginLeft: 10,
                                    color: "white",
                                    fontSize: 16,
                                    fontWeight: "bold"
                                }}>Назад</Text>
                            </TouchableOpacity>
                        }
                        onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
                        placement="center"
                        centerComponent={{
                            text: 'Розклад',
                            style: {
                                display: "flex",
                                alignItems: "center",
                                color: '#fff',
                                fontSize: 20,
                                fontWeight: "bold",
                                maxHeight: 28
                            }
                        }}
                    />

                </View>
                <View style={{position: "relative"}}>
                    <Grid stickyHeaderIndices={0} style={{
                        position: "absolute",
                        backgroundColor: "white",
                        zIndex: 4,
                        top: 0,
                        height: windowHeight - height,
                        left: 0,
                        paddingLeft: 5
                    }}>
                        {
                            arrayTime.map((element, i) =>
                                i === 0 ?
                                    <Row key={i} style={{minHeight: 40, maxHeight: 40, borderWidth: 1, margin: 1}}>

                                    </Row> :
                                    <Row key={i} style={{
                                        display: "flex",
                                        flexDirection: 'column',
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        borderWidth: 1,
                                        margin: 1,
                                        paddingHorizontal: 5,
                                        paddingVertical: 10

                                    }}>
                                        <Text style={styles.text}>{element[0]}</Text>
                                        <Text style={styles.text}>{element[1]}</Text>
                                    </Row>
                            )

                        }


                    </Grid>
                    <ScrollView horizontal={true} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={true}>
                        <View style={{display: "flex", flexDirection: "column", height: windowHeight - height}}>
                            <Grid style={{
                                minHeight: 40,
                                maxHeight: 40,
                                paddingLeft: 55,
                                marginBottom: 2
                            }}>
                                <Row>
                                    {weekArray.map((col, i) => <Col key={i} style={{
                                        minHeight: 40,
                                        width: 300,
                                        flex: 1,
                                        maxHeight: 40,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderWidth: 1,
                                        margin: 1
                                    }}><Text style={{
                                        fontSize: 16,
                                        textTransform: "uppercase",
                                        fontWeight: "bold"
                                    }}>{col}</Text></Col>)}
                                </Row>
                            </Grid>
                            {weekArray && <Grid style={{paddingLeft: 55, height: "100%", width: "100%"}}>
                                <Text
                                    style={{
                                        position: "absolute",
                                        height: `${heightTimeLine}%`,
                                        borderBottomColor: 'red',
                                        borderBottomWidth: 2,
                                        backgroundColor: "gray",
                                        opacity: .5,
                                        top: 1,
                                        left: Platform.OS === 'android' || Platform.OS === 'ios' ? 55 : 0,
                                        width: "100%",
                                    }}> </Text>
                                {

                                    weekArray.map((col, i) =>
                                        <Col key={i}>
                                            {
                                                arrayTime.map((row, g) =>
                                                    g === 0 ?
                                                        false :
                                                        <Row key={g} style={{
                                                            display: "flex",
                                                            width: 300,
                                                            borderWidth: 1,
                                                            margin: 1,
                                                            flexShrink: 1,
                                                            padding: 10
                                                        }}>{
                                                            schedule && schedule.map((items, j) =>
                                                                g === items.PARA ? (
                                                                    <Text key={j}
                                                                          styled={{
                                                                              flex: 1,
                                                                              display: "flex",
                                                                              flexShrink: 1
                                                                          }}>
                                                                        {
                                                                            i === items.numberDay ?
                                                                                (

                                                                                    <ListItem.Content style={{
                                                                                        display: "flex",
                                                                                        flexDirection: "column"
                                                                                    }}>
                                                                                        <ListItem.Title>{items.info.title}</ListItem.Title>
                                                                                        <ListItem.Subtitle>{items.info.lesson}</ListItem.Subtitle>
                                                                                        <ListItem.Subtitle>{items.info.room}</ListItem.Subtitle>
                                                                                        {items.info.teacher &&
                                                                                        <ListItem.Title>{items.info.teacher}</ListItem.Title>}
                                                                                        {items.info.group &&
                                                                                        <ListItem.Title>{items.info.group}</ListItem.Title>}
                                                                                    </ListItem.Content>

                                                                                ) : false
                                                                        }
                                                                    </Text>
                                                                ) : false
                                                            )
                                                        }</Row>)

                                            }
                                        </Col>
                                    )


                                }
                            </Grid>}
                        </View>
                    </ScrollView>
                </View>
                <Grid
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap"
                    }}><Button
                    onPress={PrevWeek}

                    title={"Попередній тиждень"} titleStyle={{fontSize: 12, display: "flex", alignItems: "center"}}
                    containerStyle={styles.textButton}/><Button onPress={StartWeek}
                                                                icon={
                                                                    <Icon
                                                                        name='calendar'
                                                                        size={20}
                                                                    />
                                                                }

                                                                disabled={week === moment("10-01-2020", "MMDDYYYY").isoWeek() ? true : false}
                                                                containerStyle={styles.textButton}/><Button
                    onPress={NextWeek} title={"Наступний тиждень"}
                    containerStyle={styles.textButton} titleStyle={{fontSize: 12}}/></Grid>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    textButton: {
        margin: 1, fontSize: 10,
        backgroundColor: "rgb(32, 137, 220)", color: "white"
    },
    text: {
        fontWeight: "bold"
    },
    container: {
        display: "flex",

    },
    select: {
        marginTop: "10px",
        marginBottom: "10px"
    },
    a: {
        display: 'flex',
        color: "red",
        marginTop: "20px"
    },
});
export default SheludeContainer;