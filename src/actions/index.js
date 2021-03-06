const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const VALIDATE = createRequestTypes('VALIDATE');
export const VALIDATE_PASSWORD = createRequestTypes('VALIDATE_PASSWORD');
export const LOGIN = createRequestTypes('LOGIN');
export const GET_PROFILE = createRequestTypes('GET_PROFILE');
export const SIGNUP = createRequestTypes('SIGNUP');
export const PASSWORD_CREATE = createRequestTypes('PASSWORD_CREATE');
export const PHONE_NUMBER_CREATE = createRequestTypes('PHONE_NUMBER_CREATE');
export const PHONE_NUMBER_VALIDATE = createRequestTypes('PHONE_NUMBER_VALIDATE');
export const SMS_CODE_REPEAT = createRequestTypes('SMS_CODE_REPEAT');
export const FACE_EMOTION_CREATE = createRequestTypes('FACE_EMOTION_CREATE');
export const FACE_EMOTION_VALIDATE = createRequestTypes('FACE_EMOTION_VALIDATE');

export const SAVE_CREDENTIALS = 'SAVE_CREDENTIALS';
export const SET_AVATAR_LOCAL_PATH = 'SET_AVATAR_LOCAL_PATH';
export const SET_TEMP_LOCAL_PATH = 'SET_TEMP_LOCAL_PATH';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_PROFILE = 'SET_PROFILE';
export const SAVE_PHONE = 'SAVE_PHONE';
export const SAVE_AVATAR = 'SAVE_AVATAR';
export const SAVE_NAMES = 'SAVE_NAMES';
export const ADD_PRIMARY_ACCOUNT = 'ADD_PRIMARY_ACCOUNT';
export const ADD_SECONDARY_ACCOUNT = 'ADD_SECONDARY_ACCOUNT';
export const SET_TR_ADRESS = 'SET_TR_ADRESS';
export const SET_TR_PHONE = 'SET_TR_PHONE';
export const SET_TR_CONTACT = 'SET_TR_CONTACT';
export const SET_TR_AMOUNT = 'SET_TR_AMOUNT';
export const ADD_CONTACT = 'ADD_CONTACT';
export const ADD_CONTACTS = 'ADD_CONTACTS';
export const SET_TR_ROOT_SCREEN = 'SET_TR_ROOT_SCREEN';

function action(type, payload = {}) {
  return { type, ...payload };
}

export const validate = {
  request: facial_image => action(VALIDATE[REQUEST], { facial_image }),
  success: response => action(VALIDATE[SUCCESS], { response }),
  failure: error => action(VALIDATE[FAILURE], { error }),
};

export const validatePassword = {
  success: response => action(VALIDATE_PASSWORD[SUCCESS], { response }),
  failure: error => action(VALIDATE_PASSWORD[FAILURE], { error }),
};

export const login = {
  request: request => action(LOGIN[REQUEST], request),
  success: response => action(LOGIN[SUCCESS], { response }),
  failure: error => action(LOGIN[FAILURE], { error }),
};

export const getProfile = {
  request: request => action(GET_PROFILE[REQUEST], request),
  success: response => action(GET_PROFILE[SUCCESS], { response }),
  failure: error => action(GET_PROFILE[FAILURE], { error }),
};

export const passwordCreate = {
  success: response => action(PASSWORD_CREATE[SUCCESS], { response }),
  failure: error => action(PASSWORD_CREATE[FAILURE], { error }),
};

export const signup = {
  request: request => action(SIGNUP[REQUEST], request),
  success: response => action(SIGNUP[SUCCESS], { response }),
  failure: error => action(SIGNUP[FAILURE], { error }),
};

export const phoneNumberCreate = {
  request: request => action(PHONE_NUMBER_CREATE[REQUEST], request),
  success: response => action(PHONE_NUMBER_CREATE[SUCCESS], { response }),
  failure: error => action(PHONE_NUMBER_CREATE[FAILURE], { error }),
};

export const phoneNumberValidate = {
  request: request => action(PHONE_NUMBER_VALIDATE[REQUEST], request),
  success: response => action(PHONE_NUMBER_VALIDATE[SUCCESS], { response }),
  failure: error => action(PHONE_NUMBER_VALIDATE[FAILURE], { error }),
};

export const smsCodeRepeat = {
  request: request => action(SMS_CODE_REPEAT[REQUEST], request),
  success: response => action(SMS_CODE_REPEAT[SUCCESS], { response }),
  failure: error => action(SMS_CODE_REPEAT[FAILURE], { error }),
};

export const faceEmotionCreate = {
  request: request => action(FACE_EMOTION_CREATE[REQUEST], request),
  success: response => action(FACE_EMOTION_CREATE[SUCCESS], { response }),
  failure: error => action(FACE_EMOTION_CREATE[FAILURE], { error }),
};

export const faceEmotionValidate = {
  request: request => action(FACE_EMOTION_VALIDATE[REQUEST], request),
  success: response => action(FACE_EMOTION_VALIDATE[SUCCESS], { response }),
  failure: error => action(FACE_EMOTION_VALIDATE[FAILURE], { error }),
};

//export const saveCredentials = path => action(SAVE_CREDENTIALS, credentials);

export const setAvatarLocalPath = path => action(SET_AVATAR_LOCAL_PATH, { path });
export const setTempLocalPath = path => action(SET_TEMP_LOCAL_PATH, { path });
export const setPassword = password => action(SET_PASSWORD, { password });
export const setProfile = profile => action(SET_PROFILE, { profile });
export const savePhone = number => action(SAVE_PHONE, { number });
export const saveNames = names => action(SAVE_NAMES, { names });
export const saveAvatar = avatar => action(SAVE_AVATAR, { avatar });
export const addPrimaryAccount = account => action(ADD_PRIMARY_ACCOUNT, { account });
export const addSecondaryAccount = account => action(ADD_SECONDARY_ACCOUNT, { account });
export const addContact = contact => action(ADD_CONTACT, { contact });
export const addContacts = contacts => action(ADD_CONTACTS, { contacts });


export const newTransaction = {
  setTrAdress: adress => action(SET_TR_ADRESS, { adress }),
  setTrPhone: phone => action(SET_TR_PHONE, { phone }),
  setTrContact: contactID => action(SET_TR_CONTACT, { contactID }),
  setTrAmount: amount => action(SET_TR_AMOUNT, { amount }),
  setRootScreen: rootScreen => action(SET_TR_ROOT_SCREEN, { rootScreen }),
};
