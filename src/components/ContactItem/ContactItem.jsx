import PropTypes from 'prop-types';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { RiContactsLine } from 'react-icons/ri';
import {
  ListItem,
  Contact,
  Button,
  ContactWrapper,
} from './ContactItem.styled';

export const ContactItem = ({ name, number, onDelete }) => {
  return (
    <ListItem>
      <ContactWrapper>
        <RiContactsLine size="20px" color="grey" />
        <Contact>{`${name}: ${number}`}</Contact>
      </ContactWrapper>
      <Button type="button" onClick={onDelete}>
        <MdOutlineDeleteForever size="25px" color="grey" />
      </Button>
    </ListItem>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
