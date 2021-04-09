import React, { useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import PaymentProcess from "../PaymentProcess/PaymentProcess";

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const [shipmentData, setShipmentData] = useState(null);

  const onSubmit = (data) => {
    setShipmentData(data);
  };
  const handlePayment = paymentId => {
    const savedCarts = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCarts,
      shipment: shipmentData,
      paymentId,
      orderTime: new Date()
    };

    fetch("https://enigmatic-sands-80972.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        processOrder();
        alert("order placed successfully");
      });
  }

  return (
    <Container>
      <Row>
        <div style={{display : shipmentData ? 'none' : 'block'}} className="col-md-6">
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}
              <input
                name="email"
                defaultValue={`${loggedInUser.email}`}
                ref={register}
              />{" "}
              <br /> <br />
              <input
                name="name"
                defaultValue={`${loggedInUser.name}`}
                ref={register}
              />{" "}
              <br /> <br />
              <input
                name="address"
                ref={register({ required: true })}
                placeholder="Address"
              />
              {/* errors will return when field validation fails  */}
              {errors.exampleRequired && (
                <span>This field is required</span>
              )}{" "}
              <br /> <br />
              <input
                name="phone"
                ref={register({ required: true })}
                placeholder="Phone Number"
              />
              {/* errors will return when field validation fails  */}
              {errors.exampleRequired && <span>This field is required</span>}
              <input type="submit" />
            </form>
          </>
        </div>
        <div style={{display : shipmentData ? 'block' : 'none'}} className="col-md-6">
          <PaymentProcess handlePayment={handlePayment} />
        </div>
      </Row>
    </Container>
  );
};

export default Shipment;
