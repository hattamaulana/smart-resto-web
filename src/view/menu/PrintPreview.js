import React, { Component } from 'react'
import QRCode from 'qrcode.react'
import { Link } from 'react-router-dom'
import {
    Container,
    Box,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    withStyles,
    makeStyles,
    Grid, Typography
} from '@material-ui/core';

class PrintPreview extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.data)
        this.state = {  }
    }

    render() {
        const data = this.props.data;
        const page = this.props.page;

        /**
         * Stylesheet
         */
        const classes = makeStyles(theme => ({
            root: {
                width: '100%',
                marginTop: theme.spacing(2),
                overflowX: 'auto',
            },

            table: {
                width: '100%',
            },

            icon: {
                margin: theme.spacing(1),
                fontSize: 32,
            },
        }));
        const StyledTableCell = withStyles(theme => ({
            head: {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                fontWeight: "bold",
                fontSize: 24,
            },

            body: {
                fontSize: 20,
            }
        }))(TableCell);

        return (
            <Grid container>
                <Grid container style={{ marginBottom: '15px'}}>
                    <Grid items xs={3}>
                        <QRCode value={page} style={{ width: '95px', height: '95px' }} />
                        <Typography>
                            No. Meja : {page}
                        </Typography>
                    </Grid>

                    <Grid items xs={6}>
                        <Typography variant="h3"
                                    align={"center"}
                                    style={{ color: '#0984E3', fontFamily: 'Raleway', lineHeight: '100px' }} >
                            SMART-RESTO
                        </Typography>
                    </Grid>
                </Grid>

                <Table gutterBottom className={classes.table}>
                    <TableHead component="thead">
                        <TableRow variant="head" style={{ paddingTop: '100px'}} >
                            <StyledTableCell align="center" variant="head">
                                QR Code
                            </StyledTableCell>

                            <StyledTableCell align="left" variant="head">
                                Nama
                            </StyledTableCell>

                            <StyledTableCell align="left" variant="head" >
                                Harga
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>{
                        data.map(result => (
                            <TableRow key={data.id} >
                                <StyledTableCell align="center" variant="body">
                                    <QRCode value={page + "-" + result.id}
                                            style={{ width: '75px', height: '75px' }} />
                                </StyledTableCell>

                                <StyledTableCell align="left" variant="body">
                                    {result.name}
                                </StyledTableCell>

                                <StyledTableCell align="left" variant="body">
                                    Rp. {result.price}
                                </StyledTableCell>
                            </TableRow>
                        ))}</TableBody>
                </Table>
            </Grid>
        )
    }
}

export default PrintPreview