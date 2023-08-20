const inquirer = require('inquirer');
const { Circle, Triangle, Square } = require('./lib/shapes');


function main() {
    const questions = [
        {
            type: 'input',
            name: 'text',
            message: 'Enter up to three characters for logo text:',
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter text color (keyword or hexadecimal):'
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape:',
            choices: ['circle', 'triangle', 'square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter shape color (keyword or hexadecimal):'
        }
    ];

    inquirer.prompt(questions).then(answers => {
        let shapeObj;
        switch (answers.shape) {
            case 'circle':
                shapeObj = new Circle(answers.shapeColor);
                break;
            case 'triangle':
                shapeObj = new Triangle(answers.shapeColor);
                break;
            case 'square':
                shapeObj = new Square(answers.shapeColor);
                break;
        }
    }).catch(error => {
        console.error("An error occurred:", error);
    });
}