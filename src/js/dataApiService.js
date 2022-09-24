import axios from 'axios';

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

}

