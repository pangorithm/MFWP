import ChatRoomList from "../../components/chat/ChatRoomList";
import { useEffect } from "react";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { listRooms } from "../../modules/rooms";
import io from "socket.io-client";

const ChatRoomListContainer = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { rooms, error, loading, user } = useSelector(
    ({ rooms, loading, user }) => ({
      rooms: rooms.rooms,
      error: rooms.error,
      loading: loading["rooms/LIST_ROOMS"],
      user: user.user,
    })
  );

  useEffect(() => {
    const { page } = qs.parse(search, {
      ignoreQueryPrefix: true,
    });
    const socket = io.connect("http://localhost:4000/room", {
      // 네임스페이스
      path: "/socket.io",
    });
    socket.on("newRoom", function (data) {
      // 새 방 이벤트 시 새 방 생성
    });
    socket.on("removeRoom", function (data) {
      // 방 제거 이벤트 시 id가 일치하는 방 제거
    });
    dispatch(listRooms({ page }));
  }, [dispatch, search]);

  return (
    <ChatRoomList
      loading={loading}
      error={error}
      rooms={rooms}
      createRoomButton={user}
    />
  );
};

export default ChatRoomListContainer;
