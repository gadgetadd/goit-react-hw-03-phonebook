import PropTypes from 'prop-types';
import { MdOutlineDeleteForever } from 'react-icons/md';

import { ListItem, Contact, Button } from './ContactItem.styled';

export const ContactItem = ({ name, number, onDelete }) => {
  return (
    <ListItem>
      <Contact>{`${name}: ${number}`}</Contact>
      <Button type="button" onClick={onDelete}>
        <MdOutlineDeleteForever size="20px" color="grey" />
      </Button>
    </ListItem>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
