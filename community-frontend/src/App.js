import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Helmet } from "react-helmet-async";
import { Reset } from "styled-reset";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";
import HashtagListPage from "./pages/HashtagListPage";
import ProductListPage from "./pages/ProductsListPage";
import RegistProductPage from "./pages/RegistProductPage";
import AuctionPage from "./pages/AuctionPage";
import ChatRoomListPage from "./pages/ChatRoomListPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import ChatPage from "./pages/ChatPage";
import Quill from "quill";
import ImageResize from "quill-image-resize";
Quill.register("modules/ImageResize", ImageResize);

const App = () => {
  return (
    <>
      {/* <Reset /> */}
      <Helmet>
        <title>REACTERS</title>
      </Helmet>
      <Routes>
        <Route element={<MainPage />} path={"/"} />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<PostListPage />} path={"/posts"} />
        <Route element={<PostListPage />} path={"/posts/:userId"} />
        <Route element={<WritePage />} path="/posts/write" />
        <Route element={<PostPage />} path="/posts/:userId/:postId" />
        <Route element={<HashtagListPage />} path="/hashtags" />
        <Route element={<ChatRoomListPage />} path="/chat" />
        <Route element={<CreateRoomPage />} path="/chat/createRoom" />
        <Route element={<ChatPage />} path="/chat/:roomId" />
        <Route element={<ProductListPage />} path="/auction" />
        <Route element={<RegistProductPage />} path="/resistProduct" />
        <Route element={<AuctionPage />} path="/auction/:productId" />
      </Routes>
    </>
  );
};

export default App;
