import React from "react";
import { GoogleLogin } from "react-google-login";

const clientId = "164930671293-is8undhuc64bnmhmvrub7e317lhv0v95.apps.googleusercontent.com";

const LoginGG = () => {
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profiledbj);
    }
    const onFailure = (res) => {
        console.log("[Login failed] res:", res);
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: "100px" }}
                isSignedIn={true}
            />
        </div>
    )

}

export default LoginGG;
