import DB from "../../api/api";

const saveWorkoutToDB = async (workout) => {
    const w = {...workout, user_id: global.USER_ID};
    console.log(w);
    console.log("asdasfsdg");
    await DB.session.post(w);
}

export default saveWorkoutToDB;