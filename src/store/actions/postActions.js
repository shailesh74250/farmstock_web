export const deletePost = (id) => {
    return (dispatch, getState) => {
        // make async call to database
        dispatch({type:'DELETE_POST', id});
    }
};

export const updateStore = (data) => {
    console.log("update store")
    console.log(data);
    return (dispatch, getState) => {
        dispatch({type:'UPDATE_STORE', data});
    }
};

export const updateCurrentQuestion = (data) => {
    return (dispatch, getState) => {
        dispatch({type:'UPDATE_QUESTION', data});
    }
};

// export const updateCrops = (data) => {
//     console.log("update crops")
//     console.log(data);
//     return (dispatch, getState) => {
//         dispatch({type:'UPDATE_CROPS', data});
//     }
// };

// export const updateTopics = (data) => {
//     console.log("update topics")
//     console.log(data);
//     return (dispatch, getState) => {
//         dispatch({type:'UPDATE_TOPICS', data});
//     }
// };

