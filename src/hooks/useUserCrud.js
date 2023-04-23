import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const useUserCrud = () => {
  const [users, setusers] = useState()

  const url = 'https://users-crud.academlo.tech/users/'

  //GET
  const getAllUsers = () => {
    axios
      .get(url)
      .then(res => setusers(res.data))
      .catch(err => console.log(err))
  }

  //POST
  const createUser = data => {
    axios
      .post(url, data)
      .then(res => {
        getAllUsers(),
          Swal.fire(
            'User created!',
            'The user was successfully created',
            'success'
          )
      })
      .catch(err => console.log(err))
  }

  //DELETE
  const deleteUserById = id => {
    const urlDelete = `${url}${id}/`
    axios
      .delete(urlDelete)
      .then(res => getAllUsers())
      .catch(err => console.log(err))
  }

  //UPDATE
  const updateUserById = (id, data) => {
    const urlUpdate = `${url}${id}/`
    axios
      .put(urlUpdate, data)
      .then(res => {
        getAllUsers(),
          Swal.fire(
            'Updated user!',
            'The user was successfully updated',
            'success'
          )
      })
      .catch(err => console.log(err))
  }

  return { users, getAllUsers, createUser, deleteUserById, updateUserById }
}

export default useUserCrud
