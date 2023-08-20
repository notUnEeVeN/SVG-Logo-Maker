const fs = require("fs");
const inquirer = require("inquirer");
//importing the cirlce triangle and square svg code from our shapes.js
const { Circle, Triangle, Square } = require("./lib/shapes");

function main() {
  const questions = [
    {
      type: "input",
      name: "text",
      message: "Enter up to three characters for logo text:",
    },
    {
      type: "input",
      name: "textColor",
      message: "Enter text color (keyword or hexadecimal):",
    },
    {
      type: "list",
      name: "shape",
      message: "Choose a shape:",
      choices: ["circle", "triangle", "square"],
    },
    {
      type: "input",
      name: "shapeColor",
      message: "Enter shape color (keyword or hexadecimal):",
    },
  ];

  inquirer
    .prompt(questions)
    .then((answers) => {
      let shapeObj;
      switch (answers.shape) {
        case "circle":
          shapeObj = new Circle(answers.shapeColor);
          break;
        case "triangle":
          shapeObj = new Triangle(answers.shapeColor);
          break;
        case "square":
          shapeObj = new Square(answers.shapeColor);
          break;
      }
      // declaring a default fontsize and position that changes on if the selected shape is a triangle, because if I have a default size
      //the letters overlap and stick out of the triangle
      let fontSize = 60;
      let textYPosition = 125;

      if (answers.shape === "triangle") {
        fontSize = 45;
        textYPosition = 140;
      }

      const svgContent = `
<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  ${shapeObj.render()}
  <text x="150" y="${textYPosition}" font-size="${fontSize}" text-anchor="middle" fill="${
        answers.textColor
      }">
    ${answers.text}
  </text>
</svg>
`;

      fs.writeFileSync("logo.svg", svgContent);
      console.log("Generated logo.svg");
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

main();
