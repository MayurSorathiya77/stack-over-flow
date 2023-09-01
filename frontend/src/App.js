

import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import StackOverflow from './components/StackOverflow/index';
import Question from './components/Add-Question/Question';
import ViewQuestion from './components/ViewQuestion/index';
import Auth from './components/Auth/index';
import Tags from './components/Tag/index';
import Users from './components/User/index';

import './App.css';
import { auth } from './firebase';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Use conditional rendering for protected routes */}
        <Route
          exact
          path="/"
          element={user ? <StackOverflow /> : <Auth />}
        />
        <Route
          exact
          path="/tag"
          element={user ? <Tags /> : <Auth />}
        />
        <Route
          exact
          path="/users"
          element={user ? <Users /> : <Auth />}
        />
        
        
        <Route
          exact
          path="/add-question"
          element={user ? <Question /> : <Auth />}
        />
        <Route
          exact
          path="/question"
          element={user ? <ViewQuestion /> : <Auth />}
        />
        <Route exact path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
