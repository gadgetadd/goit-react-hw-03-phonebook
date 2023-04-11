import PropTypes from 'prop-types';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { BsPersonAdd } from 'react-icons/bs';

import { Form, Label, Input, Button } from './ContactForm.styled';

export class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  formReset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  inputChangeHandler = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  submitHandler = e => {
    e.preventDefault();
    const { name, number } = e.currentTarget.elements;
    const newContact = {
      id: nanoid(),
      name: name.value,
      number: number.value,
    };
    this.props.onSubmit(newContact);
    this.formReset();
  };

  render() {
    return (
      <>
        <Form onSubmit={this.submitHandler}>
          <Label>
            Name:
            <Input
              type="text"
              name="name"
              value={this.state.name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              maxLength={35}
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.inputChangeHandler}
            />
          </Label>
          <Label>
            Number:
            <Input
              type="tel"
              name="number"
              value={this.state.number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              maxLength={35}
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.inputChangeHandler}
            />
          </Label>

          <Button type="submit">
            <BsPersonAdd size="40px" color="grey" />
          </Button>
        </Form>
      </>
    );
  }
}
