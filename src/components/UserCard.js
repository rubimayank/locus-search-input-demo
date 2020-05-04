import React from 'react';
import styled from 'styled-components';

const Id = styled.span`
  font-weight: bold;
  display: block;
`;

const Name = styled.span`
  font-style: italic;
  display: block;
  padding-top: 4px;
`;

const Address = styled.p`
  padding-top: 8px;
`;

/*
 * @TODO handle search matches highlight
 */

function UserCard({ user }) {
  const { 
    id,
    name,
    address,
    pincode,
    // items = [],
  } = user;
  return (
    <div>
      <Id>{id}</Id>
      <Name>{name}</Name>
      <Address>
        {`${address}, ${pincode}`}
      </Address>
    </div>
  );
}

export default UserCard;
