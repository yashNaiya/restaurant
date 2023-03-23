import { Box, Typography } from '@mui/material'
import React from 'react'
import Footer from '../Footer'
import image from '../../Assets/paper.jpg'
import { fontSize } from '@mui/system'
const About = () => {
    return (
        <Box>
            <Box paddingY={'2rem'} paddingLeft={'2rem'} paddingRight={'6rem'} width={'70%'} margin='auto' minHeight={'100vh'}
            >
                <Typography fontSize={'24px'}>
                <p><b>About us and history</b></p>
                </Typography>
                <Typography
                    marginTop={'1rem'}
                >
                    
                    Welcome to The Bombay, an authentic Indian restaurant serving delicious cuisine with a modern twist. Our restaurant is located in the heart of the city and is the perfect destination for food lovers who enjoy a culinary experience like no other.<br/><br/>

                    The Bombay was established in 2005 by our founder, Mr. Suresh Kumar, who had a passion for cooking and a desire to share his love for Indian food with the world. Mr. Kumar began his culinary journey by mastering the art of Indian cuisine, spending countless hours experimenting with spices and ingredients until he perfected the flavors and textures that would later become the signature dishes of The Bombay.<br/><br/>

                    Over the years, The Bombay has become a popular destination for foodies from all over the world, attracting locals and tourists alike with its exceptional cuisine and warm hospitality. Our restaurant has won numerous awards for its culinary excellence, including the prestigious Best Indian Restaurant award in the city.<br/><br/>

                    At The Bombay, we pride ourselves on using only the freshest and highest quality ingredients, sourced from local markets and trusted suppliers. Our menu features a wide variety of dishes that are prepared using traditional Indian cooking methods, with a modern twist that adds a unique and innovative touch to every meal.<br/><br/>

                    In addition to our delicious food, we also offer an inviting and comfortable atmosphere that is perfect for enjoying a meal with family and friends. Our staff is friendly and knowledgeable, always ready to provide recommendations and answer any questions you may have.<br/><br/>

                    Whether you're looking for a romantic dinner for two, a family gathering, or a corporate event, The Bombay is the perfect choice. Come experience the taste of India and let us take you on a culinary journey that will leave you satisfied and craving more.<br/><br/>
                </Typography>

                <Typography marginTop={'1rem'} textAlign='left'>
                    <br /><b>Terms and Conditions:</b><br /><br />

                    Welcome to The Bombay. By using our website or placing an order with us, you agree to comply with and be bound by the following terms and conditions. Please review these carefully before using our website or placing an order.

                    <br /><br />Ordering:<br />
                    You may place an order for pickup or delivery through our website or by phone during store hours. All orders are subject to availability and confirmation. We reserve the right to refuse or cancel any order at any time for any reason.

                    <br /><br />Payment:<br />
                    Payment must be made in full at the time of placing your order. We accept cash, debit card, credit card, and online payments. All prices listed on our website are in Canadian dollars and are subject to applicable taxes and fees.

                    <br /><br />Delivery:<br />
                    We offer delivery within our designated delivery area for a fee. Delivery times may vary based on order volume and traffic conditions. We are not responsible for delays caused by traffic, weather, or other factors beyond our control. Delivery orders must meet the minimum order amount for delivery, which may vary by location.

                    <br /><br />Pickup:<br />
                    You may pick up your order at our restaurant during store hours. Please allow sufficient time for us to prepare your order. We are not responsible for any loss or damage to your order after it has been picked up.

                    <br /><br />Refunds and Returns:<br />
                    If you are unsatisfied with your order for any reason, please contact us immediately. We may offer a refund, store credit, or replacement at our discretion. We reserve the right to refuse refunds or returns for orders that have been partially or fully consumed.

                    <br /><br />Changes to Terms and Conditions:<br />
                    We reserve the right to update or modify these terms and conditions at any time without prior notice. By continuing to use our website or place orders with us, you agree to be bound by the updated or modified terms and conditions.

                    <br /><br />Thank you for choosing The Bombay. If you have any questions or concerns about these terms and conditions, please contact us.
                </Typography>
                <Typography marginTop={'1rem'} textAlign='left'>
                    <br /><br /><b>Location:</b><br />
                    The Bombay is located at 123 Main Street, in the heart of downtown Toronto. Our restaurant is easily accessible by public transportation and has ample parking nearby.

                    <br /><br /><b>Store Hours:</b><br />

                    Monday to Thursday: 11:00 am to 10:00 pm<br />
                    Friday: 11:00 am to 11:00 pm<br />
                    Saturday: 12:00 pm to 11:00 pm<br />
                    Sunday: 12:00 pm to 10:00 pm<br />
                    <br /><b>Phone:</b><br />
                    You can reach us by phone at (416) 555-1234. Our phone lines are open during store hours.

                    <br /><br /><b>Email:</b><br />
                    For general inquiries, you can email us at info@thebombayrestaurant.com. We typically respond to emails within 24 hours.

                    <br /><br /><b>Online:</b><br />
                    You can also visit our website at www.thebombayrestaurant.com to view our menu, make a reservation, and place an order for pickup or delivery.

                    <br /><br /><b>Social Media:</b><br />
                    Follow us on social media to stay up to date on the latest news, specials, and promotions. You can find us on Facebook, Instagram, and Twitter.

                    <br /><br />We value your feedback and encourage you to share your thoughts and comments with us. Whether you have a question, suggestion, or simply want to let us know how we're doing, we're always happy to hear from you. Thank you for choosing The Bombay, and we look forward to serving you soon.
                </Typography>
            </Box>
            <Footer />
        </Box>
    )
}

export default About
