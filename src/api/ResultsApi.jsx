import { path } from "./path"

export const ResultsApi = async () => {
    const res = await fetch(`${path}/results`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })
    const data = await res.json();
    const sortData = data.sort((a, b) => a.time - b.time);
    const sliceData = sortData.slice(0, 3);
    return sliceData;
}