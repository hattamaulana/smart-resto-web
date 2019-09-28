import React, { Component } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Container, Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Typography,
    Card, CardActionArea, CardMedia, CardContent, CardActions
} from '@material-ui/core'
import _ from 'lodash'
import { Header } from '../component/core'
import { FirebaseApp } from '../../config/Firebase'

class Task extends Component {
    constructor(props) {
        super(props);

        this.firebase = new FirebaseApp();
        this.state = {
            margin: 250,
            data: [],
            orderId: '', orders: [],
        }
    }

    componentDidMount() {
        this.firebase.queue.on('value', (snapshot) => {
            let list = [];

            if (snapshot.hasChildren()) {
                snapshot.forEach((result) => {
                    if(list.length === 0)
                        this.setState({
                            orderId: result.key,
                            orders: result.val().orders
                        });

                    console.log(result.key)

                    let temp = result.val();

                    temp.id = result.key;
                    list.push(temp);

                    this.setState({
                        data: list,
                        margin: 100
                    }); })
            } else {
                this.setState({
                    data: [],
                    orderId: '', orders: [],
                    margin: 250
                })
            }
        })
    }

    listOnClicked(event, id, data) {
        this.setState({ orderId: id, orders: data })
    }

    render() {
        const data = this.state.data;
        const orders = this.state.orders;
        const margin = this.state.margin;

        const btnReadyClicked = (event) => {
            this.firebase.queue
                .child(this.state.orderId)
                .remove()
        };

        const classes = makeStyles(theme => ({
            root: {
                width: '100%',
                marginTop: theme.spacing(3),
                overflowX: 'auto',
                flexGrow: 2,
            },

            table: {
                minWidth: "auto",
            },
        }));

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

        const mainView = () => {
            if(data.length > 0) {
                return (
                    <Grid container justify="center" spacing={3}>
                        <Grid gutterBottom key={0} item >
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" align={"center"}>
                                        PANGGILAN
                                    </Typography>

                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="left">No. Meja</StyledTableCell>
                                                <StyledTableCell align="left">Catatan</StyledTableCell>
                                                <StyledTableCell align="left" />
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            { orders.map((result) => (
                                                <TableRow key={_.uniqueId('id_')} selected="true">
                                                    <TableCell align="left"> {result.menu.name} </TableCell>
                                                    <TableCell align="left"> {result.count} </TableCell>
                                                    <TableCell align="right">
                                                        <Button variant="contained" color="primary" className={classes.button}
                                                                onClick={event => btnReadyClicked(event)} >
                                                            SELESAI
                                                        </Button>
                                                    </TableCell>
                                                </TableRow >
                                            )) }
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid key={1} item>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" align={"center"}>
                                        PESANAN SIAP
                                    </Typography>

                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="left">No. Meja</StyledTableCell>
                                                <StyledTableCell align="left">Nama</StyledTableCell>
                                                <StyledTableCell align="left">Cashback</StyledTableCell>
                                                <StyledTableCell align="left" />
                                                <StyledTableCell align="left" />
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            { orders.map((result) => (
                                                <TableRow key={_.uniqueId('id_')} selected="true">
                                                    <TableCell align="left"> 01 </TableCell>
                                                    <TableCell align="left" xs={5}> Atta Halilintar </TableCell>
                                                    <TableCell align="left"> Rp 500 </TableCell>
                                                    <TableCell align="left">
                                                        <Button variant="contained" color="primary"
                                                                className={classes.button}
                                                                onClick={event => btnReadyClicked(event)} >
                                                            Detail
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Button variant="contained" color="primary"
                                                                className={classes.button}
                                                                onClick={event => btnReadyClicked(event)} >
                                                            SELESAI
                                                        </Button>
                                                    </TableCell>
                                                </TableRow >
                                            )) }
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )
            }
        };

        return (
            <Container style={{ marginTop: margin+'px' }} maxWidth="lg" >
                <Header />

                <Box m={2}>
                    <Grid container className={classes.root}>
                        <Grid item xs={12} >
                            { mainView() }
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        )
    }
}

export default Task
