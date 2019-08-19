
const initState = {
    storedata : [],
    current_question: {}, 
    // crops:[],
    // topics:[]
}
  
const rootReducer = (state = initState, action) => {
    if(action.type === 'DELETE_POST'){
        // let newPosts = state.posts.filter(post => {
        //     return post.id !== action.id
        // });
        // return {
        //     ...state,
        //     posts: newPosts
        // }
    }
    else if(action.type === 'UPDATE_STORE'){
        return {
            ...state,
            storedata: action.data,
            current_question: action.data.results[0],
        }
    }
    else if(action.type === 'UPDATE_QUESTION'){
        return {
            ...state,
            current_question: action.data
        }
    }
    // else if(action.type === 'UPDATE_CROPS'){
    //     console.log(action);
    //     return {
    //         ...state,
    //         crops: action.data
    //     }
    // }else if(action.type === 'UPDATE_TOPICS'){
    //     console.log(action);
    //     return {
    //         ...state,
    //         topics: action.data
    //     }
    // }
    console.log(state);
    return state;
}
export default rootReducer