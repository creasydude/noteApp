import express from 'express';
const Router = express.Router();
import noteSchema from '../database/schemas/noteSchema.js'
import generateLink from '../linkGenerator.js'

Router.get('/', (req,res) => {
    res.status(403).json({message: "403 Forbidden Page !"})
});

Router.get('/:id', async (req,res) => {
    if(await noteSchema.findOne({link : req.params.id}) !== null) {
        res.status(200).json(await noteSchema.findOne({link : req.params.id}))
    }else {
        res.status(404).json({message: "404 Not Found!"})
    }
});

Router.post('/', async (req,res) => {
    const newNote = new noteSchema({
        title : req.body.title,
        noteMsg: req.body.noteMsg,
        link: await generateLink(),
    })
    try {
        const savedNote = await newNote.save()
        res.json(savedNote)
    } catch(err) {
        res.status(400).json({message: err})
    }
});


export default Router;