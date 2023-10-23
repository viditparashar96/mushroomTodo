import React from 'react'
import { GetAllTodo } from '../components'

function AllTodos() {
  return (
    <div className=' w-full min-h-[80vh]'>
      <h1 className=' text-center text-3xl font-bold'>All Todo's</h1>
        <GetAllTodo/>
    </div>
  )
}

export default AllTodos