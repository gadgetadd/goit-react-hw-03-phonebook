import { Component } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { TbPlaylistAdd } from 'react-icons/tb';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { AppTitle, SectionTitle, Wrapper, IconWrapper } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = newContact => {
    const isExists = this.state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isExists) {
      return Report.info(
        'Enter correct information',
        `${newContact.name} is already in contacts`,
        'Ok'
      );
    }
    this.setState(({ contacts }) => {
      return { contacts: [...contacts, newContact] };
    });
  };

  deleteHandler = contactId => {
    this.setState(({ contacts }) => {
      return { contacts: contacts.filter(contact => contact.id !== contactId) };
    });
  };

  filterHandler = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  render() {
    const filter = this.state.filter.toLowerCase();
    const contacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );

    return (
      <Wrapper>
        <AppTitle>Phonebook</AppTitle>
        <SectionTitle>Add new contact</SectionTitle>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <SectionTitle>Contacts</SectionTitle>
        <Filter value={this.state.filter} onChange={this.filterHandler} />
        {contacts.length === 0 ? (
          <IconWrapper>
            <TbPlaylistAdd size="150px" color="#0000001a" />
          </IconWrapper>
        ) : (
          <ContactList contacts={contacts} onDelete={this.deleteHandler} />
        )}
      </Wrapper>
    );
  }
}
