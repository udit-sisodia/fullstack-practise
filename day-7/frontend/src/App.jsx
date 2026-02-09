import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"

const App = () => {
  const [notes, setnotes] = useState([])
  const [id, setId] = useState(null)
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")

  // console.log("hello integration")

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes")
      .then(note => {
        setnotes(note.data.notes)
      })

  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function submitHandler(e) {
    e.preventDefault()
    
    if (id) {
      axios.patch(`http://localhost:3000/api/notes/${id}`,{
        title,
        description
      }).then((res) => {
        console.log(res.data)
        setId(null)
        settitle("")
        setdescription("")
        fetchNotes()
      })
    }
    else {
      axios.post("http://localhost:3000/api/notes",{
      title,
      description
    })
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
    }
  }

  function noteHandleDelete(noteId) {
    console.log(noteId)
    axios.delete(`http://localhost:3000/api/notes/${noteId}`)
      .then((res) => {
        console.log(res.data)
        fetchNotes()
      })
  }

  function noteHandleUpdate(note){
  setId(note._id)
  settitle(note.title)
  setdescription(note.description)
  
}




  return (
    <>
      <form className='note-create-form' onSubmit={submitHandler}>
        <input onChange={(e) => {
          settitle(e.target.value)
        }}
          value={title}
          name='title' type="text" placeholder='Enter title' />

        <input onChange={(e) => {
          setdescription(e.target.value)
        }}
          value={description}
          name='description' type="text" placeholder='Enter description' />
        <button>{id ? "Update" : "Submit"}</button>
      </form>

      <div className="notes">
        {notes.map((note, idx) => {
          return <div key={idx} className="note">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={() => {
              noteHandleDelete(note._id)
            }}>Delete</button>
            <button onClick={() => noteHandleUpdate(note)}>Edit</button>

          </div>
        })}
      </div>
    </>
  )
}

export default App
