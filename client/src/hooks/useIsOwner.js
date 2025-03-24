import useAuthRequest from "./useAuthRequest"

export const useIsOwner = (pet) => {
    const { userId } = useAuthRequest();
    
    const isOwner = userId === pet._ownerId;

    return {
        isOwner
    }
}
