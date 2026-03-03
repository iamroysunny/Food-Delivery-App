import React, { useContext, useEffect, useCallback } from "react";
import { FoodContext } from '../context/FoodContext'
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Verify = () => {

    const { navigate, token, setCartItems } = useContext(FoodContext);
    const [searchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = useCallback(async () => {

        try {

            if (!token) return;

            const response = await axios.post(
                backendUrl + '/api/order/verifyStripe',
                { success, orderId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                setCartItems({});
                navigate('/orders');
                toast.success('Order Placed Successfully');
            } else {
                navigate('/cart');
                toast.error('Order Failed');
            }

        } catch (error) {
            console.log(error);
            toast.error("Verification Failed");
        }

    }, [token, success, orderId, navigate, setCartItems]);

    useEffect(() => {
        verifyPayment();
    }, [verifyPayment]);

    return (
        <div>Verifying Payment...</div>
    );
};

export default Verify;