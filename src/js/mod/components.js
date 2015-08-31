/* jshint node: true */

var React = require( 'react' ),
    Reflux = require( 'reflux' )
;

// var TextInput = React.createClass({
//   displayName: 'TextInput',

//   componentDidMount: function() {
//     this
//   },

//   render: function() {
//     return React.createElement( 'div', { className: 'text-input' },
//       React.createElement( 'label', { className: 'text-input-label' }, this.props.label,
//         React.createElement( 'input', { className: 'text-input-field', type: 'text' } )
//       )
//     );
//   }
// });

// var CommentForm = React.createClass({
//   render: function() {
//     return React.createElement( 'form', { className: 'comment-form' },
//       React.createElement( TextInput, { label: 'This is the label' } )
//     );
//   }
// });

var DisplayCount = React.createClass({
  componentDidMount: function() {
    this.unsubscribe = countStore.listen( this.onCountChange );
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  onCountChange: function( count ) {
    this.setProps({
      count: count
    });
  },

  render: function() {
    return React.createElement( 'div', null,
      'Counts: ',
      this.props.count
    );
  }
});

var countUpdate = Reflux.createAction({
  count: { children: [ 'aa' ]}
});

var countStore = Reflux.createStore({
  init: function() {
    this.count = 0;

    this.listenTo( countUpdate, this.output );
  },

  output: function( countType ) {
    if ( countType === 'increment' ) {
      this.trigger( ++this.count );
    } else {
      this.trigger( --this.count );
    }
  }
});

var IncrementButton = React.createClass({
  componentDidMount: function() {
    this.getDOMNode().addEventListener( 'click', this.handleClick );
  },

  componentWillUnmount: function() {
    this.getDOMNode().removeEventListener( 'click', this.handleClick );
  },

  handleClick: function() {
    countUpdate.trigger( 'increment' );
  },

  render: function() {
    return React.createElement( 'button', null, 'increment' );
  }
});

var View = React.createElement('div', null, 
  DisplayCount,
  IncrementButton
);