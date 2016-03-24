import style from './styles/';
import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';

class ColorData extends React.Component {

  constructor() {
    super();
    this.state = {
      color: "", 
      backgroundColor: ""
    }

    this.ref = new Firebase('https://color-binding.firebaseio.com/');
  }

  componentDidMount() {
    this.ref.on('value', (snapshot) => {
      this.setState({
        color: snapshot.val().color,
        backgroundColor: snapshot.val().backgroundColor
      })
    });
  }

  _handleSave(){
    this.ref.update({
      color: this.state.color,
      backgroundColor: this.state.backgroundColor,
    })       
    console.log('handle change');
  }

  _handleColorChange(event){
    this.ref.update({ color: event.target.value })       
    console.log('_handleColorChange');
  }

  _handleBgChange(event){
    this.ref.update({ backgroundColor: event.target.value })       
    console.log('_handleBgChange');
  }

  render() {
    let divStyles = {
      color: this.state.color, 
      backgroundColor: this.state.backgroundColor
    }

    return (
      <div>
        <input id="color" type="text" ref="color" defaultValue={this.state.color} onChange={this._handleColorChange.bind(this)} />
        <input id="backgroundColor" type="text" ref="backgroundColor" defaultValue={this.state.backgroundColor} onChange={this._handleBgChange.bind(this)}/>
        <button onClick={this._handleSave.bind(this)}>Save</button>
        <div style={{color: this.state.color, backgroundColor: this.state.backgroundColor}}>This is a preview</div>
      </div>
    );
  }

}

var mountPoint = document.querySelector('#app');
ReactDOM.render(<ColorData/>, mountPoint);
