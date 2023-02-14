import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as roomsAPI from "../lib/api/rooms";
import { takeLatest } from "redux-saga/effects";

const [LIST_CHATS, LIST_CHATS_SUCCESS, LIST_CHATS_FAILURE] =
  createRequestActionTypes("rooms/LIST_CHATS");

const CONCAT_ROOMS = "rooms/CONCAT_ROOMS";

const [REMOVE_ROOM, REMOVE_ROOM_SUCCESS, REMOVE_ROOM_FAILURE] =
  createRequestActionTypes("rooms/REMOVE_ROOM");

export const listRooms = createAction(LIST_CHATS, ({ page }) => ({
  page,
}));

export const concatRooms = createAction(CONCAT_ROOMS, ({ newRoom }) => ({
  newRoom,
}));

export const removeRoom = createAction(REMOVE_ROOM, ({ roomId }) => ({
  roomId,
}));

const listRoomsSaga = createRequestSaga(LIST_CHATS, roomsAPI.listRooms);
const removeRoomSaga = createRequestSaga(REMOVE_ROOM, roomsAPI.removeRoom);

export function* roomsSaga() {
  yield takeLatest(LIST_CHATS, listRoomsSaga);
  yield takeLatest(REMOVE_ROOM, removeRoomSaga);
}

const initialState = {
  rooms: [],
  error: null,
  lastPage: 1,
};

const rooms = handleActions(
  {
    [LIST_CHATS_SUCCESS]: (state, { payload: rooms, meta: response }) => ({
      ...state,
      rooms,
      lastPage: parseInt(response.headers["last-page"], 10),
    }),
    [LIST_CHATS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CONCAT_ROOMS]: (state, { payload: { newRoom } }) => ({
      ...state,
      rooms: [...state.rooms, newRoom],
    }),
    [REMOVE_ROOM_SUCCESS]: (state, { payload: roomId, meta: response }) => ({
      ...state,
      rooms: state.rooms.filter((room) => room._id !== roomId),
    }),
    [REMOVE_ROOM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default rooms;