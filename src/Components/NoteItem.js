import React from 'react'
import NoteContext from '../Context/notes/noteContext'
import { useContext } from 'react'
function NoteItem(props) {
    const { note, updateNote } = props
    const context = useContext(NoteContext)
    const { deleteNote } = context
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>

                        {/* yha deleteNote lia h context me se jo delete API ko cakk krega */}
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("Note Deleted successfully", "danger")
                        }
                        }></i>

                        {/* updateNote humne yha pe lia h addNote me se jo humari editMoral pe kaam krega */}
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={() => updateNote(note)}></i>
                    </div>
                    <p className="card-text">  {note.description}</p>
                    <p className="card-text" >  {note.tag}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
