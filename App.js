import React from 'react';
import SheludeContainer from "./template/SheludeContainer";
import Home from "./template/Home";
import Teacher from "./template/Teacher";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {ContextProvider} from "./template/ContextGroup"
import {NativeRouter, Route} from "react-router-native";

export default function App() {
    return (
        <SafeAreaProvider>
            <ContextProvider>
                <NativeRouter>
                    <Route exact path="/" component={Home}/>
                    <Route path="/teacher" component={Teacher}/>
                    <Route path="/schedule" component={SheludeContainer}/>
                </NativeRouter>
            </ContextProvider>
        </SafeAreaProvider>

    )

}



