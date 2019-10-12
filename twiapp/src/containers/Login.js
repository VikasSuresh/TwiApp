import React from "react";

const Login=()=>(
    <div className="container" >	
	<div className="wrapper">
		<div id="login" className="col-md-12">
			<form  action="#" autocomplete="on"> 
				<h1>Log in</h1> 
				<p> 
					<label for="username" className="uname" data-icon="u" > Your email or username: </label>
					<input id="username" name="username" required="required" type="text" placeholder="Username or mail"/>
				</p>
				<p> 
					<label for="password" className="youpasswd" data-icon="p"> Your password: </label>
					<input id="password" name="password" required="required" type="password" placeholder="eg. X8df!90EO" /> 
				</p>
				<p class="keeplogin"> 
					<input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" /> 
					<label for="loginkeeping">Keep me logged in</label>
				</p>
				<p class="login button"> 
					<input type="submit" value="Login" /> 
				</p>
				<p class="change_link">
					Not a member yet ?
					<a href="/register" class="to_register">Join us</a>
				</p>
			</form>
        </div>
    </div>
    </div>
)

export default Login;