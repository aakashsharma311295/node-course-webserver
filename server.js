const express = require("express");
const app = express();
const hbs = require("hbs");
const fs = require("fs");



app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url} `;
    console.log(log);
    fs.appendFileSync("server.log", log + '\n');
    next();

})

// app.use((req,res,next) =>{
//     res.render("maintainence.hbs")
// });

hbs.registerPartials(__dirname + "/views" + "/partials")
hbs.registerHelper("currentYear", () => new Date().getFullYear());
hbs.registerHelper("screamIt", (text) => text.toUpperCase());

app.set("view engine", "hbs");
app.use(express.static(__dirname));



app.get('/', (req, res) => {
    // res.send("<h1>hello world!++</h1>");
    // res.send({
    //     name:"aakash",
    //     likes:["movies",
    //     "eating"]

    // })
    res.render("home.hbs", {
        pagetitle: "HomePage",
        WelcomeMessage: "welcome to homepage",
        other: "hiiamthere"
        // currentYear: new Date().getFullYear()
    });
});
app.get("/about", (req, res) => {
    // res.send("<h2>about page</h2>")
    res.render("about.hbs", {
        pagetitle: "AboutPage",
        // currentYear: new Date().getFullYear()
    });
});
app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "unable to handle request"
    });
})



app.listen(3000, () => console.log("server is up on 3000 port"));