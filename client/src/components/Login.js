
import {Container, CssBaseline, TextField, Typography, Grid, Button, Link, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import image from '../images/signin-img1.jpg';


const useStyles = makeStyles((theme) => ({
   
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
export default function Login () {
    const classes = useStyles();

    return(
        <Container component="div" maxWidth="xs" >
            <Typography className={classes.paper} component="h1" variant="h5">
                Login
            </Typography>
            <form>
                <Grid container spacing={2}>
              
                    <Grid item xs={12}>
                        <TextField
                        variant= "outlined"
                        required
                        fullWidth
                        id="userName"
                        name="userName"
                        autoComplete="uname"
                        label="Username"/>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        variant= "outlined"
                        required
                        fullWidth
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        label="Password"/>
                    </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                > Sign Up</Button>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Link href="#" variant="body2">
                        Dont have an account? Sign up
                        </Link>
                    </Grid>
                </Grid>
                </Grid>

            </form>

        </Container>
    )

}
