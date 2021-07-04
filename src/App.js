import React, {useState, useEffect, Suspense} from 'react';
import {auth, firestore} from './firebase';
import {withRouter, Switch, Route} from 'react-router-dom';

import './App.css';

const LogIn = React.lazy(() => import('./containers/logIn/login'));
const CreateAccount = React.lazy(() => import('./containers/createAccount/account'));
const Wall = React.lazy(() => import('./containers/wall/wall'));
const EditProfile = React.lazy(() => import('./containers/editProfile/editProfile'));
const Message = React.lazy(() => import('./containers/message/message'));

const App = (props) => {

  const [signIn, setSignIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setSignIn(true);
        setUser(user.uid);
        props.history.push("/singles");
        firestore.collection("users").doc(user.uid)
        .onSnapshot((doc) => {
            console.log("Current data: ", doc.data());
            setUserData(doc.data());
        });
      } else {
        setSignIn(false);
        props.history.push("/singles/login");
      }
    })
  }, []);
  console.log(userData);
  return (
    <div className="App font-primery">
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route exact path="/singles/login" component={LogIn} />
          <Route exact path="/singles/creataccount" component={CreateAccount} />
          <Route exact path="/singles" render={(props) => (<Wall {...props} user={user} userData={userData} />) } />
          <Route exact path="/singles/:nav" render={(props) => (<Wall {...props} user={user} userData={userData} />) } />
          <Route exact path="/singles/profile/:profile/:section" render={(props) => (<Wall {...props} user={user} userData={userData} />) } />
          <Route exact path="/singles/message/chatRoom" render={(props) => <Message {...props} uid={user} user={userData} />} />
          <Route exact path="/singles/message/chatRoom/:chatId" render={(props) => <Message {...props} uid={user} user={userData} />} />
          <Route exact path="/singles/edit-profile/:categories" render={(props) => (<EditProfile {...props} user={user} userData={userData} />)} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default withRouter(App);