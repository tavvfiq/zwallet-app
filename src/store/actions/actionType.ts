const actions = {
  login: 'DO_LOGIN',
  register: 'DO_REGISTER',
  topUp: 'DO_TOP_UP',
  doTransaction: 'DO_TRANSACTION',
  updateUser: 'DO_UPDATE_USER',
  addContact: 'DO_ADD_CONTACT',
  getContact: 'DO_GET_CONTACT',
};

const pending = '_PENDING';
const fulfilled = '_FULFILLED';
const rejected = '_REJECTED';

export {actions, pending, fulfilled, rejected};
