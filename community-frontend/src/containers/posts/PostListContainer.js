import { useEffect } from "react";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import { listPosts } from "../../modules/posts";

const PostListContainer = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { userId } = params;
  const { search } = useLocation();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading["posts/LIST_POSTS"],
      user: user.user,
    })
  );

  useEffect(() => {
    const query = qs.parse(search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ userId, query }));
  }, [search, userId]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default PostListContainer;
