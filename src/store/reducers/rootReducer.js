
const initState = {
    storedata : [],
    current_question: {}, 
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
    //console.log(state);
    return state;
}
export default rootReducer