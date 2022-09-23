import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import cardMarkupTpl from './templates/cardMarkupTpl.hbs';
import DataApiService from './js/dataApiService';

// import debounce from 'lodash.debounce';

// const DEBOUNCE_DELAY = 300;

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loading: document.querySelector('.loading'),  
  finalMsg: document.querySelector('.final-msg'),
  sentinel: document.querySelector('#sentinel'), 
}

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom', 
  captionDelay:250,
  enableKeyboard: true,
  spinner: true,
  doubleTapZoom:	2,
  alertErrorMessage:'Image not found, next image will be loaded',  
})

const dataApiService = new DataApiService();
  
refs.searchForm.addEventListener('submit', onSearchCard);

const perPage = 40;

function onSearchCard(e){
  e.preventDefault();

  clearCardContainer();
  refs.finalMsg.classList.remove('show');
  dataApiService.inputValue = e.currentTarget.searchQuery.value.trim();
  dataApiService.resetPage();

  if(dataApiService.inputValue === '' ){
    Notiflix.Notify.failure('Please, enter a search value!');
    return
  }

  console.log('searchValue', dataApiService.inputValue);

  dataApiService.getUserSearch().then( responseData => {

    if( responseData.total === 0 ){
      Notiflix.Notify.failure( `Sorry, there are no images matching your search query. Please try again.`);
      return 

    }
      Notiflix.Notify.success( `Hooray! We found ${responseData.total} images.` );
  
      gallery.refresh(renderSearchCard(responseData.hits));
    
      if( Math.ceil(responseData.total / perPage) === dataApiService.page || Math.ceil(responseData.total / perPage) === 1 ){
      refs.finalMsg.classList.add('show');
      console.log('totalPages',(Math.ceil(responseData.totalHits / perPage)))
      console.log('dataApiService.page', dataApiService.page)
      
      return
      
    } else {
      refs.finalMsg.classList.remove('show');
    }
 
    });

}

// window.addEventListener('scroll', debounce(() => {
// const lastCardObserver = new IntersectionObserver(entries => {
//   const lastCard = entries[0]
//   // const lastCard = refs.galleryContainer[40]
//   if(!lastCard.isIntersecting){
//     lastCardObserver.unobserve(lastCard.target)
//     console.log('НЕЕЕ')

//     return
//   } else if(lastCard.isIntersecting) {
//     console.log('Ура')
//     lastCardObserver.unobserve(lastCard.target);
    
//     dataApiService.incrementPage();
//     showLoading();
  
//     setTimeout(lastCardObserver.observe(refs.galleryContainer.lastElementChild), 1000)
//   }
  
// }, {});

// lastCardObserver.observe(refs.galleryContainer.lastElementChild);

// }, DEBOUNCE_DELAY))

////////////////////////////////////////////

// window.addEventListener('scroll', debounce(() => {
// const lastCardObserver = new IntersectionObserver(entries => {
  
//   let arrayGalleryContainer = refs.galleryContainer.children;
//   console.log(arrayGalleryContainer)
//   for (let i = perPage -1 ; i < arrayGalleryContainer.length; i += perPage ){
//     let lastCard = i;
//     lastCard = entries[0];
//     console.log(lastCard)
//     if(!lastCard.isIntersecting){
//       console.log('НЕЕЕЕ')
//       return
//     }

//     dataApiService.incrementPage();

//     showLoading()
//     console.log('УРААА')
//   }
  

// }, {})

// lastCardObserver.observe(refs.galleryContainer);

// }, DEBOUNCE_DELAY))

/////////////////////////

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if( clientHeight + scrollTop >= scrollHeight && dataApiService.page > 1){

  // show the loading animation
  showLoading();

}

})

function showLoading(){
  refs.loading.classList.add('show');

  //load more date
  dataApiService.getUserSearch().then( responseData => {
    
    gallery.refresh(renderSearchCard(responseData.hits));

    refs.loading.classList.remove('show');

  })
  

}

function renderSearchCard(hits){
  refs.galleryContainer.insertAdjacentHTML('beforeend',cardMarkupTpl(hits));
  
}

function clearCardContainer(){
  refs.galleryContainer.innerHTML='';
}