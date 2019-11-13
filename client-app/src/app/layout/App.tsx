import React, {useState, useEffect}from 'react';
import logo from './logo.svg';


import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react'
import { IActivity } from '../models/activity';

interface IState{
  activities: IActivity[];
}

const App = () =>{
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(()=>{
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then((response)=>{
     // console.log(response);
      setActivities(response.data)
      });
    }, []);
  
  //readonly state: IState = {
    // activities: [],
  //}

  //componentDidMount() {
    //axios.get<IActivity[]>('http://localhost:5000/api/activities').then((response)=>{
     // console.log(response);
      //this.setState({
        //activities: response.data
      //})
    //})
  //}
  //render(){
    return (
      <div>
         <Header as='h2'>
          <Icon name='plug' />
            <Header.Content>Uptime Guarantee</Header.Content>
        </Header>
        <List>
        {activities.map((activity)=>(
              <List.Item key ={activity.id}>{activity.title}</List.Item>
            ))}
        </List>         
      </div>
    );
  //}
}
  

export default App;
