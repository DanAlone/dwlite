import React, {useState} from "react";

export default function Holdable({ id, onClick, onHold, children }) {

    const [timer, setTimer] = useState(null);

    function onPointerDown(evt) {
        const event = { ...evt } // convert synthetic event to real object
        const timeoutId = window.setTimeout(timesup.bind(null, event), 500)
        setTimer(timeoutId)
    }

    function onPointerUp(evt) {
        if (timer) {
            window.clearTimeout(timer)
            setTimer(null)
            onClick(evt)
        }
    }

    function timesup(evt) {
        setTimer(null)
        onHold(evt)
    }

    return (
        <div
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            id={id}
        >
            {children}
        </div>
    )
}