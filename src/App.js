import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  NavLink,
  BrowserRouter,
  Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import MealGen from "./Pages/001MealGen/MealGen";
import MoodCal from "./Pages/002MoodCal/MoodCal";
import InsectGame from "./Pages/003InsectGame/InsectGame";
import Profile from "./Pages/004Profile/Profile";
import Pokedex from "./Pages/005Pokedex/Pokedex";
export default function App() {
  const projects = [
    // {
    //   nr: "000",
    //   displayName: "",
    //   element: "",
    //   path: "/Pages/",
    // },
    {
      nr: "001",
      displayName: "Random Meal Generator",
      element: <MealGen />,
      path: "/Pages/001MealGen/MealGen",
    },
    {
      nr: "002",
      displayName: "2019 Mood Calendar",
      element: <MoodCal />,
      path: "/Pages/002MoodCal/MoodCal",
    },
    {
      nr: "003",
      displayName: "Insect Game",
      element: <InsectGame />,
      path: "/Pages/003InsectGame/InsectGame",
    },
    {
      nr: "004",
      displayName: "User Profile Design",
      element: <Profile />,
      path: "/Pages/004Profile/Profile",
    },
    {
      nr: "005",
      displayName: "Pokedex",
      element: <Pokedex />,
      path: "/Pages/005Pokedex/Pokedex",
    },
  ];

  const routeComponents = projects.map(({ displayName, path, element }) => (
    <Route key={displayName} path={path} element={element} />
  ));

  function hideRoutesDisplay() {
    var routesDiv = document.getElementById("routes-list-container");
    routesDiv.style.display = "none";
  }

  function showRoutesDisplay() {
    var routesDiv = document.getElementById("routes-list-container");
    routesDiv.style.display = "flex";
  }

  function toggleRoutesDisplay() {
    var routesDiv = document.getElementById("routes-list-container");
    if (routesDiv.style.display === "none") {
      routesDiv.style.display = "flex";
    } else {
      routesDiv.style.display = "none";
    }
  }

  return (
    <div>
      <BrowserRouter>
        <main>
          <nav>
            <ul>
              <li>
                <Link to="/" id="home-link" onClick={showRoutesDisplay}>
                  Home
                </Link>
              </li>
              <li>
                <button id="toggle-routes-button" onClick={toggleRoutesDisplay}>
                  <AiOutlineMenu id="test" />
                </button>
              </li>
            </ul>
          </nav>
        </main>
        <div id="routes-list-container">
          {projects.map((project) => {
            return (
              <Link
                onClick={hideRoutesDisplay}
                className="route-container"
                key={project.nr}
                to={project.path}
              >
                {project.displayName}

                <img
                  className="route-image"
                  src="https://picsum.photos/200"
                  alt="placeholder image"
                />
              </Link>
            );
          })}
        </div>
        <Routes>
          <Route index element={<div></div>} />
          {routeComponents}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
