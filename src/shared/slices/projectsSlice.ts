import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//TODO: modify projects list after slice is finished
enum State {
    Cloned,
    NotCloned,
}

type Author = {
    name: string;
    role: string;
    avatar: string;
}

type Project = {
    id: number;
    image: string;
    name: string;
    date_creation: string;  // Dates have to be serializable, cannot be of type Date
    date_edition: string;
    tags: string[];
    last_modified_by: string;
    description: string;
    technologies: string[];
    coauthors: Author[];
    state: State;
}

type Projects = {
    projects: Project[];
    selectedProject: Project;
}

const initialState: Projects = {
    projects: null,
    selectedProject: null,
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        projectSelected: (state: Projects, action: PayloadAction<Projects>) => {
            //Code here
        },
        projectUpdated: (state: Projects, action: PayloadAction<Projects>) => {
            //1 reducer for all updates or multiple for each modification?
        },
    }
});