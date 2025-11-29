"use client"
import React, { useState } from 'react'

export default function AddQuest({saveAddQuest}) {
    const [title, setTitle] = useState("")
    const [priority, setPriority] = useState("Normal")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!title.trim()) return
        saveAddQuest(title, priority)
        setTitle("")
        setPriority("Normal")
    }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input 
            placeholder='Digite a nova quest'
            value={title}
            onChange={(e) =>setTitle(e.target.value)}
            className='p-2 rounded border'
        type="text"/>
   
            <select name="" id=""
                value={priority}
                onChange={(e) => setPriority(e.target.value)}>

                <option value="Urgente">Urgente</option>
                <option value="Urgente, mas nem tanto">Urgente, mas nem tanto</option>
                <option value="Normal">Normal</option>
                <option value="Baixa prioridade">Baixa prioridade</option>
            </select>
            <button type='submit'
            className='bg-purple-500 text-white rounded p-2 hover:bg-purple-600'>
                Add
            </button>
      </form>
    </div>
  )
}
