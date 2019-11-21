import {observable, action} from 'mobx';
import { createContext } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

class ActivityStore{
    @observable activities: IActivity[] = [];
    @observable loadingInitials = false;
    @observable selectedActivity: IActivity | undefined = undefined;
    @observable editMode = false;

    @action loadActivities = () => {
        this.loadingInitials = true;
        agent.Activities.list()
        .then(activities=>{
          activities.forEach(activity => {
            activity.date = activity.date.split('.')[0];
            this.activities.push(activity);
          })
        }).finally(()=> this.loadingInitials =false);
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
        this.editMode = false;
    }
}

export default createContext(new ActivityStore())