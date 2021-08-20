import {Container, CssBaseline, TextField, Typography, Grid, Button, Link, Icon} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyle = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(1, 0 ,6),
        width: '30%',
        marginTop: '1.5%'
      },
      itemStyle:{
          textAlign: 'center'
      },
      containerStyle:{
        display: 'flex',
        alignItems: 'center',
      

      }
      
}));

export default function CreateTask() {
    const classes = useStyle();
    const value = '';
    const setValue = '';

    return (
       <Grid container style={{margin: 25}} className={classes.containerStyle}>
           
           <Grid container spacing={4} >
            <Grid item xs={8}>
                <TextField 
                name='taskName'
                variant='outlined'
                id='taskName'
                label='Task Name'
                fullWidth
                />             
            </Grid>
           
            <Grid item xs={8}>
            <TextField 
                name='taskDescription'
                variant='outlined'
                id='taskDescription'
                label='Description'
                fullWidth
                />
            </Grid>
            <Button
                xs={4}
            
                className={classes.submit}
                type="submit"
                variant="contained"
                color="secondary"
                >Enter</Button>
           
           </Grid>
               
       </Grid>

       
        
    )
} 
