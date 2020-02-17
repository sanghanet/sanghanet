import React from "react";

class Loading extends React.Component {
    componentDidMount () {
        fetch("/api/user", { method: "POST" })
            .then((res) => {
                if (res.ok) { return res.json(res.body); }
            })
            .then((user) => {
                if (user.name && user.isActive) {
                    sessionStorage.setItem("user", user.name);
                    sessionStorage.setItem("isActive", user.isActive);
                    sessionStorage.setItem("isAdmin", user.isAdmin);
                    window.location.href = "/personal";
                } else {
                    window.location.href = "/loginfailed";
                }
            })
            .catch((err) => {
                console.log(err.message);
                window.location.href = "/";
            });
    }

    render () {
        return (
            <h1>LOADING...</h1>
        );
    }
};

export default Loading;
