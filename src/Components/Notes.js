import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import NoteContext from '../Context/notes/noteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'
function Notes(props) {

    // navigate krne k vaste

    const navigate = useNavigate()
    // context ko use krne k liye

    const context = useContext(NoteContext)

    // context me se values lene k liye functions and notes

    const { notes, getNotes, UpdateNote } = context

    // notes ko show krne k liye y setNotes me notes ko set krega

    useEffect(() => {

        // if there is  token saved for user then we will  show any notes for that user else not  
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            props.showAlert("Please Login/signUp with your Email to access your notes ", "danger")
            setTimeout(() => {
                navigate("/login")
            }, 1000);      // vrna usko login pe bhj denge
        }
        // eslint-disable-next-line 
    }, [])


    const ref = useRef(null)   // y ref humne lia h show modal button vaste jo humne hide krdia
    const refClose = useRef(null)  // y ref humne lia h close button vaste

    //  edit vala note or setNote

    const [editNote, editSetNote] = useState({
        id: "", etitle: "", edescription: '', etag: 'default'
    })

    // y humne dia edit vale design ko jse hi click hua humne us note ki sari values apni edit note ko b dedi as default

    const updateNote = (currentNote) => {
        ref.current.click()
        editSetNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })


    }

    // y button update knre k liye jse hi humne click kia ispe humne updateNote function call krdia or API call hui

    const UpdateButtonClick = (e) => {

        UpdateNote(editNote.id, editNote.etitle, editNote.edescription, editNote.etag)
        props.showAlert("Note Updated Successfully", "success")
        refClose.current.click()   // y refClose humne close button k liye lia h jse hi update pe krenge indirectly close click hojega
    }

    // y onchange humne inputs me lia h jab b koi change aaega values me hum edit vala note change krdenge

    const onChange = (e) => {
        editSetNote({ ...editNote, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            {/*   y vala editModal h */}

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className='form-label'>Title</label>
                                    <input type="text" className="form-control" id='etitle' name='etitle' aria-describedby="emailHelp" value={editNote.etitle} onChange={onChange} />
                                </div>
                                <label htmlFor="edescription" className='form-label'>Description</label>
                                <div className="mb-3 ">
                                    <input type="text" className="form-control" id='edescription' name='edescription' value={editNote.edescription} onChange={onChange} />
                                </div>
                                <label htmlFor="etag" className='form-label'>Tag</label>
                                <div className="mb-3 ">
                                    <input type="text" className="form-control" id='etag' name='etag' value={editNote.etag} onChange={onChange} />
                                </div>
                                <label htmlFor="Id" className='form-label'>Id</label>
                                <div className="mb-3 ">
                                    <input type="text" className="form-control" name='id' id='id' value={editNote.id} readOnly />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={UpdateButtonClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* yha tak */}

            <div className='row my-3'>

                {/* yha pe humne saare notes jo getNotes se mile h unhe map krlia or NoteItem ko dedia */}

                <h2>Your Notes</h2>
                <div className="container">
                    <h3>{notes.length === 0 && 'No Notes to display'}</h3>

                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
