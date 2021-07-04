import React, {useContext, useEffect, useState} from "react";
import {GroupContext} from "./ContextGroup";
import axios from "axios";
import {StyleSheet, Text, View} from "react-native";
import {Header, Button} from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import {Link} from "react-router-native";
import SearchableDropdown from "react-native-searchable-dropdown";


const Home = ({history}) => {

    const NoteGroup = useContext(GroupContext);
    const [group, setGroup] = useState([]);
    const [searchGroup, setSearchGroup] = useState([]);
    const [numberFac, setNumberFac] = useState([]);
    const [numberSpec, setNumberSpec] = useState([]);
    const [NumberCours, setNumberCourse] = useState([]);
    const [facArray, setFacArray] = useState([]);
    const [courseArray, setCourseArray] = useState([]);
    const [groupArray, setGroupArray] = useState([]);
    const [studentArray, setStudentArray] = useState([]);
    const pickerStyle = {
        inputWeb: {
            fontSize: 16,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 0,
            color: 'black',
            paddingRight: 30, // to ensure the text is never behind the icon
            marginVertical: 5
        },
        inputIOS: {
            fontSize: 16,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 0,
            color: 'black',
            paddingRight: 30, // to ensure the text is never behind the icon
            marginVertical: 5
        },
        inputAndroid: {
            fontSize: 16,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 0,
            color: 'black',
            paddingRight: 30, // to ensure the text is never behind the icon
            marginVertical: 5
        },

    };

    useEffect(() => {
        NoteGroup.setStudent(0);
        axios.get('http://floating-shore-77435.herokuapp.com/search').then((res) => {
            const searchResult = res.data.filter(items => items.nameGroup !== "").map((items, i) => {
                return {id: i, value: items.valueGroup, name: items.nameGroup}
            })
            setSearchGroup(searchResult);
        })
    }, [])
    useEffect(() => {

        axios.get('http://floating-shore-77435.herokuapp.com/group')
            .then((res) => {
                const groupArray = res.data[0].valueName.filter(items => items.value !== "").map((items, i) => {
                    return {label: items.name_schedule, value: items.value}
                })
                setGroup(groupArray);
                const FacultetArray = res.data[0].valueName.filter(items => items.value === numberFac).map((items, i) =>
                    items.facultet.filter(items => items.value !== "").map((facItems, i) => {
                        return {label: facItems.name, value: facItems.value, ...facItems}
                    })
                )

                FacultetArray[0] && setFacArray(FacultetArray[0])
                const SpecArray = FacultetArray[0] && FacultetArray[0].filter(items => items.value === numberSpec).map((items, i) =>
                    items.course.filter(items => items.number !== "").map((courseItems, i) => {
                        return {label: courseItems.number, value: courseItems.number, ...courseItems}
                    })
                )
                SpecArray[0] && setCourseArray(SpecArray[0]);
                const GroupArray = SpecArray[0] && SpecArray[0].filter(items => items.number === NumberCours).map((items, i) =>
                    items.group.filter(items => items.valueGroup !== "").map((GroupItems, i) => {
                        return {label: GroupItems.nameGroup, value: GroupItems.valueGroup, ...GroupItems}
                    })
                )
                GroupArray[0] && setGroupArray(GroupArray[0]);
                const StudentArray = GroupArray[0] && GroupArray[0].filter(items => items.value === NoteGroup.valueGroup).map((items, i) =>
                    items.student.filter(items => items.value !== "").map((GroupItems, i) => {
                        return {label: GroupItems.name, value: GroupItems.value, ...GroupItems}
                    })
                )
                StudentArray[0] && setStudentArray(StudentArray[0]);

            })
            .catch((error) => console.log(error))
    }, [numberFac, numberSpec, NoteGroup.valueGroup, NoteGroup.valueStudent, NumberCours])
    const [height, setHeight] = useState(0);
    return (
        <View style={styles.container}>
            <Header
                onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
                placement="center"
                centerComponent={{
                    text: 'Розклад',
                    style: {color: '#fff', fontSize: 20, fontWeight: "bold", maxHeight: 48}
                }}
            />
            <View><Link to="/teacher" style={{
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
            }}>Розклад на Викладача</Text></Link></View>
            <View style={{paddingHorizontal: 20, marginBottom: 40}}>
                <Text style={{marginBottom: 10, fontSize: 20}}>
                    Швидкий пошук по групі</Text>
                <SearchableDropdown
                    multi={false}
                    onItemSelect={(item) => {
                        NoteGroup.setGroup(item.value);
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
                    items={searchGroup && searchGroup}
                    defaultIndex={2}
                    resetValue={false}
                    underlineColorAndroid="transparent"
                    textInputProps={
                        {
                            placeholder: "Введіть группу",
                            underlineColorAndroid: "transparent",
                            style: {
                                padding: 12,
                                borderWidth: 1,
                                fontSize: 16,
                                borderColor: 'rgb(128, 128, 128)',
                                borderRadius: 0,
                            },
                            // onTextChange: text => alert(text)
                        }
                    }
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }
                />
            </View>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
                <RNPickerSelect
                    placeholder={{label: "Оберіть Факультет", value: null}}
                    onValueChange={(value) => setNumberFac(value)}
                    style={pickerStyle}
                    items={group && group}
                    useNativeAndroidPickerStyle={false}

                />
                <RNPickerSelect
                    onValueChange={(value) => {
                        setNumberSpec(value);
                    }}
                    placeholder={{label: "Оберіть Спеціальність", value: null}}
                    style={pickerStyle}
                    useNativeAndroidPickerStyle={false}
                    items={facArray && facArray}
                    disabled={facArray[0] !== undefined ? false : true}
                />
                <RNPickerSelect
                    placeholder={{label: "Оберіть Курс", value: null}}
                    onValueChange={(value) => {
                        setNumberCourse(value);
                    }}
                    style={pickerStyle}
                    useNativeAndroidPickerStyle={false}
                    items={courseArray && courseArray}
                    disabled={courseArray[0] !== undefined ? false : true}
                />
                <RNPickerSelect
                    placeholder={{label: "Оберіть Групу", value: null}}
                    onValueChange={(value) => {
                        NoteGroup.setGroup(value);
                    }}
                    style={pickerStyle}
                    useNativeAndroidPickerStyle={false}
                    items={groupArray && groupArray}
                    disabled={groupArray[0] !== undefined ? false : true}
                />
                <RNPickerSelect
                    placeholder={{label: "Оберіть Студента", value: null}}
                    onValueChange={(value) => {
                        NoteGroup.setStudent(value);
                    }}
                    style={pickerStyle}
                    useNativeAndroidPickerStyle={false}
                    items={studentArray && studentArray}
                    disabled={studentArray[0] !== undefined ? false : true}
                />
            </View>

            <Link to="/schedule" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: NoteGroup.valueStudent === 0 ? "rgb(227, 230, 232)" : "rgb(32, 137, 220)",
                paddingHorizontal: 10,
                paddingVertical: 12
            }} disabled={NoteGroup.valueStudent !== 0 ? false : true}>
                <Text style={{
                    color: NoteGroup.valueStudent === 0 ? "rgb(153, 161, 168)" : "rgb(255, 255, 255)",
                    fontSize: 18
                }}>Показати розклад</Text>
            </Link>

        </View>
    )
}
export default Home;
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