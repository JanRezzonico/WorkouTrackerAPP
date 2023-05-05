import DB from "../../api/api";

{/*
    This method is used to save data in the db
*/}
const saveWorkoutToDB = async (workout) => {
    const w = {...workout, user_id: global.USER_ID};
    await DB.session.post(w);
}

export default saveWorkoutToDB;