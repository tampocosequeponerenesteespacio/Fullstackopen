import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import PersonsList from './components/PersonsList'
import phoneServices from './services/phoneNumbers'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('New name...')
  const [ newNumber, setNewNumber] = useState('New Number')
  const [ search, setSearch] = useState('')
  const [ notification, setNotification] = useState(null)

  useEffect(() => {
    phoneServices
      .getAll()
      .then(initialPhones => {
        setPersons(initialPhones)
        
      })
  }, [])
  
  
  const addPhone = (event) => {
    event.preventDefault()
    const phoneNumber = {
      name: newName,
      number: newNumber
    }
    if (  persons.some( p => p.name.toLowerCase() === newName.toLowerCase() ) ) {
      const alert = window.confirm(newName+' is already on the phonebook, do you want to replace the phone number?')
      const id = persons.filter( p => p.name === newName)[0].id
      
      if(alert) {
        
        phoneServices
        .changeNumber(id,phoneNumber)
        .then(returnedPhone => {
        
        setPersons(persons.map( p => p.id === returnedPhone.id ? returnedPhone : p ))
        setNewName('')
        setNewNumber('')
        })
        .then( ()=> {
          setNotification(newName+' phone updated')
          setTimeout( () => setNotification(null),5000)
        })
      }
    } else {
        phoneServices
        .create(phoneNumber)
        .then(returnedPhone => {
        setPersons(persons.concat(returnedPhone))
        
        setNewName('')
        setNewNumber('') 
        })
        .then( () => {
          setNotification(phoneNumber.name +' added to the phonebook')
          setTimeout( () => setNotification(null),5000)
        })
    }
    
  }
  
  const handleDelete = (event)  => {
      const id = event.target.value
      const alert = window.confirm('Delete '+event.target.name+'?')
      if(alert) {
      phoneServices
      .deleteNumber(id)
      .then( () => {
        setNotification(event.target.name + ' deleted')
        setTimeout(() => setNotification(null),5000)
      })
      .catch( error => {
        setNotification('Error. Phone number has already been deleted')
        setTimeout( () => setNotification(null),5000)
      })    
      setPersons(persons.filter(person => person.id != id))
      }
      
           
    
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
      <Notification message={notification} />
      <Filter search={search} handle={handleSearch} />      
      <h2>Add a new contact</h2>
      <PersonsForm 
        newName={newName} newNumber={newNumber} onSubmit={addPhone}
        handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} 
      />
      <h2>Numbers</h2>
      <PersonsList filter={personsFilter} handleDelete={handleDelete} />
      
    </div>
  )
}

export default App