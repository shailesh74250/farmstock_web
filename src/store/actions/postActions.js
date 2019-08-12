export const deletePost = (id) => {
    return (dispatch, getState) => {
        // make async call to database
        dispatch({type:'DELETE_POST', id});
    }
};

export const updateStore = (data) => {
    
    return (dispatch, getState) => {
        // make async call to database
        dispatch({type:'UPDATE_STORE', data});
    }
};

export const updateCurrentQuestion = (data) => {
    return (dispatch, getState) => {
        // make async call to database
        dispatch({type:'UPDATE_QUESTION', data});
    }
};