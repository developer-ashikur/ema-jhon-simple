import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimplePaymentForm from './SimplePaymentForm';

const stripePromise = loadStripe('pk_test_51IeBFPGXLOqGWw7LQ56lfzG42yMXdxob97KgQRfnx2oQkWXDjDaWaWrNF4qWLHDBAeHYybby4oafTbhrtL3Co8YB00kNm2HPKO');

const PaymentProcess = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimplePaymentForm handlePayment={handlePayment} />
        </Elements>
    );
};

export default PaymentProcess;