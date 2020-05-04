import React from 'react';
import styled from 'styled-components';
import { 
  FiX,
} from 'react-icons/fi';

const Wrapper = styled.div`
  width: 500px;
  height: 40px;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  z-index: 1;
  height: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
`;

const ClearButton = styled.button`
  position: absolute;
  z-index: 1;
  height: 100%;
  margin: 0;
  padding: 8px;
  border: 0;
  background: none;
  display: flex;
  align-items: center;
  right: 0;
  top: 0;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 8px 24px;;
  z-index: 0;
`;

function Input({icon, onClear, ...inputProps}) {
  return (
    <Wrapper>
      <IconWrapper>{icon}</IconWrapper>
      <StyledInput {...inputProps} />
      {onClear && (
        <ClearButton onClick={onClear} title='Clear'>
          <FiX />
        </ClearButton>
      )}
    </Wrapper>
  );
}

export default Input;
