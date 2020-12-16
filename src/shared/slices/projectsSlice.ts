import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createActionMain, createAsyncActionMain } from '../helpers/createActionMain';

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

export type Project = {
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

//What is 'Projects/projectSelected' alias exactly, where to specify it. Returns error
// export const selectProject =  createAsyncActionMain<string>('projectSelected', () => {
//     return async (dispatch) => {
//         const project = projects[Math.floor(Math.random() * projects.length)];
//         dispatch(projectSelected(project));
//         console.log('[Function] Project: ' + project);
//     }
// });

const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        selectProject: (state: Projects, action: PayloadAction<Project>) => {
            state.selectedProject = action.payload;
            console.log('[Reducer] State : ', state.selectedProject);
            console.log('[Reducer] Action payload : ', action.payload);
        },
        projectUpdated: (state: Projects, action: PayloadAction<Project>) => {
            //1 reducer for all updates or multiple for each modification?
        },
        newProjectAdded: () => {
            //Code
        },
    }
});

const projects: Project[] = [
    {
      id: 0,
      image: null,
      name: 'Jaś i Małgosia',
      date_creation: new Date(2018, 10, 31).toString(),
      date_edition: new Date(2018, 10, 31).toString(),
      tags: ['TAG A', 'TAG B'],
      state: State.Cloned,
      last_modified_by: '',
      technologies: [],
      coauthors: [],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 1,
      image: null,
      name: 'Epoka Lodowcowa',
      date_creation: new Date(2018, 12, 31).toString(),
      date_edition: new Date(2018, 10, 30).toString(),
      tags: ['TAG C', 'TAG A', 'TAG D'],
      state: State.Cloned,
      last_modified_by: '',
      technologies: [],
      coauthors: [],
      description: 'Suspendisse non rhoncus augue.',
    },
    {
      id: 2,
      image: null,
      name: 'Kraina Lodu',
      date_creation: new Date(1998, 2, 31).toString(),
      date_edition: new Date(2018, 10, 29).toString(),
      tags: ['TAG C', 'TAG A', 'TAG D'],
      state: State.Cloned,
      last_modified_by: '',
      technologies: [],
      coauthors: [],
      description: 'Maecenas et felis eget velit scelerisque dictum sed vel leo.',
    },
    {
      id: 3,
      image: null,
      name: 'Harry Potter',
      date_creation: new Date(1999, 3, 31).toString(),
      date_edition: new Date(2018, 10, 28).toString(),
      tags: ['TAG C', 'TAG A', 'TAG D'],
      state: State.Cloned,
      last_modified_by: '',
      technologies: [],
      coauthors: [],
      description: 'Etiam ipsum sem, suscipit eu nunc ut, mollis molestie erat.',
    },
    {
      id: 4,
      image: null,
      name: 'Mad Max',
      date_creation: new Date(2018, 12, 31).toString(),
      date_edition: new Date(2018, 10, 27).toString(),
      tags: ['TAG C', 'TAG A', 'TAG D'],
      state: State.NotCloned,
      last_modified_by: '',
      technologies: [],
      coauthors: [],
      description: 'Duis fringilla, tellus bibendum tristique sodales, arcu nibh suscipit nunc, eget cursus justo mauris sed urna. Donec imperdiet ultricies nisl, vitae viverra quam vestibulum a. Aliquam sapien diam, pulvinar ac ex id, feugiat volutpat urna. Integer id fringilla risus, vel sodales tellus. Quisque ac neque metus. Aenean at mi molestie, bibendum est sed, viverra metus. Maecenas mauris est, tincidunt eu nunc in, sodales feugiat massa. Fusce euismod ut ligula in accumsan. Morbi consequat lorem in odio lacinia ultricies. In et nisl et ligula malesuada posuere.',
    },
  ];

export const {
    projectUpdated,
    newProjectAdded,
    selectProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;