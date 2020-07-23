import React from 'react';
import styles from './styles.css';

const Place = ({place, heartClicked, likeplace}) => {
  const superhostRender = () =>{
    if(place.superhost === true){
      return (
        <span className={styles.superhost}> superhost </span>
      )
    }
  }

  const placetype = () => {
    return(
      <div className={styles.placetype}>
        {place.type}
        <span className={styles.placedot}>·</span>
        {place.bed}
      </div>
    )

  }

  const checkLikePlace = () => {
    let result = false;
    let placeId = place._id;
    for(let i=0;i<likeplace.length;i++){
      if(likeplace[i].name === place._id && likeplace[i].like === true){
        result = result || true;
      }
    }
    if(result){
      return styles.heartYesLike
    }else{
      return styles.heartNoLike
    }

  }

  const ratingRender = ()=>{
    if(place.rating !== undefined){
      return (
          <span>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.placerating}> {place.rating} </span>
            <span className={styles.placereview}>&nbsp;({place.totalReview})</span>
          </span>
      )
    }
  }
  const id = place._id;
  return (
    <li className={styles.listli}>
      <div className={styles.container}>
        <div className={styles.flexbox_container}>
          <img
            className={styles.placeimg}
            src="./default.jpg"
            // src={place.picture}
            width="265"
            height="177" />
          <a className={styles.imgsrc} href={place.src} />
          <button className={styles.heartbutton} onClick={()=>heartClicked(place)}>
            <div className={styles.heartTextFix}>
              <svg className={checkLikePlace()} viewBox="0 0 32 32">
                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
              </svg>
            </div>
          </button>

        </div>
        <div className={styles.firstlinetext}>
          {superhostRender()} {placetype()} {ratingRender()}
        </div>
        <div className={styles.placetext}>
          {place.title}
        </div>
        <div className={styles.placepricediv}>
          <span className={styles.placeprice}>${place.price}</span> / night
        </div>
      </div>
    </li>
  )
}

export default Place;

