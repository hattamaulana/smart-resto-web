import React, { Component } from 'react'
import { 
  withStyles, makeStyles 
} from '@material-ui/core/styles'
import {
  Container, TableFooter, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, 
} from '@material-ui/core'
import { FirebaseApp } from '../../config/Firebase'
import { Header } from '../component/core';

class Preview extends Component {
   constructor(props) {
      super(props)
      this.firebase = new FirebaseApp()
      this.state = { data : [], totalPayment: 0, margin: 250 }
   }

   componentDidMount() {
      this.firebase.checkout.on('value', (snapshot) => {
         var list = []
         if (snapshot.hasChildren()) {
           var payment = 0
           snapshot.forEach((result) => {
               list.push(result.val())
               payment += result.val().price * result.val().count

              this.setState({ margin: 100, data: list, totalPayment: payment })
            })
         } else
           this.setState({ data: [], margin: 250 })
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
