import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

import Root from '../view/Root'
import Preview from '../view/order/Preview'
import Queue from '../view/kitchen/Queue'

function RouteApp() {
   const classes = makeStyles(theme => ({
      root: {
         width: '100%',
         marginTop: theme.spacing(10),
         marginBottom: theme.spacing(10),
         overflowX: 'auto',
         flexGrow: 1,
      },
      wrapper: {
         marginTop: '100000px',
         marginBottom: theme.spacing(100)
      }
   }))

   return (
         <Router>
            <div style={{ marginTop: "50px", marginBottom: "25px" }}>
               <Grid container className={classes.root}>
                  <Grid item xs={12}>
                     <Grid container justify="center">
                        <Grid key={0} item>
                           <Typography variant="h3" component="h2" gutterBottom >
                              KANTIN PINTAR
                           </Typography>
                        </Grid>
                     </Grid>
                  </Grid>
               </Grid>
            </div>

            <Route exact path="/" component={Root} />
            <Route exact path="/order/preview" component={Preview} />
            <Route exact path="/order/add" />
            <Route exact path="/kitchen/queue" component={Queue} />
         </Router>
  )
}

export default RouteApp
