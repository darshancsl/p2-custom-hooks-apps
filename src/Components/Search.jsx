import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Search = ({ handleSearchInputChange, search }) => {
  return (
    <>
      <InputGroup className='my-3 w-25 mx-auto'>
        <Form.Control
          onChange={handleSearchInputChange}
          className='border-0 bg-transparent border-bottom text-light '
          type='text'
          value={search}
          placeholder='Search...'
        />
      </InputGroup>
    </>
  );
};

export default React.memo(Search);
