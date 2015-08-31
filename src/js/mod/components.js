/* jshint node: true */

var React = require( 'react' ),
    Reflux = require( 'reflux' )
;

var DisplayCount = React.createClass({
  getInitialState: function() {
    return {
      count: countStore.count
    };
  },

  componentDidMount: function() {
    this.unsubscribe = countStore.listen( this.onCountChange );
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  onCountChange: function( count ) {
    this.setState({
      count: count
    });
  },

  render: function() {
    return React.createElement( 'div', null,
      'Counts: ',
      this.state.count
    );
  }
});

var countActions = Reflux.createActions([
  'increment',
  'decrement'
]);

var countStore = Reflux.createStore({
  init: function() {
    this.count = 0;

    this.listenTo( countActions.increment, this.increment );
    this.listenTo( countActions.decrement, this.decrement );
  },

  increment: function() {
    this.trigger( ++this.count );
  },

  decrement: function() {
    this.trigger( --this.count );
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
    countActions.increment();
  },

  render: function() {
    return React.createElement( 'button', null, 'increment' );
  }
});

var DecrementButton = React.createClass({
  componentDidMount: function() {
    this.getDOMNode().addEventListener( 'click', this.handleClick );
  },

  componentWillUnmount: function() {
    this.getDOMNode().removeEventListener( 'click', this.handleClick );
  },

  handleClick: function() {
    countActions.decrement();
  },

  render: function() {
    return React.createElement( 'button', null, 'decrement' );
  }
});

React.render(
    React.createElement('div', null,
      React.createElement( DisplayCount ),
      React.createElement( IncrementButton ),
      React.createElement( DecrementButton )
    ),
    document.getElementById('container')
);