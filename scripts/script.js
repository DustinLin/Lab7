// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        //want to get the entry number, and store it in state. All entries appeneded to 'main'
        let entryCount = (document.querySelector('main').childElementCount + 1).toString(); //gotta be a string to store in state

        //add event listenerer to push/switch state
        newPost.addEventListener('click', () => {
          //don't need a 'title', so just pass in empty string ''
          history.pushState({entry, entryCount}, '', '#entry' + entryCount ); 
          setState('/#entry', {entry, entryCount});
        });

        document.querySelector('main').appendChild(newPost);
      });
    });
});


window.addEventListener('popstate', (e) => {
  //'e' will contain info of where u wanna go
  //console.log(e.target.location.hash, e.state);

  //if there is no state then go back to root
  if(e.state === null){
    setState('/', null);
  }
  //target.location.hash gets the '#...'
  setState('/' + e.target.location.hash, e.state);

});

//add event listeners that will push the state, and set the new screen

const h1 = document.querySelector('h1');
const settings = document.querySelector('img');

h1.addEventListener('click', () => {
  //want to make state null
  history.pushState(null, '', '/');
  setState('/', null);
});

settings.addEventListener('click', () => {
  history.pushState(null, '', '#settings');
  setState('/#settings', null);

});

//service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}
