import {Container, CssBaseline, TextField, Typography, Grid, Button, Link} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      }
      

}));


export default function Login() {
    const classes = useStyle();

    return(
        <Container component="div" maxWidth="xs" >
            <Typography className={classes.paper} component="h1" variant="h5">
                Sign Up
            </Typography>
            <form>
                <Grid className={classes.form} container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete= "fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autofocus/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        variant= "outlined"
                        required
                        fullWidth
                        id="lastName"
                        name="lastName"
                        autoComplete="lname"
                        label="Last Name"/>
                    </Grid>
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
                        label="password"/>
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
                        Already have an account? Sign in!
                        </Link>
                    </Grid>
                </Grid>
                </Grid>

            </form>

        </Container>
    )


}
