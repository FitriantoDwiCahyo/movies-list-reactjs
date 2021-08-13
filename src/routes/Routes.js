import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoginRoute from "./LoginRoute";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/login/Register";
import ChangePassword from "../pages/user/ChangePassword";

import Movies from "../pages/movies/Movies";
import MovieDetail from "../pages/movies/MovieDetail";
import MovieList from "../pages/movies-menu/MovieList";
import MovieCreate from "../pages/movies-menu/MovieCreate";
import MovieEdit from "../pages/movies-menu/MovieEdit";

import Games from "../pages/games/Games";
import GameDetail from "../pages/games/GameDetail";
import GameList from "../pages/games-menu/GameList";
import GameCreate from "../pages/games-menu/GameCreate";
import GameEdit from "../pages/games-menu/GameEdit";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/movie">
                <Movies />
            </Route>
            <Route exact path="/movie/:id" component={MovieDetail}></Route>
            <Route exact path="/game">
                <Games />
            </Route>
            <Route exact path="/game/:id" component={GameDetail}></Route>

            <PrivateRoute exact path="/movie-menu">
                <MovieList />
            </PrivateRoute>
            <PrivateRoute exact path="/movie-menu/create">
                <MovieCreate />
            </PrivateRoute>
            <PrivateRoute
                exact
                path="/movie-menu/edit/:id"
                component={MovieEdit}
            ></PrivateRoute>

            <PrivateRoute exact path="/game-menu">
                <GameList />
            </PrivateRoute>
            <PrivateRoute exact path="/game-menu/create">
                <GameCreate />
            </PrivateRoute>
            <PrivateRoute
                exact
                path="/game-menu/edit/:id"
                component={GameEdit}
            ></PrivateRoute>

            <PrivateRoute exact path="/user/change-password">
                <ChangePassword />
            </PrivateRoute>
            <LoginRoute exact path="/login">
                <Login />
            </LoginRoute>
            <LoginRoute exact path="/register">
                <Register />
            </LoginRoute>

            
        </Switch>
    );
};

export default Routes;
