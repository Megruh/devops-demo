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

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

//app.use(express.static(path.join(__dirname, '../public')))


let students = []

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName=> studentName === name)

    if (name === 'Meg'){
    rollbar.critical('Meg is not a student')
    res.status(400).send('Enter a different name')
    } else if (name === 'Tyler'){
    rollbar.info('Tyler is partners with Meg')
    res.status(400).send('You need a new')
    }else if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Meg', type: 'manual entry'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.warning('student already exists')
        res.status(400).send('that student already exists')
    }
    //app.post('/api/student', (req, res) => {
    //     try {
    //         nonExistentFunction();
    //       } catch (error) {
    //         console.error(error)
    //       }
    
    // })

})


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/styles.css'))
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Listening on port ${port}`))
