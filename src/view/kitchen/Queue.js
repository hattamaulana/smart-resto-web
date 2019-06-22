import React, { Component } from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import _ from 'lodash'

import { FirebaseApp } from '../../config/Firebase'

class Queue extends Component {
   constructor(props) {
      super(props)

      this.firebase = new FirebaseApp()
      this.state = {
         data: [],
         idDetails: '',
         details: [],
      }
   }

   componentDidMount() {
      this.firebase.queue.on('value', (snapshot) => {
         var list = []

         if (Object.keys(snapshot).length > 0) {
            snapshot.forEach((result) => {
               if(list.length === 0)
                  this.setState({ idDetails: result.key, details: result.val().menus})

               var temp = result.val()
               temp.id = result.key
               list.push(temp)
               
               this.setState({ data: list })
            })
         }
      })
   }

   listOnClicked(event, id, detail) {
      this.setState({ idDetails: id, details: detail })
   }

   render() {
      const data = this.state.data
      const details = this.state.details
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
      }))
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

      return (
         <Container maxWidth="lg">
            <Grid container className={classes.root} spacing={2}>
               <Grid item xs={12}>
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
                                       <TableCell
                                          component="th"
                                          scope="row"
                                          onClick={event => this.listOnClicked(event, result.id, result.menus)}
                                       >
                                          { result.name }
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
                                 {details.map(result => (
                                 <TableRow key={_.uniqueId('id_')} selected="true">
                                    <TableCell align="left"> {result.name} </TableCell>
                                    <TableCell align="left"> {result.count} </TableCell>
                                 </TableRow >
                              ))}

                                 <TableRow>
                                    <TableCell align="left">
                                       <Button variant="contained" color="primary" className={classes.button}>
                                          PESANAN SIAP
                                       </Button>
                                    </TableCell>
                                 </TableRow >
                              </TableBody>
                           </Table>
                        </Paper>
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
         </Container>
      )
   }
}

export default Queue
