import React, { Component, useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';
import { FirebaseApp } from '../../config/Firebase';
import {
    Container, Grid,
    Table, TableHead, TableBody, TableCell, TableRow,
    withStyles, makeStyles,
    TextField, Button,
    Card, CardContent,
    Typography,
    Dialog
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Header from '../component/Header';
import PrintPreview from "./PrintPreview";

class List extends Component {
  constructor(props) {
    super(props);

    this.fireabase = new FirebaseApp();
    this.state = {
      data: [], page: 1,
      open: false,
    };
  }

  componentDidMount() {
    this.fireabase.menu.get().then((snapshot) => {
      var list = [];

      if(snapshot.size > 0) {
        snapshot.forEach((doc) => {
          var temp = doc.data();
          temp.id = doc.id;
          list.push(temp);
          this.setState({ data: list })
        })
      }
    })
  }

  render() {
    const data = this.state.data;
    const page = this.state.page;
    const open = this.state.open;

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

      closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
    }));
    const StyledTableCell = withStyles(theme => ({
      head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: "bold",
        fontSize: 16,
      },

      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 50,
      },

      body: {
        fontSize: 14,
        fontWeight: "bold"
      },
    }))(TableCell);

    const onChange = (event) => { this.setState({ page: event.target.value }) };

    /**
     * @override Dialog
     */
    const DialogTitle = withStyles(classes)(props => {
      const { children, classes } = props;

      return (
          <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
          </MuiDialogTitle>
      );
    });
    const DialogContent = withStyles(theme => ({
      root: {
        padding: theme.spacing(2),
      },
    }))(MuiDialogContent);
    const DialogActions = withStyles(theme => ({
      root: {
        margin: 0,
        padding: theme.spacing(1),
      },
    }))(MuiDialogActions);

    const handleClickOpen = () => { this.setState({ open: true }); };
    const handleClose = () => { this.setState({open: false}) };

    return (
        <Container width={1} >
          <Header />

            <Grid container justify="center" style={{ marginBottom: '100px'}}>
              <Grid item xs={7} >
                <Card className={classes.root}>
                  <CardContent style={{marginLeft: "25px"}}>
                    <div style={{width: '100px'}}>
                      <QRCode value={"1"} style={{ float: "left", width: '95px', height: '95px' }} />
                      <Typography>
                        No. Meja : 1
                      </Typography>
                    </div>
                  </CardContent>

                  <CardContent>
                    <Table gutterBottom className={classes.table}>
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
                                  <QRCode value={"1-" + result.id} style={{ width: '50px', height: '50px' }} />
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
                  </CardContent>

                  <CardContent>
                    <Link to="/menu/new">
                      <Button variant="contained" color="primary">
                        TAMBAH MENU BARU
                      </Button>
                    </Link>

                    <div style={{ float: 'right'}}>
                      <TextField
                          id="standard-password-input" label="Banyak Meja" value={page}
                          className={classes.textField}
                          type="number" margin="normal"
                          onChange={ event => onChange(event) }
                          style={{ marginLeft: '10px', marginRight: '10px', marginTop: '-10px' }}
                      />

                      <Button variant="contained" color="primary" onClick={handleClickOpen}>
                        PRINT
                      </Button>

                      <Dialog onClose={handleClose} open={open}
                              fullWidth={true} maxWidth={"md"}
                              aria-labelledby="customized-dialog-title"
                      >
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                          Modal title
                        </DialogTitle>
                        <DialogContent dividers>
                          <PrintPreview page={page} data={data} />
                        </DialogContent>

                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            PRINT
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>

                  </CardContent>
                </Card>
              </Grid>
            </Grid>
        </Container>
    )
  }
}

export default List