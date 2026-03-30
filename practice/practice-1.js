import express from 'express';

const app = express(); // creating app
app.use(express.json()); // to accept json in request

const port = 3000; // port number

let users = []; // database

app.post('/register', (request, response) => {

    const user = request.body;

    const {name, email, password} = user;

    users.push({ name, email, password });

    response.json({
        message: "User is created",
        user: {
            name, email
        }
    });
});

app.post('/login', (request, response) => {
    const user = request.body;

    const {email, password} = user;

    const userFound = users.find((user)=>{
        return user.email === email && user.password === password
    });

    if(userFound){
        return response.json({
            message: "User logged in!",
            user: {
                name: userFound.name,
                email: userFound.email
            }
        });
    }

    response.json({
        message: "User not found! Please register first!",
    });
})

app.delete('/delete/:email', (request, response) => {
    const {email} = request.params;

    const usersRemaining = users.filter((user)=> user.email !== email);

    users = usersRemaining;

    response.json({
        message: "User is deleleted"
    })
});

app.get('/all-users', (_request, response) => {
    response.json({
        message: "Users found!",
        users
    })
});

app.get('/user/:email', (request, response) => {
    const {email} = request.params;

    const userFound = users.find((user)=>{
        return user.email === email;
    });

    if(userFound){
        return response.json({
            message: "User found!",
            user: {
                name: userFound.name,
                email: userFound.email
            }
        });
    }

    response.json({
        message: "User not found!",
    })
    
});

app.listen(port, ()=>{
    console.log(`Server is listning at port ${port}`);
});
