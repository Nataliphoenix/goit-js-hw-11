import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import cardMarkupTpl from './templates/cardMarkupTpl.hbs';
import DataApiService from './js/dataApiService';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loading: document.querySelector('.loading'),  
  finalMsg: document.querySelector('.final-msg'),
  targetEl: document.querySelector('.target-element'), 
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

  dataApiService.getUserSearch().then( responseData => {

    if( responseData.total === 0 ){
      Notiflix.Notify.failure( `Sorry, there are no images matching your search query. Please try again.`);
      return 

    }
      Notiflix.Notify.success( `Hooray! We found ${responseData.total} images.` );
  
      gallery.refresh(renderSearchCard(responseData.hits));
      observer.observe(refs.targetEl);
 
  });

}

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1,
};

const observer = new IntersectionObserver((entries, observe) => {
  entries.forEach( entry => {
  
  if(entry.isIntersecting && entry.intersectionRect.bottom > 300){
    dataApiService.incrementPage();

    refs.loading.classList.add('show');
    
    dataApiService.getUserSearch().then( responseData => {
      
      let totalPages = Math.ceil(responseData.total / perPage)
    
      if( totalPages === dataApiService.page || totalPages === 1){
        refs.finalMsg.classList.add('show');

        observer.unobserve(refs.targetEl);
      }
      gallery.refresh(renderSearchCard(responseData.hits));

      setTimeout(refs.loading.classList.remove('show'), 1500);
  
    })
}
});
}, options);


function renderSearchCard(hits){
  refs.galleryContainer.insertAdjacentHTML('beforeend',cardMarkupTpl(hits));
  
}

function clearCardContainer(){
  refs.galleryContainer.innerHTML='';
}