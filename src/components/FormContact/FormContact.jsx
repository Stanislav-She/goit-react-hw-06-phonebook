import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import FormModule from './FormContact.module.css';

export const FormContact = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onInputChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    addContact({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <div>
      <form className={FormModule.form} onSubmit={onSubmit}>
        <label className={FormModule.lable}>
          <input
            className={FormModule.input}
            type="text"
            name="name"
            placeholder="Name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={onInputChange}
          />
        </label>
        <label className={FormModule.lable}>
          <input
            className={FormModule.input}
            type="tel"
            name="number"
            placeholder="Number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={onInputChange}
          />
        </label>
        <button type="submit" className={FormModule.button}>
          Add contact
        </button>
      </form>
    </div>
  );
};

FormContact.propTypes = {
  addContact: PropTypes.func.isRequired,
};

////////////////////////////// BEFORE REFACTORING ////////////////////////////////////
// import PropTypes from 'prop-types';
// import React from 'react';
// import { Component } from 'react';
// import FormModule from './FormContact.module.css';

// export class FormContact extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   onInputChange = event => {
//     const { name, value } = event.currentTarget;
//     this.setState({ [name]: value });
//   };

//   onSubmit = event => {
//     event.preventDefault();
//     const { name, number } = this.state;
//     this.props.onSubmit({ name, number });
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ name: '', number: '' });
//   };

//   render() {
//     return (
//       <div>
//         <form className={FormModule.form} onSubmit={this.onSubmit}>
//           <label className={FormModule.lable}>
//             <input
//               className={FormModule.input}
//               type="text"
//               name="name"
//               placeholder="Name"
//               pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//               required
//               value={this.state.name}
//               onChange={this.onInputChange}
//             />
//           </label>
//           <label className={FormModule.lable}>
//             <input
//               className={FormModule.input}
//               type="tel"
//               name="number"
//               placeholder="Number"
//               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//               required
//               value={this.state.number}
//               onChange={this.onInputChange}
//             />
//           </label>
//           <button type="submit" className={FormModule.button}>
//             Add contact
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// FormContact.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
