import React, { useState, useEffect } from 'react'

import numberService from './services/Numbers'
import Notification from './components/Notification'

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          numbers: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <button type="submit" >add</button>
      </form>
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.value} onChange={props.handleFilterChange} />
    </div>
  )
}


const Person = ( props ) => {
  //console.log('A single contact', props.person.name, 'has following props: ', props)
  return (
  <p>
      <span>{props.person.name} </span><span>{props.person.number} </span>
      <button onClick={props.handleContactDeletion}>Delete</button>
  </p>
    
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ filterValue, setFilter ] = useState('')
  const [ notification, setNotification ] = useState([])


  useEffect(() => {
      numberService
      .getAll()
        .then(numbers => {
          setPersons(numbers)
        })
        .catch(error => {
          console.log(error, "Could not get all contacts")
        })
    }
    ,[]
  )

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setShowAll(!event.target.value.length > 0)
    setFilter(event.target.value)
  }

  const handleContactDeletion = (id) => {
    return (event) => {
      event.preventDefault()
      if (window.confirm("Delete contact?")) {
        numberService
        .deleteNumber(id)
          .then(() => {
            const deletedPerson = persons.find(person => person.id === id)
            setNotification([`Deleted ${deletedPerson.name}`
                              , 'success'])
            setPersons(persons.filter(person => person.id !== id))
            setTimeout(() => setNotification([null, ''])
                      , 5000)
          })
      }
    }
  }
  const clean = (name) => name.toLowerCase().trim()

  const contactsToShow = showAll
                    ? persons
                    : persons.filter(person => clean(person.name).includes(clean(filterValue)))
  
  const addPerson = (event) => {
    event.preventDefault()    
    if (newName.length && newNumber.length) {
      if (!(persons.map(person => clean(person.name)).includes(clean(newName)))) {
        const personObject = {
          name: newName,
          number: newNumber
        }
      numberService.create(personObject)
        .then(person => {
          setPersons(persons.concat(person))
          setNotification([`Added ${person.name}`, 'success'])
          setTimeout(() => setNotification([null, '']), 5000)
        })    
      } else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const id = persons.find(person => clean(person.name) === clean(newName)).id
          numberService
          .update(id, newNumber)
            .then(updated => {
              setPersons(persons.map(person => person.id !== id ? person : updated))
              setNotification([`Contact updated`, 'success'])
              setTimeout(() => setNotification([null, ''])
                        , 5000)
            })
            .catch((error) => {
              setNotification([`Information of ${newName} has already been removed from the server`
                              , 'error'])
              console.log(error)
              setTimeout(() => setNotification([null, ''])
                        ,5000)
              setPersons(persons.filter(person => person.id !== id))
            })          
        }
      }
      
    } else {
      setNotification([`A person's name and number have to contain at least one letter or numeral`, 'error']) 
      setTimeout(() => setNotification([null, ''])
                ,5000)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification[0]} type={notification[1]} />
      <Filter value={filterValue} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <div>
        {contactsToShow.map(person => 
            <Person 
              key={person.name}
              person={person}
              handleContactDeletion={handleContactDeletion(person.id)}
            />
        )}
      </div>
    </div>
  );
}

export default App
