import React, { Component } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Container, Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography,
    Card, CardContent
} from '@material-ui/core'
import _ from 'lodash'
import { Header } from '../component/core'
import { FirebaseApp } from '../../config/Firebase'

class Task extends Component {
    constructor(props) {
        super(props);

        this.firebase = new FirebaseApp();
        this.state = {
            margin: 100,
            waiterHelper: [],
        }
    }

    componentDidMount() {
        this.firebase.waiterHelper.on('value', (snapshot) => {
            let list = [];

            if (snapshot.hasChildren()) {
                snapshot.forEach((result) => {
                    let temp = result.val();
                        temp.id = result.key;

                    list.push(temp);
                    this.setState({ waiterHelper: list})
                })
            } else this.setState({
                waiterHelper: []
            })
        });
    }

    render() {
        const margin = this.state.margin;
        const dataWaiterHelper = this.state.waiterHelper;

        // Stylesheet
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

        // function
        const taskDone = (event, id, db) => { db.child(id).remove() };

        const mainView = () => (
            <Grid container justify="center" spacing={3}>
                <Grid gutterBottom key={0} item sm={5} >
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
                                    { dataWaiterHelper.map((result) =>
                                        <TableRow key={_.uniqueId('id_')} selected="true">
                                            <TableCell align="left"> {result.noTable} </TableCell>
                                            <TableCell align="left"> {result.note} </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" color="primary" className={classes.button}
                                                        onClick={event =>
                                                            taskDone(event, result.id, this.firebase.waiterHelper)} >
                                                    SELESAI
                                                </Button>
                                            </TableCell>
                                        </TableRow >
                                    ) }
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
                                    {/*{ orders.map((result) => (*/}
                                    {/*    <TableRow key={_.uniqueId('id_')} selected="true">*/}
                                    {/*        <TableCell align="left"> 01 </TableCell>*/}
                                    {/*        <TableCell align="left" xs={5}> Atta Halilintar </TableCell>*/}
                                    {/*        <TableCell align="left"> Rp 500 </TableCell>*/}
                                    {/*        <TableCell align="left">*/}
                                    {/*            <Button variant="contained" color="primary"*/}
                                    {/*                    className={classes.button}*/}
                                    {/*                    onClick={event => btnReadyClicked(event)} >*/}
                                    {/*                Detail*/}
                                    {/*            </Button>*/}
                                    {/*        </TableCell>*/}
                                    {/*        <TableCell align="right">*/}
                                    {/*            <Button variant="contained" color="primary"*/}
                                    {/*                    className={classes.button}*/}
                                    {/*                    onClick={event => btnReadyClicked(event)} >*/}
                                    {/*                SELESAI*/}
                                    {/*            </Button>*/}
                                    {/*        </TableCell>*/}
                                    {/*    </TableRow >*/}
                                    {/*)) }*/}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );

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
