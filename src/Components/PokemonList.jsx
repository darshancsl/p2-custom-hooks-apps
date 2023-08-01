import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const PokemonList = ({
  pokemonArr,
  currentPage,
  totalPages,
  handlePrevPage,
  goToPage,
  handleNextPage,
  getPaginationArray,
  lastPage,
  firstPage,
  isLoading,
}) => {
  return (
    <>
      <div>
        <span className='mx-2 text-light'>
          {currentPage} of {totalPages}
        </span>
        <div className='overflow-hidden'>
          <button
            className='bg-primary text-light border-0 py-1 px-2 m-2 float-start'
            onClick={firstPage}
            disabled={currentPage === 1}
          >
            First Page
          </button>
          <button
            className='bg-primary text-light border-0 py-1 px-2 m-2 float-start'
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div>
            {getPaginationArray().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className='bg-primary text-light border-0 py-1 px-2 my-2 mx-1 float-start'
                disabled={currentPage === page}
                style={{ fontWeight: currentPage === page ? "bold" : "normal" }}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className='bg-primary text-light border-0 py-1 px-2 m-2 float-start'
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            className='bg-primary text-light border-0 py-1 px-2 m-2 float-start'
            onClick={lastPage}
            disabled={currentPage === totalPages}
          >
            Last Page
          </button>
        </div>
        <Row className='justify-content-around flex-wrap p-3'>
          {pokemonArr?.length ? (
            pokemonArr.map(({ name, img, types }) => {
              return (
                <Col
                  key={name}
                  className='col-12 col-sm-6 col-md-4 col-lg-3 my-3'
                >
                  <Card className='shadow border-info border-2 bg-transparent'>
                    <Card.Img variant='top' src={img} />
                    <Card.Body className='text-capitalize text-center bg-dark-subtle border-top border-2 border-info'>
                      <Card.Title>
                        <span className='fw-bold'>Name: </span>
                        {name}
                      </Card.Title>
                      <Card.Text>
                        <span className='fw-bold'>Type: </span>
                        {types}
                      </Card.Text>
                      <Button
                        as={Link}
                        to={`pokemon/${name}`}
                        variant='primary'
                      >
                        Go somewhere
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : isLoading ? (
            <h1>Is Loading</h1>
          ) : (
            <h1>No Pokemon Found</h1>
          )}
        </Row>
      </div>
    </>
  );
};

export default PokemonList;
