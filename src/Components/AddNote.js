import React, { useState } from 'react'
import { useContext } from 'react'
import NoteContext from '../Context/notes/noteContext'
function AddNote(props) {

    const context = useContext(NoteContext)
    const { addNote } = context

    // y humne initially 1 state bnadi jha note ki value null rhegi

    const [note, setNote] = useState({
        title: "", description: '', tag: ''
    })

    // y handleClick humne add Note button me dia jse hi hum click krenge addNote function call hoga jo API call krdega

    const handleClick = (e) => {
        e.preventDefault()
        props.showAlert("Note added successfully", "success")
        addNote(note.title, note.description, note.tag)
        setNote({ title: '', description: '', tag: '' })
    }

    // y onchange basically values lega form me se

    const onChange = (e) => {
        setNote({
            ...note, [e.target.name]: e.target.value
        })
    }
    return (
        <div >
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">

                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder="Title" onChange={onChange} minLength={5} required value={note.title} />
                    </div>
                    <div className="mb-3 ">
                        <input type="text" className="form-control" id="description" name='description' placeholder="Description" onChange={onChange} minLength={5} required value={note.description} />
                    </div>
                    <div className="mb-3 ">
                        <input type="text" className="form-control" id="tag" name='tag' placeholder="tag" onChange={onChange} value={note.tag} />
                    </div>

                    <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
