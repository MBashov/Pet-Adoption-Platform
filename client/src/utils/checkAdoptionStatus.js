import { toast } from "react-toastify";

import { getAll } from "../api/adoptApi";

export const checkAdoptionStatus = async (petId, userId) => {

    try {
        const allApplicants = await getAll();
        const userHasAdopted = allApplicants.some(app => app._ownerId === userId && app.petId === petId);
        return userHasAdopted;

    } catch (err) {
        toast(err.message);
    }
}