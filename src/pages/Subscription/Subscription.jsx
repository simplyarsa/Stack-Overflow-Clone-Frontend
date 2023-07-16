import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import axios from 'axios'
import './Subscription.css'
import { useSelector } from 'react-redux'

const Subscription = () => {

    const currentUser = useSelector((state) => state.currentUserReducer)
    const id = currentUser?.result?._id

    const checkOutHandler = async (amount) => {
        const { data: { order } } = await axios.post('https://stack-overflow-clone-backend-uh8p.onrender.com/subscription/order', { amount: amount })

        const options = {
            "key": "rzp_test_yakON0b8QPOa8r", // Enter the Key ID generated from the Dashboard
            "amount": order.amount,
            "currency": "INR",
            "name": "StackOverflow Subscription",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order.id,
            handler: async function (response) {
                const result = await axios.post('https://stack-overflow-clone-backend-uh8p.onrender.com/subscription/verify', { id, amount, response });
                if (result.data.success === true) {
                    alert("New Subscription Plan is activated");
                } else {
                    alert("The Plan has failed to activate!!! Contact us later.")
                }
            },
            "callback_url": "https://stack-overflow-arsalan.netlify.app/Subscription",
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        var razor = new window.Razorpay(options);
        razor.open();

    }


    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className='subscriptionbox' >
            <div class="card-basic">
                <div class="card-header header-basic">
                    <h1>FREE</h1>
                </div>
                <div class="card-body">
                    <p><h2>₹0 / mo</h2></p>
                    <div class="card-element-hidden-basic">
                        <ul class="card-element-container">
                            <li class="card-element">1 question a day</li>
                        </ul>
                        <button class="btn btn-basic" >Order now</button>
                    </div>
                </div>
            </div>

            <div class="card-standard">
                <div class="card-header header-standard">
                    <h1>SILVER</h1>
                </div>
                <div class="card-body">
                    <p><h2>₹100 / mo</h2></p>
                    <div class="card-element-hidden-standard">
                        <ul class="card-element-container">
                            <li class="card-element">5 questions a day</li>
                        </ul>
                        <button class="btn btn-standard" onClick={() => checkOutHandler(100)}>Order now</button>
                    </div>
                </div>
            </div>
            <div class="card-premium">
                <div class="card-header header-premium">
                    <h1>GOLD</h1>
                </div>
                <div class="card-body">
                    <p><h2>₹1000 / mo</h2></p>
                    <div class="card-element-hidden-premium">
                        <ul class="card-element-container">
                            <li class="card-element">Unlimited questions</li>
                        </ul>
                        <button class="btn btn-premium" onClick={() => checkOutHandler(1000)}>Order now</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription