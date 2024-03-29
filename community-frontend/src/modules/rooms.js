import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as roomsAPI from "../lib/api/rooms";
import { takeLatest } from "redux-saga/effects";

const [LIST_ROOMS, LIST_ROOMS_SUCCESS, LIST_ROOMS_FAILURE] =
  createRequestActionTypes("rooms/LIST_ROOMS");

const CONCAT_ROOMS = "rooms/CONCAT_ROOMS";

const [REMOVE_ROOM, REMOVE_ROOM_SUCCESS, REMOVE_ROOM_FAILURE] =
  createRequestActionTypes("rooms/REMOVE_ROOM");

export const listRooms = createAction(LIST_ROOMS, ({ page }) => ({
  page,
}));

export const concatRooms = createAction(CONCAT_ROOMS, ({ newRoom }) => ({
  newRoom,
}));

export const removeRoom = createAction(REMOVE_ROOM, ({ roomId }) => ({
  roomId,
}));

const listRoomsSaga = createRequestSaga(LIST_ROOMS, roomsAPI.listRooms);

export function* roomsSaga() {
  yield takeLatest(LIST_ROOMS, listRoomsSaga);
}

const initialState = {
  rooms: null,
  error: null,
  lastPage: 1,
};

const rooms = handleActions(
  {
    [LIST_ROOMS_SUCCESS]: (state, { payload: rooms, meta: response }) => ({
      ...state,
      rooms,
      lastPage: parseInt(response.headers["last-page"], 10),
      error: null,
    }),
    [LIST_ROOMS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CONCAT_ROOMS]: (state, { payload: { newRoom } }) => ({
      ...state,
      rooms: [...state.rooms, newRoom],
    }),
    [REMOVE_ROOM]: (state, { payload: { roomId } }) => ({
      ...state,
      rooms: state.rooms.filter((room) => room._id !== roomId),
    }),
  },
  initialState
);

export default rooms;
