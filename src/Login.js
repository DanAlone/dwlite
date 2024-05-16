import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Grid, Header, Image, Message, Segment, Popup, Transition } from 'semantic-ui-react';
import ico from './images/dwlite.ico';
import PKG from '../package.json';
import CONF from './config.json';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import PostCall from './cmp/postcall.js';
import getTime from './cmp/getTime';

function Login() {
	const DEBUG = CONF.DEBUG || 0;
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [isLogged, setLogged] = useState(JSON.parse(localStorage.getItem("isLoggedin")) || false);
	const [token, setToken] = useState(localStorage.getItem("jwt") || "");
	const [user, setUser] = useState(localStorage.getItem("username") || "");

	const [buttonColor, setButtonColor] = useState("blue");
	const [btnloading, setBtnloading] = useState(false);
	const [showPassword, setShowPassword] = useState("password");
	const [showPasswordIcon, setShowPasswordIcon] = useState("lock");

	const handleShowPassword = () => {
		if (showPassword === "password") {
			setShowPassword("text");
			setShowPasswordIcon("eye");
			setContentMSG("Hide");
		} else {
			setShowPassword("password");
			setShowPasswordIcon("lock");
			setContentMSG("Show");
		}
	};

	const [message, setMessage] = useState("");
	const [msg, showMsg] = useState(true);

	const handleUsername = (e, data) => { setUsername(data.value); showMsg(true); setButtonColor("blue"); }
	const handlePassword = (e, data) => { setPassword(data.value); showMsg(true); setButtonColor("blue"); }

	const [contentMSG, setContentMSG] = useState("Show");

	const [visible, setVisible] = useState(false);

	const [rotate, setRotate] = useState("App-logo");

	function getLogin() {

		const params = { "U": username, "P": password, "K": "1" };
		const options = PostCall("login", params);

		setRotate("rotate");
		setBtnloading(true);

		axios(options)
			.then((res) => {
				var myLogin = [];

				(res.data.results !== undefined) ? myLogin = res.data.results : setMessage("ERROR: service not available") && showMsg(true)

				var ERR = myLogin[0].ERROR;

				(ERR !== "") ? showMsg(false) : setMessage(ERR) && showMsg(true)

				var status = myLogin[0].LOGIN;
				var tkn = myLogin[0].jwt;

				if ((status === "ok") && (tkn !== "")) {
					localStorage.setItem("jwt", tkn);
					localStorage.setItem("isLoggedin", true);
					localStorage.setItem("username", username);

					setToken(tkn)
					setLogged(true);
					setUser(username)
					setButtonColor("green");
					navigate("/home");
				} else {
					localStorage.removeItem("jwt");
					localStorage.removeItem("isLoggedin");
					localStorage.removeItem("username");
					setMessage(status);
					setToken("");
					setLogged(false);
					showMsg(false);
					setButtonColor("red");
				}

				if (DEBUG) console.log(getTime(), res.data.results);
			})
			.catch(error => {
				setMessage("ERROR: service not available");
				showMsg(false);
				if (DEBUG) console.log(getTime(), error);
			})
			.finally(e => {
				setRotate("App-logo");
				setBtnloading(false);
			});
	};

	useEffect(() => {
		setVisible(true);

		if ((isLogged === true) && (token !== "") && (user !== "")) {
			if (DEBUG) console.log(getTime(), "u: " + user + ", Logged: " + isLogged);
			navigate("/home");
		}
		return () => {
			setBtnloading(false);
			setRotate("App-logo");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh', margin: '0px' }}>
				<Transition visible={visible} animation="drop" duration={1000}>
					<Grid.Column className="login_grid">
						<Header id="login_header" as='h3' textAlign='left'>
							<Image id="main_logo_login" src={ico} alt="dwlite.ico" className={rotate} />
							<div className="content text">
								DWLite&reg;
							</div>
						</Header>
						<Form onSubmit={() => getLogin()}>
							<Segment basic>
								<Form.Field
									control={Input}
									fluid
									icon='user'
									iconPosition='left'
									placeholder='Username'
									required
									value={username}
									onChange={handleUsername}
								/>
								<Popup header="double click to:" content={contentMSG} position="top center" trigger={
									<Form.Field
										control={Input}
										fluid
										icon={showPasswordIcon}
										onDoubleClick={handleShowPassword}
										iconPosition='left'
										placeholder='Password'
										type={showPassword}
										required
										value={password}
										onChange={handlePassword}
									/>
								} inverted />

								<Button loading={btnloading} color={buttonColor} type="submit" inverted fluid size='large'>
									Login
								</Button>

								<Message
									hidden={msg}
									color="red"
									floating
								>
									{message}
								</Message>
							</Segment>
						</Form>
						<div id="info_version">DWLite&reg; R. {PKG.version}</div>
					</Grid.Column>
				</Transition>
			</Grid>
		</>
	)
}

export default Login;
