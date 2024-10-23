import { useEffect, useRef, useState } from "react"
import { fieldObjects } from "../fieldObjects";

export const usePlayerPos = () => {
    const [playerPos, setPlayerPos] = useState({ y: 0, x: 0 });
    const prevPos = useRef();
    const [dire, setDire] = useState("");
    useEffect(() => {
        // if (field[0]) {
        //     field.map((y, yIndex) => {
        //         return y.map((x, xIndex) => {
        //             if (field[y][x] == fieldObjects.player) {
        //                 setPlayerPos({ y: y, x: x });
        //             }
        //         })
        //     })
        // }
        setPlayerPos({ y: 1, x: 1 });
    }, []);

    const movePlayer = (e) => {
        prevPos.current = playerPos;
        switch (e.key) {
            case "ArrowLeft":
                setDire("left");
                setPlayerPos(prev => ({ y: prev.y, x: prev.x - 1 }));
                break;
            case "ArrowRight":
                setDire("right");
                setPlayerPos(prev => ({ y: prev.y, x: prev.x + 1 }));
                break;
            case "ArrowUp":
                setDire("up");
                setPlayerPos(prev => ({ y: prev.y - 1, x: prev.x }));
                break;
            case "ArrowDown":
                setDire("down");
                setPlayerPos(prev => ({ y: prev.y + 1, x: prev.x }));
                break;
            default:
                break;
        }
    }

    const updatePlayerPos = (y, x) => {
        setPlayerPos({ y, x });
    }

    useEffect(() => {
        document.addEventListener("keydown", movePlayer);
        return () => {
            document.removeEventListener("keydown", movePlayer);
        }
    }, [playerPos]);

    return { playerPos, updatePlayerPos, prevPos, dire };
}