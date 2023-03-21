import { Box, Typography } from '@mui/material'
import React from 'react'
import Footer from '../Footer'
import image from '../../Assets/paper.jpg'
const About = () => {
    return (
        <Box>
            <Box paddingY={'2rem'} paddingLeft={'2rem'} paddingRight={'6rem'} width={'70%'} margin='auto' minHeight={'100vh'}
                sx={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                }}
            >
                <Typography
                    marginTop={'1rem'}
                    
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, consequuntur omnis eaque officia aliquam fuga suscipit ut veniam adipisci, totam consectetur aliquid expedita ad voluptate pariatur unde, odio dolorum vitae dolore. Sed atque soluta nulla. Numquam voluptatibus molestias in laborum deleniti nihil iusto eos. Cumque natus, omnis reprehenderit itaque excepturi repellendus amet! Dolore mollitia eos dicta cum debitis. Totam eveniet corporis quia consequuntur numquam ipsa accusamus quam debitis, assumenda veritatis dolorum, ratione laboriosam? Saepe voluptatem error, tenetur possimus sit quod perspiciatis nesciunt. Sunt, amet voluptatibus fugit quos laborum itaque ipsa quisquam dignissimos recusandae! Iste, non accusantium temporibus amet, magni provident dolor nemo repellat tempora possimus cupiditate laboriosam doloribus enim voluptatum, explicabo impedit. Amet facilis minus aspernatur incidunt maiores assumenda atque commodi repellat sint nihil, velit earum ea asperiores? Dolorem officiis saepe quos temporibus similique reprehenderit ut, nemo modi, quas voluptate dolorum ipsam tempora ducimus iure! Dignissimos itaque repudiandae repellendus dolor!</Typography>

                <Typography
                    marginTop={'1rem'}
                    
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quas odio ab reiciendis voluptas, aliquid necessitatibus accusantium perspiciatis tempora molestiae beatae iste nostrum, distinctio repellendus. Excepturi aliquam fugit optio, laudantium minus dolores perferendis beatae! Porro ratione, et a sapiente error reiciendis saepe iure esse perspiciatis dolore sequi eum provident numquam alias laborum veritatis necessitatibus suscipit hic cum ipsum ab maiores magni dicta nisi. Distinctio, eveniet totam. Perspiciatis vitae necessitatibus dolores iusto, ratione non placeat? Libero vero eos obcaecati veniam, fugit itaque quasi consequuntur aliquid iste! Saepe hic ut consequatur possimus! Incidunt, odio amet numquam voluptatibus ab facilis rerum ea dolores.
                </Typography>
            </Box>
            <Footer />
        </Box>
    )
}

export default About
