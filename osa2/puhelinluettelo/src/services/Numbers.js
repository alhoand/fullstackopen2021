import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const create = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const update = (id, number) => {
    const updated = Promise.resolve(axios.get(`${baseUrl}/${id}`))
                    .then(old => {
                        return { name: old.data.name, number: number, id: old.data.id }
                    })
                    .catch(error => {
                        console.log(error, "Information not found from the server")
                        return error
                    })

    const request = updated
                        .then(updatedContact => axios.put(`${baseUrl}/${id}`, updatedContact))
    return request.then(response => response.data)
}

const deleteNumber = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then( response => {
        console.log("Deleted a number.")
        return response.data
    })
}

const apiV1 = {
    getAll, create, update, deleteNumber
}

export default apiV1