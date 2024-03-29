import styled from "styled-components";
import Button from "../common/Button";

const WriteActionButtonsBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;
const Spacer = styled.div`
  height: 3rem;
`;

const WriteActionButtons = ({ onCancle, onPublish, isEdit }) => {
  return (
    <WriteActionButtonsBlock>
      <StyledButton cyan onClick={onPublish}>
        포스트 {isEdit ? "수정" : "등록"}
      </StyledButton>
      <StyledButton onClick={onCancle}>취소</StyledButton>
      <Spacer />
    </WriteActionButtonsBlock>
  );
};

export default WriteActionButtons;
