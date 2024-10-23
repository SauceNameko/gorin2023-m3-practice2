import { useEffect, useState } from "react"
import { FieldApi } from "../api/FieldApi";
import { fieldObjects } from "../fieldObjects";

export const useField = (isLogin, playerPos, updatePlayerPos, prevPos, dire) => {
    const [field, setField] = useState([]);
    const [isGoal, setIsGoal] = useState(false);
    const [moveCount, setMoveCount] = useState(0);
    const [time, setTime] = useState(0);
    const [isStart, setIsStart] = useState(false);
    const start = () => {
        setIsStart(true);
    }
    //状態保持・復元
    useEffect(() => {
        if (isStart && time) {
            localStorage.setItem("field", JSON.stringify(field));
            localStorage.setItem("move-count", moveCount);
            localStorage.setItem("time", time);
            localStorage.setItem("player-pos", JSON.stringify(playerPos));
        };
    }, [isStart, time, playerPos]);
    useEffect(() => {
        if (localStorage.getItem("field")) {
            setField(JSON.parse(localStorage.getItem("field")));
        } if (localStorage.getItem("move-count")) {
            setMoveCount(Number(localStorage.getItem("move-count")));
        } if (localStorage.getItem("time")) {
            setTime(Number(localStorage.getItem("time")));
        } if (localStorage.getItem("player-pos")) {
            updatePlayerPos(JSON.parse(localStorage.getItem("player-pos")).y, JSON.parse(localStorage.getItem("player-pos")).x)
        }
    }, []);

    //時間計測
    useEffect(() => {
        if (isLogin && isStart) {
            const interval = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
            return () => {
                clearInterval(interval);
            }
        }
    }, [isLogin, isStart]);
    //フィールド初期データ
    useEffect(() => {
        if (isLogin) {
            if (!localStorage.getItem("field")) {
                if (isGoal) {
                    const getField = async () => {
                        const data = await FieldApi();
                        setField(data);
                    }
                    getField();
                    return;
                }
                const getField = async () => {
                    const data = await FieldApi();
                    setField(data);
                }
                getField();
            }
        }
    }, [isLogin, isGoal]);
    //フィールド更新処理
    useEffect(() => {
        if (field.length === 0) return;
        if (isStart) {
            const newField = [...field];
            if (newField[playerPos.y][playerPos.x] == fieldObjects.none) {
                setMoveCount(prev => prev + 1);
                newField[playerPos.y][playerPos.x] = fieldObjects.player;
                newField[prevPos.current.y][prevPos.current.x] = fieldObjects.none;
            } else if (newField[playerPos.y][playerPos.x] == fieldObjects.block) {
                if (dire == "left") {
                    if (newField[playerPos.y][playerPos.x - 1] == fieldObjects.none) {
                        newField[playerPos.y][playerPos.x - 1] = fieldObjects.block;
                        newField[playerPos.y][playerPos.x] = fieldObjects.none;
                    }
                } else if (dire == "right") {
                    if (newField[playerPos.y][playerPos.x + 1] == fieldObjects.none) {

                        newField[playerPos.y][playerPos.x + 1] = fieldObjects.block;
                        newField[playerPos.y][playerPos.x] = fieldObjects.none;
                    }
                } else if (dire == "up") {
                    if (newField[playerPos.y - 1][playerPos.x] == fieldObjects.none) {
                        newField[playerPos.y - 1][playerPos.x] = fieldObjects.block;
                        newField[playerPos.y][playerPos.x] = fieldObjects.none;
                    }
                } else if (dire == "down") {
                    if (newField[playerPos.y + 1][playerPos.x] == fieldObjects.none) {
                        newField[playerPos.y + 1][playerPos.x] = fieldObjects.block;
                        newField[playerPos.y][playerPos.x] = fieldObjects.none;
                    }
                }
                updatePlayerPos(prevPos.current.y, prevPos.current.x);
            } else if (newField[playerPos.y][playerPos.x] == fieldObjects.wall) {
                updatePlayerPos(prevPos.current.y, prevPos.current.x);
                return;
            } else if (newField[playerPos.y][playerPos.x] == fieldObjects.exit) {
                setMoveCount(prev => prev + 1);
                setIsGoal(true);
                setIsStart(false);
                localStorage.removeItem("field");
               
                localStorage.removeItem("player-pos");
                setMoveCount(0);
                setTime(0);
                setField([]);
            }
            setField(newField);
        }
    }, [playerPos, prevPos, isStart]);

    return { field, isGoal, moveCount, time, start }
}