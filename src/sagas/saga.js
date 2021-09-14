
import {takeLatest, put} from 'redux-saga/effects';

function* updateUserAsync(){
// yield put({ type: 'UPDATE_USER_ASYNC', payload: [true, userData, isUserLogin.Num_of_Booking + 1] })
}

export function* watchUpdateUser(){
   const name =  yield 'hello'
   yield 'hello'
   yield 'hiii'
   console.log('nammmee',name);
    yield takeLatest('UPDATE_USER', updateUserAsync)
}