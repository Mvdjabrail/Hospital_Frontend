import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsCart4 } from "react-icons/bs";
import { Nav } from 'react-bootstrap';

function CartComponent({ name, ...props }) {

  return (
    <>
      <Nav variant="link" onClick={props.handleShow} className="mx-1">
        {<BsCart4 size={30} color={"#3695eb"} />}
      </Nav>
      <Offcanvas show={props.show} onHide={props.handleclose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartComponent;
