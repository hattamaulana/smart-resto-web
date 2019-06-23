import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { FirebaseApp } from '../../config/Firebase'
import { Box, Container } from '@material-ui/core';
import { Header } from '../component/core';

class Add extends Component {
  constructor(props){
    super(props)
    this.firebase = new FirebaseApp()
    this.state = { name: '', price: '' }
    this.txtNameOnChange = this.txtNameOnChange.bind(this)
    this.txtPriceOnChange = this.txtPriceOnChange.bind(this)
  }

  txtNameOnChange(event) {
    this.setState({ name: event.target.value})
  }

  txtPriceOnChange(event) {
    this.setState({ price: event.target.value})
  }

  btnAddClicked(event) {
    this.firebase.menu.add({
      name: this.state.name,
      price: this.state.price,
      imgUri: ''
    }) // TODO And Success Listener and Failed Listerner
  }

  render() {
    const classes = makeStyles(theme => ({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      margin: {
        width: '100%'
      },
      textfield: {
        width: 90
      }
    }));

    return (
      <Container>
        <Header></Header>

        <Grid container justify="center" alignItems="center" className={classes.root} style={{ marginTop: '100px' }} >
          <Grid item xs="4">
            <Paper style={{ paddingTop: '25px', paddingBottom: '25px' }}>
              <Box m={1} width={1}>
                <Typography variant="h4" p={2} align="center" >
                  MENU BARU
              </Typography>
              </Box>

              <Box ml="15%" width="auto" mt={3}>
                <Grid item xs="10">
                  <TextField
                    fullWidth
                    label="Nama Menu"
                    value={this.state.name}
                    onChange={this.txtNameOnChange}
                    margin="normal"
                  />
                </Grid>
              </Box>

              <Box pl="15%" mb={3} width="auto">
                <Grid item xs="10">
                  <TextField
                    fullWidth
                    label="Harga"
                    value={this.state.price}
                    onChange={this.txtPriceOnChange}
                    width="100%"
                    margin="normal" />
                </Grid>
              </Box>

              <Box ml="15%" mb={3} width="auto">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={event => this.btnAddClicked(event)} >
                  TAMBAHKAN
              </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default Add