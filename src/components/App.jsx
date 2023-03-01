import React, { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppStyle from './AppStyle.module.css';
import { FilterContact } from './FiltrContact/FilterContact';
import { ListContact } from './ListContact/ListContact';
import { FormContact } from './FormContact/FormContact';

const CONTACTS_KEY = 'contacts';

export const App = () => {
  const parsContacts = JSON.parse(localStorage.getItem(CONTACTS_KEY));
  const [contacts, setContacts] = useState(
    () =>
      parsContacts ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        { id: 'id-5', name: 'Ihor Kalyta', number: '577-99-77' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const newContact = {
      name: contact.name,
      number: contact.number,
      id: nanoid(),
    };

    if (contacts.some(event => event.name === contact.name)) {
      toast.info(`${contact.name} is already in contacts.`);
    } else {
      toast.success(`${contact.name} added to contacts.`);
      return setContacts(prevState => [newContact, ...prevState]);
    }
  };

  const filterContacts = event => {
    setFilter(event.currentTarget.value);
    if (event.currentTarget.value.length > 0) {
      toast.warn(
        `The following matches were found for the query " ${event.currentTarget.value} ".`
      );
    }
  };

  const getContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const removeContacts = (contactId, name) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    toast.error(`${name} deleted from contacts.`);
  };

  return (
    <div className={AppStyle.container}>
      <h1 className={AppStyle.primeryTitle}>Phonebook</h1>
      <FormContact addContact={addContact} />
      <ToastContainer />
      <h2 className={AppStyle.secondaryTitle}>Contacts </h2>
      <FilterContact value={filter} onChange={filterContacts} />
      <ListContact contacts={getContacts} onRemoveContact={removeContacts} />
    </div>
  );
};

////////////////////////////// BEFORE REFACTORING //////////////////////////
// import React from 'react';
// import { Component } from 'react';

// import { nanoid } from 'nanoid';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import AppStyle from './AppStyle.module.css';
// import { FilterContact } from './FiltrContact/FilterContact';
// import { ListContact } from './ListContact/ListContact';
// import { FormContact } from './FormContact/FormContact';

// const CONTACTS_KEY = 'contacts';
// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//       { id: 'id-5', name: 'Ihor Kalyta', number: '577-99-77' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const localData = localStorage.getItem(CONTACTS_KEY);
//     if (localData) {
//       this.setState({ contacts: JSON.parse(localData) });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     //(prevProps, prevState, snapShot)
//     if (this.state.contacts.length !== prevState.contacts.length) {
//       localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = contact => {
//     const isIncontacts = this.state.contacts.some(
//       ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
//     );
//     if (isIncontacts) {
//       toast.info(`${contact.name} is already in contacts.`);
//       return;
//     }
//     this.setState(prevState => ({
//       contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
//     }));
//     toast.success(`${contact.name} added to contacts.`);
//   };

//   filterContacts = event => {
//     this.setState({ filter: event.currentTarget.value });
//     if (event.currentTarget.value.length > 0) {
//       toast.warn(
//         `The following matches were found for the query " ${event.currentTarget.value} ".`
//       );
//     }
//   };

//   getContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   removeContacts = (contactId, name) => {
//     toast.error(`${name} deleted from contacts.`);
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(contact => {
//           return contact.id !== contactId;
//         }),
//       };
//     });
//   };

//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getContacts();
//     return (
//       <div className={AppStyle.container}>
//         <h1 className={AppStyle.primeryTitle}>Phonebook</h1>
//         <FormContact onSubmit={this.addContact} />
//         <ToastContainer />
//         <h2 className={AppStyle.secondaryTitle}>Contacts </h2>
//         <FilterContact value={filter} onChange={this.filterContacts} />
//         <ListContact
//           contacts={visibleContacts}
//           onRemoveContact={this.removeContacts}
//         />
//       </div>
//     );
//   }
// }
