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
    Grid,
    Button,
    CardContent, Typography, Card
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
        }));

        const mainView = () => { return (
            <Box mt={5} width={1}>
                <Grid container justify="center">
                    <Grid item xs={7}>
                        <Card className={classes.root}>
                            <CardContent style={{marginLeft: "25px"}}>
                                <div style={{width: '100px'}}>
                                    <QRCode value={"1"}
                                            style={{ float: "left", width: '95px', height: '95px' }} />
                                    <Typography>
                                        No. Meja : { page }
                                    </Typography>
                                </div>
                            </CardContent>

                            <CardContent>
                                <Table gutterBottom className={classes.table}>
                                    <TableHead component="thead">
                                        <TableRow variant="head" >
                                            <StyledTableCell align="center" variant="head">
                                                QR Code
                                            </StyledTableCell>

                                            <StyledTableCell align="left" variant="head">
                                                Nama
                                            </StyledTableCell>

                                            <StyledTableCell align="left" variant="head">
                                                Harga
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>{
                                        data.map(result => (
                                            <TableRow key={data.id} >
                                                <TableCell>
                                                    <QRCode value={page+ "-" +result.id}
                                                            style={{ width: '50px', height: '50px' }} />
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {result.name}
                                                </TableCell>

                                                <TableCell align="left">
                                                    Rp. {result.price}
                                                </TableCell>
                                            </TableRow>
                                        ))}</TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        )};

        return (
            <Container width={1} >
                { mainView() }
            </Container>
        )
    }
}

export default PrintPreview