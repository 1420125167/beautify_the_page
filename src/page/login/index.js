import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { PureComponent } from 'react'

const theme = createTheme()

class Login extends PureComponent {
	handleOnChange = event => {
		this.account = event.target.value
		console.log(this.account)
	}
	
	render() {
		const { loginStatue, login } = this.props
		if (!loginStatue) {
			return (
				<ThemeProvider theme={theme}>
					<Container component='main' maxWidth='xs'>
						<CssBaseline />
						<Box
							sx={{
								marginTop: 8,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component='h1' variant='h5'>
								登录
							</Typography>
							<Box component='form' noValidate sx={{ mt: 1 }}>
								<TextField
									margin='normal'
									required
									fullWidth
									label='账号'
									autoFocus
									onChange={event => {
										this.account = event.target.value
									}}
								/>
								<TextField
									margin='normal'
									required
									fullWidth
									label='密码'
									type='password'
									onChange={event => {
										this.password = event.target.value
									}}
								/>
								<Button
									fullWidth
									variant='contained'
									sx={{ mt: 3, mb: 2 }}
									onClick={() => login(this.account, this.password)}
								>
									登录
								</Button>
								<Grid container>
									<Grid item xs>
										<Link href='/modify' variant='body2'>
											忘记密码
										</Link>
									</Grid>
									<Grid item>
										<Link href='/register' variant='body2'>
											注册
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Container>
				</ThemeProvider>
			)
		} else {
			return <Redirect to='/'/>
		}
	}
}
const mapState = (state) => ({
	loginStatue: state.getIn(['login', 'login']),
	alert: state.getIn(['login', 'alert'])
});
const mapDispatch = (dispatch) => ({
	login(accountElement, passwordElem) {
		dispatch(actionCreators.login(accountElement, passwordElem))
	},
	handleClose() {
		dispatch(actionCreators.closeAlert())
	}
});
export default connect(mapState, mapDispatch)(Login);