import * as React from 'react'
import {useState} from "react";

const GroupContext = React.createContext()

const ContextProvider = ({children}) => {
    const [numberGroup, setNumberGroup] = useState([]);
    const [numberStudent, setNumberStudent] = useState(0);
    const [numberEmployeeValue, setEmployeeTeacher] = useState(0);

    const NumberGroup = (value) => {
        setNumberGroup(value);
    }
    const NumberStudent = (value) => {
        setNumberStudent(value);
    }

    const NumberEmployee = (value) => {
        setEmployeeTeacher(value);
    }



    return <GroupContext.Provider value={{
        valueStudent: numberStudent,
        valueGroup: numberGroup,
        valueEmployee:numberEmployeeValue,
        setGroup: NumberGroup,
        setEmployee:NumberEmployee,
        setStudent: NumberStudent
    }}>{children}</GroupContext.Provider>
}

export {ContextProvider, GroupContext}