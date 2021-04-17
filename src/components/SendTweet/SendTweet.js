import React, { useState } from 'react';
// A module can only have one default export, but as many named exports as you'd like (zero, one, two, or many). You can import them all together like this: import A, { myA, Something } from './A'
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import ModalContainer from '../ModalContainer';
import FormSendTweet from '../FormSendTweet';
import {TWEETS_STORAGE} from '../../utils/constants';
import './SendTweet.scss';

export default function SendTweet(props) {
     const {setToastProps, allTweets} = props;
     const [isOpenModal, setIsOpenModal] = useState(false);
     let allTweetsArray = [];

     if (allTweets) {
          allTweetsArray = allTweets;
     }

     const openModal = () => {
          setIsOpenModal(true);
     }

     const closeModal = () => {
          setIsOpenModal(false);
     }

     const sendTweet = (event, formValue) => {
          event.preventDefault();
          const {name, tweet} = formValue;
          if (!name || !tweet) {
               setToastProps({
                    open: true, 
                    text: "Todos los campos son requeridos!"
               })
          } else {
               formValue.time = moment();
               allTweetsArray.push(formValue);
               localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweetsArray));
               setToastProps({
                    open: true, 
                    text: "Tweet guardado OK!"
               });
               closeModal();
          }
     }

     return (
       <div className="send-tweet">
          <Fab 
               className="send-tweet__open-form" 
               aria-label="add" 
               color="primary"
               onClick={openModal}>
                    <AddIcon/>
          </Fab>

          <ModalContainer isOpenModal={isOpenModal} 
               closeModal={closeModal}>
               <FormSendTweet 
                    sendTweet={sendTweet}/>
          </ModalContainer>
       </div>
     );
}