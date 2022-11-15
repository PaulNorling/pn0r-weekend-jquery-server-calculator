let express = require('express');  //Linking express
let app = express();  
const PORT = process.env.PORT || 5000;  // must be change to put on heroku


let calculatorHistory = []; //store caclulation history

let bodyParser = require('body-parser');  //magic

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));  //serve static files

app.get('/calculation', (req, res) => {
    console.log('Request calculation app.get');  // send updated back log of calculations

    res.send(calculatorHistory)
});

app.delete('/calculation', (req, res) => {   //clear all stored data          
    calculatorHistory = [];
    res.sendStatus(200); 
});

app.post('/calculation', (req, res) => {
    console.log(req.body);
    calculator(req.body);
    res.sendStatus(201);
})

function calculator(calc) {         //calculate user input
    let answer = 0;
    console.log('in calculator' , calc.operator);
    switch (calc.operator) {
        case ('-') : 
            calc.answer = +(calc.numberOne) - +(calc.numberTwo);
            break;
        case ('+') :
            calc.answer = +(calc.numberOne) + +(calc.numberTwo);
            break;
        case ('/') :
            calc.answer = +(calc.numberOne) / +(calc.numberTwo);
            break;
        case ('*') :
            calc.answer = +(calc.numberOne) * +(calc.numberTwo);
            break;
    }

    calculatorHistory.push(calc);
    console.log(calculatorHistory);
}

app.listen(PORT, () => {
    console.log('listening on port:', PORT)
});