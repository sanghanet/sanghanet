import React from 'react';

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.container = null;
        this.state = { list: null };
        this.fetchData = this.fetchData.bind(this);
        this.printUserList = this.printUserList.bind(this);
    }

    render () {
        return (
            <div>
                <button onClick = {this.fetchData}>List users</button>
                <div>{this.state.list}</div>
            </div>);
    }

    fetchData () {
        fetch('http://localhost:4000/userList', { method: 'GET' })
            .then((res) => {
                return res.json();
            }).then((data) => {
                this.printUserList(data);
            });
    }

    printUserList (userArray) {
        const result = userArray.map((value, index) => {
            return (<div key={index}>
                {index} {value.first_name} {value.last_name}
            </div>);
        });

        this.setState({ list: result });
    }
}

export default Home;
