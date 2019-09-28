import React, { Component } from 'react'
import {
  Box, Grid, Typography, 
} from '@material-ui/core'

class Header extends Component {
  render() {
    return(
      <Box mt={5} mb={5}>
        <Grid container justify="center">
          <Grid items>
            <Typography variant="h2" style={{ color: '#0984E3', fontFamily: 'Raleway' }}>
              SMART-RESTO
              </Typography>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default Header