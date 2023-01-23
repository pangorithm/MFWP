import styled from "styled-components";
import palette from "../../lib/styles/palette";
import { Link } from "react-router-dom";

const Sidebarblock = styled.div`
  background: ${palette.gray[5]};
  padding: 5.5rem 10px 10px 10px;
  width: 200px;
  height: auto;
  position: absolute;
  border-radius: 5px;

  li {
    width: 100%;
    margin-top: 5px;
    background: ${palette.gray[3]};
    border: none;
    border-radius: 4px;
  }
  .MenuItem {
    display: block;
    width: 100%;
    padding: 0.25rem 1rem;
  }
`;

const Sidebar = () => {
  return (
    <>
      <Sidebarblock>
        <ul>
          <li>
            <Link to="/" className="MenuItem">
              posts
            </Link>
          </li>
          <li>
            <Link to="/" className="MenuItem">
              hashtags
            </Link>
          </li>
          <li>
            <Link to="/" className="MenuItem">
              chat
            </Link>
          </li>
          <li>
            <Link to="/" className="MenuItem">
              advertisement
            </Link>
          </li>
        </ul>
      </Sidebarblock>
    </>
  );
};

export default Sidebar;
