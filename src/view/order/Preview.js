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
         data : []
      }
   }

   setData(data, id, name, price, count) {
         data.push({ id, name, price, count })
         return data
   }

   componentDidMount() {
      this.firebase.queue.on('value', (snapshot) => {
         if (Object.keys(snapshot).length > 0) {
            snapshot.forEach((result) => {
               var temp = this.state.data
               this.setState({ data: this.setData(temp, result.key, result.val().name, result.val().price, result.val().count) })
            })
         }
      })
   }

   render(){
      const data = this.state.data
      const payment = 0
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

      // const getData = () => {
      //    if(Object.keys(data).length > 0) {
      //       )
      //    }
      // }
      
      return (
         <Container maxWidth="md">
            <Paper className={classes.root}>
               <Table className={classes.table}>
                  <TableHead>
                     <TableRow>
                        <TableCell align="right">Nama</TableCell>
                        <TableCell align="right">Harga</TableCell>
                        <TableCell align="right">Jumlah</TableCell>
                        <TableCell align="right">Total</TableCell>
                     </TableRow>
                  </TableHead>

                  <TableBody>
                     {data.map(result => (
                        <TableRow key={result.id}>
                           <TableCell component="th" scope="row"> {result.name} </TableCell>
                           <TableCell align="right">Rp. {result.price} </TableCell>
                           <TableCell align="right"> {result.count} </TableCell>
                           <TableCell align="right">Rp. {result.price * result.count} </TableCell>
                        </TableRow >
                     )) }

                     <TableRow>
                        <TableCell component="th" scope="row"> Total </TableCell>
                        <TableCell align="right"> </TableCell>
                        <TableCell align="right"> </TableCell>
                        <TableCell align="right">Rp. {payment} </TableCell>
                     </TableRow>
                  </TableBody>
               </Table>
            </Paper>
         </Container>
      )
   }
}

export default Preview
