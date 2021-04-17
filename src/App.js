import React, { useEffect, useState } from 'react';
import { Container, Snackbar  } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Header from './components/Header';
import SendTweet from './components/SendTweet';
import {TWEETS_STORAGE} from './utils/constants';
import ListTweets from './components/ListTweets/ListTweets';

function App() {
  const [toastProps, setToastProps] = useState({
    open: false,  
    text: null
  });

  const [allTweets, setAllTweets] = useState([]);
  const [reloadTweets, setReloadTweets] = useState(false);

  useEffect(() => {
    const tweetsStorage = localStorage.getItem(TWEETS_STORAGE);
    const tweetsArray =  JSON.parse(tweetsStorage);
    setAllTweets(tweetsArray);
    setReloadTweets(false);
  }, [reloadTweets]);

  useEffect(() => {
    if (toastProps.open) {
      setTimeout(() => {
        setToastProps({
          open: false,
          text: null
        })
      }, 5000)
    }
  }, [toastProps]);

  const deleteTweet = (index) => {
    allTweets.splice(index, 1);
    setAllTweets(allTweets);
    localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweets));
    setReloadTweets(true);
  }

  const PersistentSnackbar = React.forwardRef(
    (props, ref) => (
      <Snackbar 
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={props.open}>
          <Alert severity={props.severity}>
            {props.text}
          </Alert>
      </Snackbar>
    )
  )

  return (
    <Container className="tweets-simulator" maxWidth={false}>
        <Header />
        <SendTweet setToastProps={setToastProps} allTweets={allTweets}/>

        <PersistentSnackbar 
          toastProps={toastProps}
        />
        <ListTweets 
          allTweets={allTweets}
          deleteTweet={deleteTweet}/>
    </Container>
  );
}

export default App;
