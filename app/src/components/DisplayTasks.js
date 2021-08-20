import {Container, Box, Button, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import React from 'react'
// import axios from 'axios';

 
const baseURL = 'http://localhost:5000';


const useStyle = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        borderColor: 'blue', 
        border: 1
      },
      containerFormat:{
          justifyContent: 'start'
      }
      
}));
export default function DisplayTasks() {
    const classes = useStyle();
    
    // axios
    // .get(`${baseURL}/tasks/all`)
    // .then(resp =>{
    //     console.log(resp);
    // })
    // .catch(err =>{
    //     console.log(err)
    // });

    return (
        <Grid container  spacing={2}  className={classes.containerFormat}> 
            <Box spacing={2} className={classes.paper}>
                <Grid item xs={6} className={classes.paper}>
                    text
                </Grid>
                <Grid item xs={6} className={classes.paper}>
                    poop
                </Grid>            
            </Box>
            <Box spacing={2} className={classes.paper}>
                <Grid item xs={6} className={classes.paper}>
                    text
                </Grid>
                <Grid item xs={6} className={classes.paper}>
                    poop
                </Grid>       

            </Box>
        </Grid>
    )
}

