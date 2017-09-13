// Request.
const request = require('request')

// Express.
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/', function (req, res) {
    res.send()
})

app.post('/', function (req, res) {
    if (typeof(req.body.text) !== 'undefined') {
        var text = req.body.text.substr(7)

        var query = {
            api_key: process.env.GIPHY_API_KEY,
            q: text
        }

        request({url: 'http://api.giphy.com/v1/gifs/search', qs: query}, function(err, response, body) {
            var data = JSON.parse(body)

            if (!err && response.statusCode == 200) {
                var rand = Math.floor(Math.random() * 25)

                if (typeof(data.data[rand]) !== 'undefined') {
                    var item = data.data[rand]
                    res.send(item)
                }

                // Error if item isn't present.
                else {
                    res.send('Error, item is missing.')
                }
            }

            else {
                // Print error message if present.
                if (typeof(data.message) !== 'undefined') {
                    res.send(data.message)
                }
            }
        })
    }
})

app.listen(3000, function () {
    console.log('Server running on http://localhost:3000')
})
