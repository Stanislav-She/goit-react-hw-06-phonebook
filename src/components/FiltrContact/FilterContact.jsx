import { getFiltered } from 'components/redux/contactsSelector';
import { filterContacts } from 'components/redux/sliceContacts';
import { useDispatch, useSelector } from 'react-redux';
import FilterModule from './FilterContact.module.css';

export const FilterContact = () => {
  const dispatch = useDispatch();
  const filtered = useSelector(getFiltered);

  const onChange = event => {
    const { value } = event.target;
    dispatch(filterContacts(value.trim()));
  };

  return (
    <label name="filter" className={FilterModule.label}>
      <input
        className={FilterModule.input}
        type="text"
        name="filter"
        placeholder="Find contacts by name"
        onChange={event => {
          onChange(event);
        }}
        value={filtered}
      />
    </label>
  );
};