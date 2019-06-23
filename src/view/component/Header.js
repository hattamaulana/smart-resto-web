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
            <Typography variant="h3" style={{ color: '#636b6f' }}>
              KANTIN PINTAR
              </Typography>
          </Grid>
        </Grid>

        <Grid container justify="center">
          <Grid items>
            <Typography variant="subtitle1" style={{ color: '#636b6f' }}>
              Kantin Pintar Merupakan Inovasi Teknologi Informasi Masa Kini
              </Typography>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default Header