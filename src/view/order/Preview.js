import React, { Component } from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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

      this.firebase.checkout.on('value', (snapshot) => {
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
            marginTop: theme.spacing(10),
            overflowX: 'auto',
         },
         table: {
            minWidth: 650,
         },
         container: {
            marginTop: theme.spacing(10)
         }
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
         <Container maxWidth="md" className={classes.container}>
            <Paper>
               <Table className={classes.table}>
                  <TableHead component="thead">
                     <TableRow variant="head" >
                        <StyledTableCell align="left" variant="head">
                           Menu
                        </StyledTableCell>

                        <StyledTableCell align="left" variant="head">
                           Harga
                        </StyledTableCell>

                        <StyledTableCell align="left" variant="head">
                           Jumlah
                        </StyledTableCell>

                        <StyledTableCell align="left" variant="head">
                           Total
                        </StyledTableCell>
                     </TableRow>
                  </TableHead>

                  <TableBody>
                     { data.map(result => (
                        <TableRow key={result.id} >
                           <TableCell component="th" scope="row"> {result.name} </TableCell>
                           <TableCell align="left">Rp. {result.price} </TableCell>
                           <TableCell align="left"> {result.count} </TableCell>
                           <TableCell align="left">Rp. {result.price * result.count} </TableCell>
                        </TableRow >
                     )) }

                     <TableRow selected="true" variant="body">
                        <TableCell align="left" variant="footer"> 
                           <Typography variant="subtitle1">
                              Total
                           </Typography>
                        </TableCell>
                        <TableCell align="right"> </TableCell>
                        <TableCell align="right"> </TableCell>
                        <TableCell align="left">
                           <Typography variant="subtitle1">
                              Rp. {payment}
                           </Typography>
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
