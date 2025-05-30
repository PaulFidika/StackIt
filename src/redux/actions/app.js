import {
  REGISTER_USER, REGISTER_ALIAS, INVALIDATE_USER, SWITCH_SECTION, SET_FIREBASE_AVAILABLE,
} from '../constants/actionTypes';

function appRegisterUser() {
  return {
    type: REGISTER_USER,
  };
}

function appRegisterAlias() {
  return {
    type: REGISTER_ALIAS,
  };
}

function appInvalidateUser() {
  return {
    type: INVALIDATE_USER,
  };
}

function appSwitchSection(sectionName) {
  return {
    type: SWITCH_SECTION,
    payload: sectionName,
  };
}

function appSetFirebaseAvailable(isAvailable) {
  return {
    type: SET_FIREBASE_AVAILABLE,
    payload: isAvailable,
  };
}

export {
  appRegisterUser,
  appRegisterAlias,
  appInvalidateUser,
  appSwitchSection,
  appSetFirebaseAvailable,
};
