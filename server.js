let express = require('express');  //Linking express
let app = express();  
const PORT = process.env.PORT || 5000;  // must be change to put on heroku


let calculatorHistory = []; //store caclulation history

let bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));  //serve static files

// send updated log of calculations
app.get('/calculation', (req, res) => {
    console.log('Request calculation app.get');  
    res.send(calculatorHistory)
});

//clear all stored data 
app.delete('/calculation', (req, res) => {            
    calculatorHistory = [];
    res.sendStatus(200); 
});

// receive calculator inputs
app.post('/calculation', (req, res) => {
    console.log(req.body);
    calculator(req.body);
    res.sendStatus(201);
})

//calculate user input
function calculator(calc) {         
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