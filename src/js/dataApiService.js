const axios = require('axios').default;

const API_KEY = '29792872-34dff640cdece5e3f0723ffc1';
const BASE_URL = 'https://pixabay.com/api/';

export default class DataApiService{
  constructor(){
    this.searchValue='';
    this.page=1;
  }


  async getUserSearch(searchValue) {
    console.log(this)
    try {

      let response = await axios.get(BASE_URL,{
        params: {
          key: API_KEY,
          q: this.searchValue,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch:true,
          per_page: 40,
          page: this.page,
  
        },

        headers: {
          'Content-Type':'aplication/json',
        }
        });
        
        this.incrementPage();
          console.log('response.data',response.data);
          console.log('responsedata.totalHits',response.data.totalHits);
               
          return response.data;
              
        } catch (error) {
          console.log('ERROR: ' + error);
        }
      }

    get inputValue() {
      return this.searchValue;
    }

    set inputValue(newSearchValue){
      this.searchValue = newSearchValue;
    }

    incrementPage(){
      this.page += 1;
    }

    resetPage(){
      this.page = 1;
    }

  

      

  // let response = await axios.get('https://pixabay.com/api/',{
  //             params: {
  //               key: '29792872-34dff640cdece5e3f0723ffc1',
  //               q: 'this.searchValue',
  //               image_type: 'photo',
  //               orientation: 'horizontal',
  //               safesearch:true,
  //               per_page: 40,
  //               page: 1,
  //             },
  //             headers: {
  //               'Content-Type':'aplication/json',
  //             }
  //           })
  //           console.log('response',response.data)
            
  //           .catch(function (error) {
  //             if (error.response) {
  //               // The request was made and the server responded with a status code
  //               // that falls out of the range of 2xx
  //               console.log(error.response.data);
  //               console.log(error.response.status);
  //               console.log(error.response.headers);
  //             } else if (error.request) {
  //               // The request was made but no response was received
  //               // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //               // http.ClientRequest in node.js
  //               console.log(error.request);
  //             } else {
  //               // Something happened in setting up the request that triggered an Error
  //               console.log('Error', error.message);
  //             }
  //             console.log(error.config);
  //           });
           
  
      // const API_KEY = '29792872-34dff640cdece5e3f0723ffc1';
      // const BASE_URL = 'https://pixabay.com/api/';
  
      // let response = await axios.get('https://pixabay.com/api/',{
      //         params: {
      //           key: '29792872-34dff640cdece5e3f0723ffc1',
      //           q: this.searchValue,
      //           image_type: 'photo',
      //           orientation: 'horizontal',
      //           safesearch:true,
      //           per_page: 40,
      //           page: 1,
      //         },
      //         headers: {
      //           'Content-Type':'aplication/json',
      //         }
      //       })
      //       console.log(response.data)
      
      
      //       .catch(error => console.log(error));
}

