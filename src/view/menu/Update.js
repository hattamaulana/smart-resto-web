import React, { Component } from 'react'
import {  
  makeStyles , Grid, Paper, TextField, Typography, Button, Box, Container  
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { FirebaseApp } from '../../config/Firebase'

class Update extends Component {
  constructor(props){
    super(props)

    const data = this.props.data
    this.firebase = new FirebaseApp()
    this.state = { name: data.name, price: data.price, redirect: false, doc: this.props.data.id }
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
    this.firebase.menu.doc(this.state.doc).set({
      name: this.state.name,
      price: parseInt(this.state.price),
      imgUri: ''
    }).then(ref => this.props.evt(false))
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

    if(this.state.redirect) 
      return <Redirect to="/menu" />

    return (
      <Container>
        <Grid container justify="center" alignItems="center" className={classes.root} style={{ marginTop: '10px' }} >
          <Grid item xs="4">
            <Paper style={{ paddingTop: '25px', paddingBottom: '25px' }}>
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
                  UPDATE
              </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default Update