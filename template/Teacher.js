import React, {useContext, useEffect, useState} from "react";
import {GroupContext} from "./ContextGroup";
import axios from "axios";
import {StyleSheet, Text, View} from "react-native";
import {Header} from "react-native-elements";
import SearchableDropdown from "react-native-searchable-dropdown";
import {Link} from "react-router-native";

const Teacher = ({history}) => {
    const NoteGroup = useContext(GroupContext);
    const [teacherList, setTeacherList] = useState([]);

    useEffect(() => {
        NoteGroup.setEmployee(0);
        axios.get('http://floating-shore-77435.herokuapp.com/teacher').then((res) => {
            const teacherArray = [];
            const teacherResult = res.data.valueName.filter(items => items.value !== "").map((itemsName, i) => {
                return itemsName.name_teacher.filter(valueEl => valueEl.value !== "").map((itemsNameTeacher, i) => {
                        return {nameValue: itemsNameTeacher.name, value: itemsNameTeacher.value}
                    }
                )
                // return {id: i, value: items.valueGroup, name: items.nameGroup}
            })

            let count = 0;
            for (const teacherList of teacherResult) {
                for (const element of teacherList) {
                    count++;
                    teacherArray.push({id: count, name: element.nameValue, value: element.value});
                }
            }

            setTeacherList(teacherArray.sort())

        }).catch((error) => console.log(error))
    }, [])
    return (
        <View style={styles.container}>
            <View style={{position: "relative"}}>
                <Header
                    placement="center"
                    centerComponent={{
                        text: 'Розклад на викладача',
                        style: {color: '#fff', fontSize: 20, fontWeight: "bold", maxHeight: 48}
                    }}
                />
            </View>
            <View><Link to="/" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "gray",
                marginVertical: 10,
                paddingHorizontal: 10,
                paddingVertical: 12
            }}><Text style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 18
            }}>Розклад на Студента</Text></Link></View>
            <View style={{paddingHorizontal: 20, marginTop: 40}}>
                <Text style={{marginBottom: 10, fontSize: 20}}>
                    Швидкий пошук по ПІБ</Text>
                <SearchableDropdown
                    multi={false}
                    onItemSelect={(item) => {
                        NoteGroup.setEmployee(item.value);
                        history.push("/schedule")
                    }}
                    containerStyle={{padding: 0, borderRadius: 0}}
                    itemStyle={{
                        padding: 10,
                        marginTop: 1,
                        backgroundColor: 'rgb(227, 230, 232)',
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 0,
                    }}
                    itemTextStyle={{color: 'black'}}
                    itemsContainerStyle={{maxHeight: 140}}
                    items={teacherList && teacherList}
                    defaultIndex={2}
                    resetValue={false}
                    underlineColorAndroid="transparent"
                    textInputProps={
                        {
                            placeholder: "Введіть ПІБ",
                            underlineColorAndroid: "transparent",
                            style: {
                                padding: 12,
                                borderWidth: 1,
                                fontSize: 16,
                                borderColor: 'rgb(128, 128, 128)',
                                borderRadius: 0,
                            },
                        }
                    }
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }
                />
            </View>
        </View>
    )
}

export default Teacher;

const styles = StyleSheet.create({
    textButton: {
        display: "flex",
        margin: 1, fontSize: 12,
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