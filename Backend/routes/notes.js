const express = require('express')
const router = express.Router()
const NotesController = require('../controllers/notesController')
const Authentication = require('../Middleware/authentication')

router.get('/', (req, res) => { res.json('Notes Routing') })

router.post('/addNote', Authentication, NotesController.addNote)
router.get('/getNotes', Authentication, NotesController.getNotes)
router.put('/updateNote/:noteId', Authentication, NotesController.updateNote)
router.delete('/deleteNote/:noteId',Authentication,NotesController.deleteNote)

module.exports = router