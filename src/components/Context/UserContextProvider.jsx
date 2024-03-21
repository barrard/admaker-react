import React, { useState, useEffect } from "react";
import { readFromLocalStorage, writeToLocalStorage } from "../../utils";
import UserContext from "./UserContext";

function UserContextProvider(props) {
    const [user, setUser] = useState(null);
    const [triedGetUser, setTriedGetUser] = useState(false);
    debugger;

    //TODO  util func
    function validateName(name) {
        if (name) {
            return true;
        } else {
            return false;
        }
    }

    async function getUser() {
        debugger;
        const user = readFromLocalStorage("ad-maker-user", null);
        if (!user) {
            login();
        } else {
            setUser(user);
        }
    }

    async function login() {
        const name = await prompt("Hello.  What is your name?");
        if (validateName(name)) {
            let user = { name };
            writeToLocalStorage("ad-maker-user", user);

            setUser(user);
        }
    }

    function logout() {
        writeToLocalStorage("ad-maker-user", null);
        setUser(null);
    }

    useEffect(() => {
        if (!triedGetUser && !user) {
            setUser(readFromLocalStorage("ad-maker-user", null));
            setTriedGetUser(true);
        }
        if (triedGetUser && !user) {
            login();
        }
    }, [triedGetUser, user]);

    const GLOBAL = {
        user,
        setUser,
        login,
        logout,
    };
    return <UserContext.Provider value={GLOBAL}>{props.children}</UserContext.Provider>;
}

export default UserContextProvider;
