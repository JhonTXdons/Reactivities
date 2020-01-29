import React, { useEffect, Fragment, useContext}from 'react';
import {List, Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDasboard from '../../features/activities/dashboard/ActivityDasboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite';

interface IState{
  activities: IActivity[];
}

const App = () =>{
  const activityStore = useContext(ActivityStore);

  useEffect(()=>{
      activityStore.loadActivities();
    }, [activityStore]);
  
    if (activityStore.loadingInitials) return <LoadingComponent content ='Loading Activities...'/>

    return (
      <Fragment>
        <NavBar/>
        <Container style={{marginTop: '7em'}}>
          <List>
            <ActivityDasboard/>
          </List>       
        </Container> 
      </Fragment>
    );
}
  

export default observer(App);
