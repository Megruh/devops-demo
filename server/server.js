const express = require('express')
const path = require('path')

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '6c03e3cd7c1a43b991aaa1a5ad6d5d3b',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Listening on port ${port}`))
