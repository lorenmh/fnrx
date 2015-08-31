var Rx = require( 'rx' )
;

// var button
// ;

// button = document.getElementById( 'input' );

// buttonEvents = Rx.Observable.create( function( observer ) {
//   function eventListener( e ) {
//     observer.onNext( e );
//   }

//   button.addEventListener( 'click', eventListener );

//   return function() {
//     button.removeEventListener( 'click', eventListener );
//   };
// });

// foo = require( '../mod/router' );

var urlStream = Rx.Observable.return( 'http://api.github.com/users' );
var responseStream = urlStream.flatMap( function( url ) {
  return Rx.Observable.create( function( observer ) {
    var xhr = new XMLHttpRequest();
    xhr.open( 'GET', url, true );
    xhr.send();
    xhr.onload = function() {
      observer.onNext( xhr.responseText );
    };
  });
});

responseStream.subscribe( function(response) {
    document.documentElement.innerHTML = response;
});