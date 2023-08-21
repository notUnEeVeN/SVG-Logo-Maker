const fs = require("fs");
const inquirer = require("inquirer");
//importing the cirlce triangle and square svg code from our shapes.js
const { Circle, Triangle, Square } = require("./lib/shapes");

function main() {
  //this is using the inquirer package to add interactivity to the terminal
  const questions = [
    {
      //input questions take strings as answers
      type: "input",
      name: "text",
      message: "Enter up to three characters for logo text:",
      //checking to make sure the user doesn't input any string larger than 3 
      validate: function (value) {
        if (value.length <= 3) {
            return true;
        }
        return 'Please enter up to three characters only!';
    }
    },
    {
      type: "input",
      name: "textColor",
      message: "Enter text color (keyword or hexadecimal):",
    },
    {
      //list type questions allow the user to select their answer from a list with the arrow and enter keys
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
    //using the .then property to wait for the users answers, THEN execute the corresponding class extension in the shapes.js page
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
      //here we build the svg file with the information that will remain constant regardless of the color/shape, and everything that depends on user input is filled in by the methods
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
//using fs to write the file based on our svgContent data
      fs.writeFileSync("logo.svg", svgContent);
      console.log("Generated logo.svg");
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

main();
