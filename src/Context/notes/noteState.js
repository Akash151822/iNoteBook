import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    // yha humne Apni backend vali API ka path declared krdia
    const host = "http://localhost:5000"

    // y humne notes or setNotes bnadi isme hi sara data change hoega
    const [notes, setNotes] = useState([])


    // ## getNotes function yha humne apni getNotes API call kri h or data jo mila h use setNotes me daal dia

    const getNotes = async () => {

        // API Call
        const response = await fetch(`${host}/api/notes/getNotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()

        setNotes(json)
    }

    // ## addNote yha pe humne addNote functionality daali h jse hi user addNote krega form se yha pe addNote API call hoegi 

    const addNote = async (title, description, tag) => {

        // API Call
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        // yha humne kya kia h k jo b values hume milegi jab user form bhrega vo hum leke nava note bnaenge or use setNotes k through notes me concat krdenge agr hum push krenge to vo sirf nava array dega

        const note = await response.json()

        setNotes(notes.concat(note))
    }

    // ##  deleteNote yha hum delete vali API call krenge humne isko delete vale icon pe set kia h jse hi uspe click krenge to y us note ki id lega or use delete krdega

    const deleteNote = async (id) => {

        // API Call
        await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        console.log("deleting node with " + id)

        // yha humne newNotes bnaya h 1 vha pe humne jo deletd note h usko remove krdia h frontend se b or fir setNotes me baki k notes daal diye h
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
    }

    // ## editNote yha pe sabse jada kaam hua h yha humne jo editModel me form bhra tha uska data lia h or fir updateNote API call krdi h

    const UpdateNote = async (id, title, description, tag) => {

        // API Call
        await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify({ title, description, tag }),
        });

        // yha humne kya kia h k jo b nava note bna h update k baad usko or bakio ko  humne newNotes me lelia

        let newNotes = JSON.parse(JSON.stringify(notes))

        // yha humne loop chalake saare newNotes ko lelia h or jonsa note update hua h uski id match krli or uske values change krdi
        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if (element._id === id) {
                newNotes[i].title = title
                newNotes[i].description = description
                newNotes[i].tag = tag
                break;
            }

        }
        // yha hune setNotes me newNotes daal diye
        setNotes(newNotes)

        // getNotes()  yha hum directly getNotes vala function b call kr skte the
    }

    // yha pe humne hmare NoteState k saare value or function ko return krdia

    return (
        <NoteContext.Provider value={{ notes, addNote, UpdateNote, deleteNote, getNotes }} >
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState 