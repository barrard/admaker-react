// import { useState, useContext } from "react";
import UserContextProvider from "./components/Context/UserContextProvider";

import "./App.css";
// import { AlertDialogDemo } from "./components/AlertDialogDemo";
import MainContainer from "./components/MainContainer";
import SomeTopBarThing from "./components/SomeTopBarThing";

function App() {
    return (
        <UserContextProvider>
            <SomeTopBarThing />
            <MainContainer />
        </UserContextProvider>
    );
}

export default App;
