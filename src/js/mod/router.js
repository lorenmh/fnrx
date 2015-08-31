/* jshint node: true */

var Rx = require( 'rx' )
;

var EVENT_TYPE = "hashchange",
    ELEMENT = window,
    PATH_DELIMITER = '/',
    QS_START = '?',
    QS_DELIMITER = '&',
    QS_VALUE_DELIMITER = '='
;

var routeStream = Rx.Observable.create( function( observer ) {
  function eventListener( e ) {
    observer.onNext( e );
  }

  ELEMENT.addEventListener( EVENT_TYPE, eventListener );

  return function() {
    ELEMENT.removeEventListener( EVENT_TYPE, eventListener );
  };
});

function getPaths( newUrl ) {
  var indexOfHash = newUrl.indexOf( '#' ),
      hash = ( indexOfHash > -1 ) ? newUrl.substr( indexOfHash ) : '',
      indexOfQueryStrings = hash.indexOf( QS_START ),
      queryString = ( indexOfQueryStrings > -1 ) ? hash.slice( indexOfQueryStrings + 1 ) : '',
      cleanedHash = ( indexOfQueryStrings > -1 && hash.length > 0 ) ? hash.slice( 1, indexOfQueryStrings ) : hash.slice( 1 ),
      pathList,
      queryStringList
  ;

  pathList = (function( pathString ) {
    var lastSlice = 0,
        length = pathString.length,
        paths = [],
        j,
        currentChar
    ;

    for ( j = 0; j < length; j++ ) {
      if ( pathString[ j ] === PATH_DELIMITER ) {
        paths.push( pathString.slice( lastSlice, j + 1 ) );
        lastSlice = j + 1;
      } else if ( j === length - 1 ) {
        paths.push( pathString.slice( lastSlice, length ) );
      }
    }

    return paths;

  })( cleanedHash );

  queryStringList = (function( string ) {
    if ( !string.length ) { return []; }
    return (
      string
        .split( QS_DELIMITER )
        .map(
          function( qsKeyValue ) {
            return qsKeyValue.split( QS_VALUE_DELIMITER );
          }
        )
    );
  })( queryString );
    

  return {
    path: pathList,
    queryStrings: queryStringList
  };
}

  

module.exports = routeStream;
