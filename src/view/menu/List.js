import React, { Component } from 'react'
import { Container, Box, Table, TableHead, TableBody, TableCell, TableRow, withStyles, makeStyles, Paper, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import QRCode from 'qrcode.react'
import { FirebaseApp } from '../../config/Firebase';

class List extends Component {
  constructor(props) {
    super(props)
    this.fireabase = new FirebaseApp()
    this.state = { data: [] }
  }

  componentDidMount() {
    this.fireabase.menu.get().then((snapshot) => {
      var list = []
      if(snapshot.size > 0) {
        snapshot.forEach((doc) => {
          var temp = doc.data()
          temp.id = doc.id
          list.push(temp)
          this.setState({ data: list })
        })
      }
    })
  }

  render() {
    const data = this.state.data

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

    const classes = makeStyles(theme => ({
      root: {
        width: '100%',
        marginTop: theme.spacing(2),
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
      icon: {
        margin: theme.spacing(1),
        fontSize: 32,
      },
    }))

    return (
      <Container width={1} >
        <Box mt={5} width={1}>
          <Grid container justify="center">
            <Grid item xs={7}>
              <Paper>
                <Table className={classes.table}>
                  <TableHead component="thead">
                    <TableRow variant="head" >
                      <StyledTableCell align="center" variant="head"> QR Code </StyledTableCell>
                      <StyledTableCell align="left" variant="head"> Nama </StyledTableCell>
                      <StyledTableCell align="left" variant="head"> Harga </StyledTableCell>
                      <StyledTableCell align="left" variant="head"> Edit </StyledTableCell>
                      <StyledTableCell align="left" variant="head"> Hapus </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      data.map(result => (
                        <TableRow key={result.id} >
                          <TableCell component="th" scope="row" align="center"> 
                            <QRCode value={result.id} style={{ width: '75px', height: '75px' }} />
                          </TableCell>

                          <TableCell component="th" scope="row"> {result.name} </TableCell>
                          <TableCell align="left">Rp. {result.price} </TableCell>

                          <TableCell align="center">
                            <EditIcon className={classes.icon} />
                          </TableCell>

                          <TableCell align="center">
                            <DeleteIcon className={ classes.icon } />
                          </TableCell>
                        </TableRow >
                      ))
                    }
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    )
  }
}

export default List