import React, {useState, useEffect, Fragment, SyntheticEvent, useContext}from 'react';

import {List, Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDasboard from '../../features/activities/dashboard/ActivityDasboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite';

interface IState{
  activities: IActivity[];
}

const App = () =>{
  const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');


  const handleSelectActivity = (id: string) =>{
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  //Gestisce la creazione di una Nuova attività
  const handleCreateActivity = (activity: IActivity) => { 
    setSubmitting(true);
    agent.Activities.create(activity).then(()=> {
      setActivities([...activities, activity])
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false)).catch(function (error) {
      console.log(error);
  });
  }

  //Gestisce la modifica dell'attività selezionata
  const handleEditActivity = (activity: IActivity) => { 
    setSubmitting(true);
    agent.Activities.update(activity).then(()=> {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
    })
    .then(() => setSubmitting(false))
    .catch(function (error) {
      console.log(error);
  });
  }

  //Gestisce l'eliminazione della Attività selezionata
  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>,id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(()=> {
    setActivities([...activities.filter(a => a.id !== id)])
    })
    .then(() => setSubmitting(false))
    .catch(function (error) {
      console.log(error);
  })
  }

  useEffect(()=>{
      activityStore.loadActivities();
    }, [activityStore]);
  
    if (activityStore.loadingInitials) return <LoadingComponent content ='Loading Activities...'/>

    return (
      <Fragment>
        <NavBar openCreateForm ={handleOpenCreateForm}/>
        <Container style={{marginTop: '7em'}}>
          <List>
            <ActivityDasboard
            activities={activityStore.activities} 
            selectActivity={handleSelectActivity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
            createActivity={handleCreateActivity}
            editActivity={handleEditActivity}
            deleteActivity={handleDeleteActivity}
            submitting = {submitting}
            target = {target}/>
          </List>       
        </Container> 
      </Fragment>
    );
}
  

export default observer(App);
