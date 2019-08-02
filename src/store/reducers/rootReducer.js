import axios from 'axios';
const initState = {
    // posts: [
    //   {id: '1', title: 'Squirtle Laid an Egg', body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum perferendis, enim repellendus ipsam sunt autem at odit dolorum, voluptatum suscipit iste harum cum magni itaque animi laudantium fugiat'},
    //   {id: '2', title: 'Charmander Laid an Egg', body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum perferendis, enim repellendus ipsam sunt autem at odit dolorum, voluptatum suscipit iste harum cum magni itaque animi laudantium fugiat'},
    //   {id: '3', title: 'a Helix Fossil was Found', body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum perferendis, enim repellendus ipsam sunt autem at odit dolorum, voluptatum suscipit iste harum cum magni itaque animi laudantium fugiat'}
    // ]
    await axios.get('https://dev.farmstock.in/api/v1/posts')
        .then(response => {
            
            this.setState({data:response.data});
            this.setState({loading:false});
            this.setState({fetched:true});
            console.log(this.state.data);
            //return response.data;
            //console.log(this.state.data.content);
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
  }
  
  const rootReducer = (state = initState, action) => {
    console.log(action);
    if(action.type === 'DELETE_POST'){
     let newPosts = state.posts.filter(post => {
       return post.id !== action.id
     });
     return {
       ...state,
       posts: newPosts
     }
    }
    return state;
  }
  
  export default rootReducer