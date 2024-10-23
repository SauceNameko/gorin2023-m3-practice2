import "./FieldScene.css";
export const FieldScene = ({ logout, field, moveCount, time, start }) => {
    const data = Number(localStorage.getItem("time"));
    const h = String(Math.floor(data / 3600)).padStart(2, "0");
    const t = String(Math.floor(data % 3600 / 60)).padStart(2, "0");
    const s = String(data % 60).padStart(2, "0");

    return (
        <>
            <button onClick={() => { logout() }} >ログアウト</button>
            <button onClick={() => { start() }} >スタート</button>
            <div style={{ color: "blue" }}>移動回数: {localStorage.getItem("move-count")}</div>
            <div style={{ color: "green" }}>滞在時間: {`${h}:${t}:${s}`}</div>
            <div className="field">
                {field.map((y, yIndex) => {
                    return y.map((x, xIndex) => {
                        return (
                            <>
                                {x == 0 && <div className="none"></div>}
                                {x == 1 && <div className="wall"></div>}
                                {x == 2 && <div className="player"></div>}
                                {x == 3 && <div className="block"></div>}
                                {x == 4 && <div className="exit"></div>}
                            </>
                        )
                    })
                })}
            </div>
        </>
    )
}