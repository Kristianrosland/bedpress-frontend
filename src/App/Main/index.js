import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../../utils/firebase';

class Main extends Component {
  render() {

    // print companies
    db.collection("presentations").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data().company);
        });
      })

    return (
      <div>
        <p> YES </p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
