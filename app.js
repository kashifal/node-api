// app.js
const express = require('express');
const morgan = require("morgan");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(morgan());


app.get("/", async (req, res) => {
    res.json({
        message: "Hello, world"
    })
})

app.post('/api/proxy/contacts', async (req, res) => {
    console.log(req.body);
    const { email, locale, tags,calorie } = req.body;

    // Validate that required fields are present
    if (!email || !locale) {
        return res.status(400).json({ message: "Invalid request body. Ensure email and locale are provided." });
    }

    const options = {
        method: 'POST',
        url: 'https://api.systeme.io/api/contacts',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'X-API-Key': '2gm12c714u8aev7cwp80mmfnoo6u2whvcxdl90foxccms5ouesdtri33ubexon7m'
        },
        data: {
            email,
            locale: locale || 'en',
            tags:tags,
            calorie:calorie
        }
    };

    try {
        const response = await axios(options);
        return res.json(response.data);
    } catch (error) {
        console.error("Error creating contact:", error);
        return res.status(error.response?.status || 500).json({ message: "Error creating contact", error: error.message ?? "No Error" });
    }
});
app.listen(3001, () => {
    console.log('wow')
})
