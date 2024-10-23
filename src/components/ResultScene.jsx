import "./ResultScene.css";
import { useEffect, useState } from "react"
import { ResultsApi } from "../api/ResultsApi";
import { PostResultApi } from "../api/postResultApi";

export const ResultScene = ({ isGoal }) => {
    const [ranks, setRanks] = useState([]);

    useEffect(() => {
        if (isGoal) {
            const getResults = async () => {
                const data = await ResultsApi();
                setRanks(data);
            }
            getResults();
        }
    }, [isGoal]);


    return (
        <>
            <div className="clear">ゴール</div>
            <table border={1}>
                <tr>
                    <th>username</th>
                    <th>block_moves</th>
                    <th>time</th>
                </tr>
                {ranks.map(rank => {
                    return (
                        <tr>
                            <td className={`${rank.user == localStorage.getItem("username") ? "active" : ""}`} >{rank.user}</td>
                            <td >{rank.block_moves}</td>
                            <td>{rank.time}</td>
                        </tr>
                    )
                })}
            </table>
            <div className="result-post">結果投稿</div>
            <button onClick={() => { PostResultApi() }} >結果投稿はこちらをクリック</button>
        </>
    )
}