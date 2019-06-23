import React, { Component } from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Container, TableFooter } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { FirebaseApp } from '../../config/Firebase'
import { Header } from '../component/core';

class Preview extends Component {
   constructor(props) {
      super(props)
      this.firebase = new FirebaseApp()
      this.state = { data : [], totalPayment: 0, margin: 250 }
   }

   componentDidMount() {
      var payment = 0
      this.firebase.checkout.on('value', (snapshot) => {
         var list = []
         if (snapshot.hasChildren()) {
           snapshot.forEach((result) => {
              this.setState({ margin: 100 })
               list.push(result.val())
               this.setState({ data: list })

               payment += result.val().price * result.val().count
               this.setState({ totalPayment: payment })
            })
         } else {
           this.setState({ data: [] })
           this.setState({ margin: 250 })
         }
      })
   }

   render(){
      const margin = this.state.margin
      const data = this.state.data
      const payment = this.state.totalPayment

      const classes = makeStyles(theme => ({
         root: {
            width: '100%',
            marginTop: theme.spacing(2),
            overflowX: 'auto',
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

      const view = () => {
        if(data.length > 0) {
          return (
            <Paper>
              <Table className={classes.table}>
                <TableHead component="thead">
                  <TableRow variant="head" >
                    <StyledTableCell align="left" variant="head"> Menu </StyledTableCell>
                    <StyledTableCell align="left" variant="head"> Harga </StyledTableCell>
                    <StyledTableCell align="left" variant="head"> Jumlah </StyledTableCell>
                    <StyledTableCell align="left" variant="head"> Total </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(result => (
                    <TableRow key={result.id} >
                      <TableCell component="th" scope="row"> {result.name} </TableCell>
                      <TableCell align="left">Rp. {result.price} </TableCell>
                      <TableCell align="left"> {result.count} </TableCell>
                      <TableCell align="left">Rp. {result.price * result.count} </TableCell>
                    </TableRow >
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow selected="true" variant="body">
                    <TableCell align="left" variant="footer">
                      <Typography variant="subtitle1"> Total </Typography>
                    </TableCell>
                    <TableCell align="right">. </TableCell>
                    <TableCell align="right">. </TableCell>
                    <TableCell align="left">
                      <Typography variant="subtitle1"> Rp. {payment} </Typography>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          )
        }
      }
      
      return (
        <Container 
          maxWidth="lg"
          style={{ marginTop: margin+'px' }}
        >
          <Header />

          <Box>
              { view() }
          </Box>
        </Container>
      )
   }
}

export default Preview
