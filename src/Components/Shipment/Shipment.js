import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const onSubmit = data => {
      const savedCarts = getDatabaseCart();
      const orderDetails = {...loggedInUser, products: savedCarts, shipment: data, orderTime: new Date() }

      fetch('https://enigmatic-sands-80972.herokuapp.com/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data => {
        processOrder();
        alert('order placed successfully')
      })
    };
  
    return (
        <>
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
        <input name="email" defaultValue={`${loggedInUser.email}`} ref={register} /> <br/> <br/>
        <input name="name" defaultValue={`${loggedInUser.name}`} ref={register} /> <br/> <br/>
        
        <input name="address" ref={register({ required: true })} placeholder='Address' />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>} <br/> <br/>
        <input name="phone" ref={register({ required: true })} placeholder='Phone Number' />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        
        <input type="submit" />
      </form>
      </>
    );
};

export default Shipment;