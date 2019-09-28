import React, { Component } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Container, Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button,
} from '@material-ui/core'
import _ from 'lodash'
import { Header } from '../component/core'
import { FirebaseApp } from '../../config/Firebase'

class Queue extends Component {
   constructor(props) {
      super(props);

      this.firebase = new FirebaseApp();
      this.state = { 
          margin: 250, 
          data: [],
          orderId: '', orders: [],
        }
   }

   componentDidMount() {
      this.firebase.queue.on('value', (snapshot) => {
          let list = [];

          if (snapshot.hasChildren()) {
            snapshot.forEach((result) => {
               if(list.length === 0)
                  this.setState({
                      orderId: result.key,
                      orders: result.val().orders
                  });

                console.log(result.key)

               let temp = result.val();

               temp.id = result.key;
               list.push(temp);

               this.setState({
                   data: list,
                   margin: 100
               }); })
         } else {
             this.setState({
                 data: [],
                 orderId: '', orders: [],
                 margin: 250
             })
         }
      })
   }

   listOnClicked(event, id, data) {
      this.setState({ orderId: id, orders: data })
   }

   render() {
      const data = this.state.data;
      const orders = this.state.orders;
      const margin = this.state.margin;

      const btnReadyClicked = (event) => { 
        this.firebase.queue
            .child(this.state.orderId)
            .remove()
      };

      const classes = makeStyles(theme => ({
         root: {
            width: '99%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
            flexGrow: 1,
         },

         table: {
            minWidth: 650,
         },
      }));

      const StyledTableCell = withStyles(theme => ({
         head: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            fontWeight: "bold",
            fontSize: 16,
         },

         body: {
            fontSize: 14,
            fontWeight: "bold"
         },
      }))(TableCell);

      const mainView = () => {
        if(data.length > 0) {
          return (
              <Grid container justify="center" spacing={5}>
                <Grid key={0} item xs={3}>
                  <Paper className={classes.root}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">NAMA ANTRIAN</StyledTableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {data.map(result => (
                          <TableRow key={_.uniqueId('id_')} hover >
                            <TableCell component="th" scope="row"
                              onClick={event => this.listOnClicked(event, result.id, result.orders)}>
                              {result.name}
                            </TableCell>
                          </TableRow >
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </Grid>

                <Grid key={1} item xs={5}>
                  <Paper className={classes.root}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">Menu Pesanan</StyledTableCell>
                          <StyledTableCell align="left">Jumlah Pesanan</StyledTableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                          { orders.map((result) => (
                              <TableRow key={_.uniqueId('id_')} selected="true">
                                  <TableCell align="left"> {result.menu.name} </TableCell>
                                  <TableCell align="left"> {result.count} </TableCell>
                              </TableRow >
                          )) }

                          <TableRow>
                              <TableCell align="left">
                                  <Button variant="contained" color="primary" className={classes.button}
                                      onClick={event => btnReadyClicked(event)} >
                                      PESANAN SIAP
                                  </Button>
                              </TableCell>
                          </TableRow >
                      </TableBody>
                    </Table>
                  </Paper>
                </Grid>
              </Grid>
          )
        }
      };

      return (
        <Container style={{ marginTop: margin+'px' }} maxWidth="lg" >
          <Header />

          <Box m={2}>
            <Grid container className={classes.root}>
              <Grid item xs={12} >
                { mainView() }
              </Grid>
            </Grid>
          </Box>
        </Container>
      )
   }
}

export default Queue
