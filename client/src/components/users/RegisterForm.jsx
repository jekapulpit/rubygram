import React from 'react';
import * as yup from 'yup';
import TextInput from "./TextInput";
import {registerUser} from "../../services/authentificationService";
import '../../stylesheets/inputs.scss';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            fields: {
                email: '',
                username: '',
                password: '',
            },
            errors: {},
        };
        this.testValidationSchema = yup.object().shape({
            email: yup.string().required('email should be required'),
            username: yup.string().required('username should be required'),
            password: yup.string().required('password should be required').min(6),
        });
        this.handleValidate = this.handleValidate.bind(this);
        this.onPropertyChange = this.onPropertyChange.bind(this);
        this.onPropertyChange = this.onPropertyChange.bind(this)
    }

    onPropertyChange = (prop) => {
        let newFields = this.state.fields;
        newFields[prop.name] = prop.value;
        this.setState({
            fields: newFields
        });
    };

    setError = (key, value) => {
        let newErrors = this.state.errors;
        newErrors[key] = value;
        this.setState({
            errors: newErrors,
            disabled: true
        });
    };

    removeError = (key) => {
        let newErrors = this.state.errors;
        delete newErrors[key];
        this.setState({
            errors: newErrors,
            disabled: (Object.keys(newErrors).length !== 0)
        });
    };

    handleValidateAll = (e) => {
        let isValid;
        try {
            this.testValidationSchema.validateSync(this.state.fields);
            isValid = true;
        }
        catch(err) {
            this.setError(err.path, err.message);
            e.preventDefault();
            isValid = false;
        }
        try {
            this.props.onSubmit()
        } catch(err) {
            console.log('no custom handler')
        }
        return isValid;
    };

    handleValidate = (e) => {
        this.testValidationSchema.fields[e.name].validate(e.input.value).then(res => {
            this.removeError(e.name)
        }).catch(res => {
            this.setError(e.name, res.message);
        });
   };

    render() {
        return (
             <form className="user-form" onSubmit={(e) => {
                 if(this.handleValidateAll(e))
                    registerUser(this.state.fields);
                 e.preventDefault();
             }} style={{width: '500px'}}>
                  <TextInput  name="email"
                              type="text"
                              onPropertyChange={this.onPropertyChange}
                              initivalValue={this.state.email}
                              error={this.state.errors.email}
                              placeholder="enter your E-mail"
                              handleValidate={this.handleValidate}
                  />
                  <TextInput  name="username"
                              type="text"
                              onPropertyChange={this.onPropertyChange}
                              initivalValue={this.state.username}
                              error={this.state.errors.username}
                              placeholder="enter your username"
                              handleValidate={this.handleValidate}
                  />
                 <TextInput  name="password"
                             type="password"
                             onPropertyChange={this.onPropertyChange}
                             initivalValue={this.state.password}
                             error={this.state.errors.password}
                             placeholder="enter your password"
                             handleValidate={this.handleValidate}
                 />
                 <button className="btn neutral"
                         disabled={this.state.disabled}
                         style={{width: '150px', alignSelf: 'center'}}
                         id="form-submit-btn"
                         type="submit">Sing Up</button>
                 <a className="clickable-link"
                    style={{alignSelf: 'center'}}
                    href="/login">log in</a>
             </form>
        )
    }
}

export default RegisterForm;
