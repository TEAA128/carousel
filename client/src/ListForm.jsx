import React from 'react';
import styles from './styles.css';


const ListForm = ({listButtonRender,createNewList, cancelCreateListButton, submitCreateListbutton, likeListOnChange, enablesubmitbutton}) =>{
  if(listButtonRender === 'form'){
    return(
      <div className={styles.likelistformdivfirst}>
        <form onSubmit={(e)=>submitCreateListbutton(e)}>
          <label>
            <div className={styles.likelistformName}>Name</div>
            <div className={styles.likelistforminputdiv}>
            <input
              className={styles.likelistforminput}
              name="ListName"
              placeholder="Ex. Summer Vacation"
              onChange = {(e)=>likeListOnChange(e)}
              required/>
            </div>
            <div className={styles.likelistformbuttondiv}>
              <div className={styles.likelistformbuttoncanceldiv}>
                <input className={styles.likelistformbuttoncancel} type="button" name="cancel" value="Cancel" onClick={()=>cancelCreateListButton()}></input>
              </div>
              <input className={styles.likelistformbuttonsubmit} disable={!enablesubmitbutton ? 'false' : 'true'} type="submit" name="submit" value="Create" ></input>
            </div>
          </label>
        </form>
      </div>
    )
  }else{
    return(
      <div className={styles.CreateNewListDiv}>
        <div className={styles.CreateNewList} onClick={()=>createNewList()}>
          Create a new list
        </div>
      </div>
    )
  }
}

export default ListForm;