import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../authentication/auth";
// pages for this product
import Dashboard from "./views/Dashboard/Dashboard.js";
import Login from "./views/Login/Login.js";
import Register from "./views/Register/Register.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import MovieDetail from "./views/MovieDetail/MovieDetail"
import Favorite from "./views/Favorite/Favorite"

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(Dashboard, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
          <Route exact path="/favorite" component={Auth(Favorite, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;