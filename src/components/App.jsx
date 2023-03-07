import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './Form';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { AiFillPhone } from 'react-icons/ai';
import { IoMdContacts } from 'react-icons/io';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const filterNormalize = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalize)
    );
  };

  const removeContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const formSubmitHandler = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    setContacts(prevState => [newContact, ...prevState]);
  };

  return (
    <div>
      <h1>
        Phonebook <AiFillPhone />
      </h1>
      <Form onSubmit={formSubmitHandler} contacts={contacts} />
      <h2>
        Contacts <IoMdContacts />
      </h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        removeContact={removeContact}
      />
    </div>
  );
};
