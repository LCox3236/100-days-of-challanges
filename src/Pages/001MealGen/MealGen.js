import React, { useState, useEffect } from "react";
import "./MealGen.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function MealGen() {
  const [isMealPresent, setIsMealPresent] = useState(false);
  const [mealDisplayData, setMealDisplayData] = useState({});
  const [ingredientData, setIngredientData] = useState([]);

  function generateMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((result) => result.json())
      .then((result) => createMealDisplay(result.meals[0]));
  }

  function createMealDisplay(mealData) {
    console.log(mealData);
    var ingredients = [];
    for (var i = 1; i < 20; i++) {
      if (mealData[`strIngredient${i}`]) {
        ingredients.push(
          `${mealData[`strIngredient${i}`]} - ${mealData[`strMeasure${i}`]}`
        );
      }
    }

    setIngredientData(ingredients);
    setMealDisplayData(mealData);
    setIsMealPresent(true);
  }

  useEffect(() => {
    console.log(mealDisplayData);
  }, [mealDisplayData]);

  function DisplayMeal(props) {
    if (props.isMealPresent == false) {
      return;
    }
    document.getElementById("mealGen-page-container").style.justifyContent =
      "normal";
    return (
      <Container id="meal-display-container">
        <Row id="meal-info-display">
          <Col id="left-column">
            <img id="meal-image" src={mealDisplayData.strMealThumb} />
            <div>
              <strong>Category: </strong>
              {mealDisplayData.strCategory}
            </div>
            <div>
              <strong>Area: </strong>
              {mealDisplayData.strArea}
            </div>
            {mealDisplayData.strTags ? (
              <div id="meal-tags">
                <strong>Meal Tags: </strong>
                {mealDisplayData.strTags.split(",").join(", ")}
              </div>
            ) : (
              ""
            )}
            <div id="meal-ingredients">
              <strong>
                <h2>Ingredients:</h2>
              </strong>
              {ingredientData.map((ingredient) => (
                <li>{ingredient}</li>
              ))}
            </div>
          </Col>
          <Col sm={8} id="right-column">
            <h1 id="meal-header">{mealDisplayData.strMeal}</h1>

            <div id="meal-instructions">{mealDisplayData.strInstructions}</div>
          </Col>
        </Row>

        {mealDisplayData.strYoutube ? (
          <Row id="meal-video-display">
            <h3 id="">Recipe Video</h3>
            <iframe
              width="420"
              height="315"
              src={`https://www.youtube.com/embed/${mealDisplayData.strYoutube.slice(
                -11
              )}`}
            ></iframe>
          </Row>
        ) : (
          ""
        )}
      </Container>
    );
  }

  return (
    <div id="mealGen-page-container">
      <button id="generate-button" onClick={generateMeal}>
        Generate Meal
      </button>
      <DisplayMeal isMealPresent={isMealPresent} />
    </div>
  );
}
