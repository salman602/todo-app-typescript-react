import React from 'react'
import { Flex, Image } from '@chakra-ui/react'
import logo from '../assets/logo.png'
const Header = () => {
    return (
        <div>
            <header>
                <Flex align="center" justify="center">
                    <Image src={logo} w="150px" h="100px" />
                </Flex>
            </header>
        </div>
    )
}

export default Header