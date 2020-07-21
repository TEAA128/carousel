import React from 'react';
import axios from 'axios';
import Carousel from './Carousel.jsx';
import TopBar from './TopBar.jsx';
import LikeForm from './LikeForm.jsx';
import Modal from 'react-modal';
import styles from './styles.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      places: [],
      totalplaces: [],
      user: {},
      error: null,
      isLoaded: false,
      page: 1,
      listbuttonRender: 'default',
      saveToAListRender: 'false',
      likelistinput: '',
      clickedplace: {},
      enablesubmitbutton: false,
      modelOpen: false,
      currentUser: 1000000,
      currentZip: '94116',
      currentBeds: '15',
      currentPrice: '300'
    };

    this.createNewList = this.createNewList.bind(this);
    this.cancelCreateListButton = this.cancelCreateListButton.bind(this);
    this.submitCreateListbutton = this.submitCreateListbutton.bind(this);
    this.leftArrowClicked = this.leftArrowClicked.bind(this);
    this.rightArrowClicked = this.rightArrowClicked.bind(this);
    this.heartClicked = this.heartClicked.bind(this);
    this.exitLikeFormClicked = this.exitLikeFormClicked.bind(this);
    this.likeListOnChange = this.likeListOnChange.bind(this);
    this.listLikeToggle = this.listLikeToggle.bind(this);
    this.outsideModalClick = this.outsideModalClick.bind(this);

    this.serverUserPost = "http://localhost:3003/api/users";
    this.userIndex = 0;
  }

  componentDidMount(){
    axios.get('/api/places', {
      params: {
        zipCode: this.state.currentZip,
        beds_number: this.state.currentBeds,
        price: this.state.currentPrice
      }
    })
    .then((res)=>{
      const totalplaces = [...res.data].slice(0,12);
      const fourplaces = [...totalplaces].slice(0,4);
      this.setState({
        places: totalplaces,
        totalplaces: totalplaces
      })
    })
    .then( () => axios.get(`/api/users/${this.state.currentUser}`))
    .then((res) => {
      const currentUser = res.data[this.userIndex];
      this.setState({
        isLoaded: true,
        user: currentUser
      })
    })
  }


  //heart clicked
  heartClicked(place){
    this.setState({
      saveToAListRender: 'true',
      clickedplace: place,
      modelOpen: true
    })
  }

  outsideModalClick(e){
    let modalId = document.getElementById('modal');
    var isClickInside = modalId.contains(e.target);
    if (!isClickInside) {
      this.exitLikeFormClicked();
    }
  }

  //List form button interrupt
  exitLikeFormClicked(){
    this.setState({
      saveToAListRender: 'false',
      clickedplace: {},
      modelOpen: false
    })
  }

  createNewList(){
    this.setState({
      listbuttonRender: 'form'
    })
  }

  likeListOnChange(e){
    e.preventDefault();
    this.setState({
      likelistinput: e.target.value,
      enablesubmitbutton: true
    })
  }

  cancelCreateListButton(){
    this.setState({
      listbuttonRender: 'default'
    })
  }

  submitCreateListbutton(e){
    let obj = {
      user_id: this.state.user._id,
      place_id: this.state.clickedplace._id,
      list_name: this.state.likelistinput,
    }
    axios.post(`/api/users/${this.state.currentUser}`, obj)
    .then((res)=>{
      this.setState({
        likelistinput: '',
        listbuttonRender: 'default'
      })
    })
    .catch((e)=>{
      console.log(e);
    })
    .then( () => axios.get(`/api/users/${this.state.currentUser}`))
    .then((res) => {
      const currentUser = res.data[this.userIndex];
      this.setState({
        user: currentUser
      })
    })
    .catch((e)=>{
      console.log(e);
    })
    e.preventDefault();
  }

  listLikeToggle(e, singleList){
    if(singleList._id !== ''){
      //patch request
      let placeId = singleList.name;
      const obj = {
            like: singleList.like === true ? false: true,
            place_id: placeId
      }
      console.log('OBJ',obj)
      axios.patch(`/api/users/${this.state.currentUser}`, obj)
      .then((res)=>{
        console.log(res.status);
      })    .catch((e)=>{
        console.log(e);
      })
      .then( () => axios.get(`/api/users/${this.state.currentUser}`))
      .then((res) => {
        const currentUser = res.data[this.userIndex];
        this.setState({
          user: currentUser
        })
      })
      .catch((e)=>{
        console.log(e);
      })
      e.preventDefault();
    }else if(singleList._id === ''){
      let obj = {
        user_id: this.state.user._id,
        place_id: this.state.clickedplace._id,
        list_name: this.state.likelistinput || 'default',
      }
      console.log('ELSE IF OBJ', obj)
      axios.post(`/api/users/${this.state.currentUser}`, obj)
      .then((res)=>{
        console.log(res.status);
      })
      .catch((e)=>{
        console.log(e);
      })
      .then( () => axios.get(`/api/users/${this.state.currentUser}`))
      .then((res) => {
        const currentUser = res.data[this.userIndex];
        this.setState({
          user: currentUser
        })
      })
      .catch((e)=>{
        console.log(e);
      })
      e.preventDefault();
    }
  }

  //end of List form button interrupt

  //topbar onclick
  leftArrowClicked(){
    const scroller = document.getElementById('scroller');
    if(this.state.page === 2){
      scroller.scrollLeft = 0;
      this.setState({
        page: 1
      })
    }else if(this.state.page === 3){
      scroller.scrollLeft = 1120;
      this.setState({
        page: 2
      })
    }else if(this.state.page === 1){
      scroller.scrollLeft = 2240;
      this.setState({
        page: 3
      })
    }
  }

  rightArrowClicked(){
    const scroller = document.getElementById('scroller');
    if(this.state.page === 1){
      scroller.scrollLeft = 1120;
      this.setState({
        page: 2
      })
    }else if(this.state.page === 2){
      scroller.scrollLeft = 2240;
      this.setState({
        page: 3
      })
    }else if(this.state.page === 3){
      scroller.scrollLeft = 0;
      this.setState({
        page: 1
      })
    }
  }



  render () {
    const {error, isLoaded, places} = this.state;
    if(error) {
      return <div>Error: {error.message}</div>
    }else if(!isLoaded){
      return <div>loading...</div>;
    }else {
      return (
        <div className={styles.carouselwrap}>
            <LikeForm
            user={this.state.user}
            listbuttonRender={this.state.listbuttonRender}
            clickedplace = {this.state.clickedplace}
            enablesubmitbutton = {this.state.enablesubmitbutton}
            modelOpen = {this.state.modelOpen}
            createNewList={this.createNewList}
            cancelCreateListButton = {this.cancelCreateListButton}
            submitCreateListbutton = {this.submitCreateListbutton}
            exitLikeFormClicked = {this.exitLikeFormClicked}
            likeListOnChange = {this.likeListOnChange}
            listLikeToggle = {this.listLikeToggle}
            outsideModalClick = {this.outsideModalClick}
            />
          <div className={styles.wrapper}>
            <TopBar
              page={this.state.page}
              totalpage={3}
              leftArrowClicked={this.leftArrowClicked}
              rightArrowClicked={this.rightArrowClicked}/>
            <Carousel
              places={this.state.places}
              heartClicked = {this.heartClicked}
              likeplace = {this.state.user.likeplace} />
          </div>
        </div>

      )
    }

  }
}

export default App;