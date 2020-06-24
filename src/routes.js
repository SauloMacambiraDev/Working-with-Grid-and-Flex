const router = require('express').Router();
const axios = require('axios')

router.get('/', async (req,res,next) => {
    try {
        return res.render('index', { test: 'hello world', style: 'index.css' })
    } catch (error) {
        return res.render('index', { error })
    }
})

router.get('/customCheckboxes', async (req,res,next) => {
    try {
        const response = await axios.get(`https://swapi.dev/api/people/`)
        const characters = response.data.results.map(c => {
                return c.name;
        })

        // Getting an API from star wars
        return res.render('customCheckbox', { style: 'customCheckbox.css', characters })
    } catch (error) {
        return res.render('customCheckbox', {error})
    }
})

router.post('/starwarsresult', async (req,res,next) => {
    try {
        const { classifications } = req.body;

        const response = await axios.get(`https://swapi.dev/api/people/`)
        const characters = response.data.results.map(c => {
                return c.name;
        })

        console.log(classifications)

        return res.redirect('customCheckbox', 
        { 
          style: 'customCheckbox.css', 
          payload: payload, 
          characters: characters 
        })
    } catch (error) {
        console.log(error)
        return res.redirect('customCheckbox', {style: 'customCheckbox.css'})
    }
})

module.exports = router;