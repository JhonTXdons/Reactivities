import React, {useState, useEffect, Fragment}from 'react';
import logo from './logo.svg';


import axios from 'axios';
import { Header, Icon, List, Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDasboard from '../../features/activities/dashboard/ActivityDasboard';

interface IState{
  activities: IActivity[];
}

const App = () =>{
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelecetedActivity] = useState<IActivity | null>(null);

  const handleSelectActivity = (id: string) =>{
    setSelecetedActivity(activities.filter(a => a.id === id)[0])
  }

  useEffect(()=>{
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then((response)=>{
     // console.log(response);
      setActivities(response.data)
      });
    }, []);
  
    return (
      <Fragment>
        <NavBar/>
        <Container style={{marginTop: '7em'}}>
          <List>
            <ActivityDasboard 
            activities={activities} 
            selectActivity={handleSelectActivity}
            selectedActivity={selectedActivity}/>
          </List>       
        </Container>
      </Fragment>
    );
  //}
}
  

export default App;
