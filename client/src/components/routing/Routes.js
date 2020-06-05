import React from 'react';

import { Route, Switch } from 'react-router-dom';
import ProfilesList from '../profile/ProfilesList';
import Discussion from '../post/Discussion';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import CreateProfile from '../profileForms/CreateProfile';
import EditProfile from '../profileForms/EditProfile';
import AddExperience from '../profileForms/AddExperience';
import AddEducation from '../profileForms/AddEducation';
import PrivateRoute from '../routing/PrivateRoute';
import MainProfile from '../profile/MainProfile';
import PostComponent from '../post/PostComponent';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={ProfilesList} />
        <Route exact path='/main-profile' component={MainProfile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/posts' component={PostComponent} />
        <PrivateRoute exact path='/discussion' component={Discussion} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
