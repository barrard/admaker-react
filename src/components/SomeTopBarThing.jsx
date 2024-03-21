import React, { useState, useContext, useRef, useEffect } from "react";
import Canvas from "./Canvas";
import CanvasControls from "./CanvasControls";
import { AudioUpload, VideoUpload } from "./Upload";
import { TwoCol } from "./Layout";
import UserContext from "./Context/UserContext";
import { BasicBtn } from "./Button";
import { writeToLocalStorage } from "../utils";

export default function SomeTopBarThing() {
    const { user, setUser, login, logout } = useContext(UserContext);

    return (
        <div className="container">
            {user?.name && (
                <>
                    <h1>{user.name}</h1>
                    <BasicBtn onClick={logout} text="Logout" />
                </>
            )}
            {!user?.name && (
                <>
                    <BasicBtn onClick={login} text="Login" />
                </>
            )}
            {/* <TwoCol>
                <div>1</div>
                <div>2</div>
            </TwoCol> */}
        </div>
    );
}
