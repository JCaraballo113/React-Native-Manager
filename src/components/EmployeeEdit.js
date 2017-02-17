import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { text } from 'react-native-communications';
import { Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';


class EmployeeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onTextPress = this.onTextPress.bind(this);
        this.onAccept = this.onAccept.bind(this);
        this.onDecline = this.onDecline.bind(this);
        this.state = { showModal: false };
    }

    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    }

    onButtonPress() {
        const { name, phone, shift } = this.props;
        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
    }

    onTextPress() {
        const { phone, shift } = this.props;

        text(phone, `Your upcoming shift is on ${shift}`);
    }

    onAccept() {
        this.setState({ showModal: false });
        this.props.employeeDelete(this.props.employee);
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    render() {
        const { name } = this.props;

        return (
            <Card>
                <EmployeeForm />
                <CardSection>
                    <Button onPress={this.onButtonPress}>
                        Save Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onTextPress}>
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                        Fire {name}?
                    </Button>
                </CardSection>

                <Confirm
                onAccept={this.onAccept}
                onDecline={this.onDecline}
                visible={this.state.showModal}
                >
                    Are you sure you want to delete this?
                </Confirm>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return {
        name,
        phone,
        shift
    };
};

export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit);
