import DB from "../../api/api";

export const fetchData = async (setSessions) => {
    const data = await DB.session.get();
    setSessions(data);
    return data;
}

export const chartData = () => {
    const sessions = fetchData((data)=>{/*Do nothing*/});
    let data = [];
    if(sessions.length > 0){
        let counter = 0;
        sessions.foreach((session) => {
            let time = new Date(session.end_date).getTime() - new Date(session.start_date).getTime();
            time /= 60000;
            let sesTime = {x: counter, y:time};
            data.push(sesTime);
            counter++;
        })
    }else{
        data = [
            { x: 0, y: 15 },
            { x: 1, y: 7 },
            { x: 2, y: 6 },
            { x: 3, y: 3 },
            { x: 4, y: 5 },
            { x: 5, y: 8 },
            { x: 6, y: 12 },
            { x: 7, y: 14 },
            { x: 8, y: 12 },
            { x: 9, y: 13 },
            { x: 10, y: 18 },
        ]
    }
    return data;
}