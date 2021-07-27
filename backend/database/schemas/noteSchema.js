import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Note = new Schema({
    title: String,
    noteMsg: String,
    link: {
        type: String,
        unique: true,
    },
});

const NoteSchema = mongoose.model('notes', Note);

export default NoteSchema;