const Notes = require('../models/Notes')

const notes = {}

// add notes

notes.addNote = async (req, res) => {
    try {
        let data = req.body
        let userid = req.user.id
        const note = await Notes.create({
            user: userid,
            title: data.title,
            description: data.description,
            tag: data.tag
        })
        res.status(200).json(note)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })

    }
}

// get all notes

notes.getNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        if (!notes) {
            return res.status(500).json({ message: "User have no notes added" })
        }
        res.status(200).json(notes)


    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })

    }
}

// update Notes

notes.updateNote = async (req, res) => {
    try {
        const data = req.body
        const userId = req.user.id
        const noteId = req.params.noteId
        let exist = await Notes.findById(noteId)
        if (!exist) {
            return res.status(404).json({ error: "No such note exist" })
        }
        if (exist.user != userId) {
            return res.status(401).json({ error: "Invalid access" })
        }
        let upd = await Notes.findByIdAndUpdate(noteId, data, { new: true })
        if (upd) {
            res.status(200).json({ message: "Note updated successfully", NewNote: upd })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })

    }
}

// delete Note

notes.deleteNote = async (req, res) => {
    try {

        let userId = req.user.id
        let noteId = req.params.noteId
        let exist = await Notes.findById(noteId)
        if (!exist) {
            return res.status(404).json({ message: "No Note exist" })

        }
        if (exist.user != userId) {
            return res.status(401).json({ message: "Invalid access you cannot delete this note" })
        }
        let del = await Notes.findByIdAndDelete(noteId)
        if (del) {
            res.status(200).json({ message: "Note deleted successfully" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })

    }
}
module.exports = notes