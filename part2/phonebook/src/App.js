import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import PersonsList from './components/PersonsList'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('New name...')
  const [ newNumber, setNewNumber] = useState('New Number')
  const [ search, setSearch] = useState('')
  
  
    const addPhone = (event) => {
    event.preventDefault()
    const phoneNumber = {
      name: newName,
      phone: newNumber
    }
    if (  persons.some( p => p['name'] === newName)  ) {
      window.alert(newName + " is already added to phonebook")
    } else {
      setPersons(persons.concat(phoneNumber))
    }
    setNewName('')
    setNewNumber('')
  }
  


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const personsFilter = () => 
  persons.filter( person => person.name.toLowerCase().includes(search.toLowerCase()))
  

  

  return (
    <div>      
      <h1>Phonebook</h1>
      <Filter search={search} handle={handleSearch} />      
      <h2>Add a new contact</h2>
      <PersonsForm 
        newName={newName} newNumber={newNumber} onSubmit={addPhone}
        handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} 
      />
      <h2>Numbers</h2>
      <PersonsList filter={personsFilter} />
    </div>
  )
}

export default App