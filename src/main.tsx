
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import './index.css';
import 'react-quill/dist/quill.snow.css'; 
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
    <GoogleOAuthProvider
    clientId="395770228039-voasgn71gosjndqo21msp5885qj3knq4.apps.googleusercontent.com">
    <Provider store={store}>
        <App />
    </Provider>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);