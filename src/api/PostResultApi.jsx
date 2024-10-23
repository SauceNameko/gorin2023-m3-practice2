import { path } from "./path"

export const PostResultApi = async () => {

    const res = await fetch(`${path}/results`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ block_moves: localStorage.getItem("move-count"), time: localStorage.getItem("time") })
    })
    const data = await res.json();
    if (data.success) {
        alert("結果を投稿しました");
        //記録削除
        localStorage.removeItem("time");
        localStorage.removeItem("move-count");
    } else {
        alert(data.message);
    }
}