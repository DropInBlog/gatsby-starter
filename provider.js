import React from 'react'
import { ThemeProvider } from "@chakra-ui/core"

export default ({ element }) => (
    <ThemeProvider>
        {element}
    </ThemeProvider>
)