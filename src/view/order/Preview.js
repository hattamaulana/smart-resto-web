import React, { Component } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Container } from '@material-ui/core'

import { FirebaseApp } from '../../config/Firebase'

class Preview extends Component {
   constructor(props) {
      super(props)

      this.firebase = new FirebaseApp()
      this.state = {
         data : [],
         totalPayment: 0
      }
   }

   componentDidMount() {
      var payment = 0

      this.firebase.queue.on('value', (snapshot) => {
         var list = []

         if (Object.keys(snapshot).length > 0) {
            snapshot.forEach((result) => { 
               list.push(result.val())
               this.setState({ data: list })

               payment += result.val().price * result.val().count
               this.setState({ totalPayment: payment })
            })
         }
      })
   }

   render(){
      const data = this.state.data
      const payment = this.state.totalPayment
      const classes = makeStyles(theme => ({
         root: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
         },
         table: {
            minWidth: 650,
         },
      }))
      
      return (
         <Container maxWidth="md">
            <Paper className={classes.root}>
               <Table className={classes.table}>
                  <TableHead>
                     <TableRow>
                        <TableCell align="left">Nama</TableCell>
                        <TableCell align="left">Harga</TableCell>
                        <TableCell align="left">Jumlah</TableCell>
                        <TableCell align="left">Total</TableCell>
                     </TableRow>
                  </TableHead>

                  <TableBody>
                     { data.map(result => (
                        <TableRow key={result.id}>
                           <TableCell component="th" scope="row"> {result.name} </TableCell>
                           <TableCell align="left">Rp. {result.price} </TableCell>
                           <TableCell align="left"> {result.count} </TableCell>
                           <TableCell align="left">Rp. {result.price * result.count} </TableCell>
                        </TableRow >
                     )) }

                     <TableRow>
                        <TableCell component="th" scope="row"> Total </TableCell>
                        <TableCell align="right"> </TableCell>
                        <TableCell align="right"> </TableCell>
                        <TableCell align="left">
                           Rp. { payment }
                        </TableCell>
                     </TableRow>
                  </TableBody>
               </Table>
            </Paper>
         </Container>
      )
   }
}

export default Preview
