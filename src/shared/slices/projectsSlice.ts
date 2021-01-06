import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import userPlaceholder from '../../renderer/components/RouterComponents/Settings/user.svg'
import editIcon from '../../renderer/components/RouterComponents/Settings/edit.svg'
import saveIcon from '../../renderer/components/RouterComponents/Settings/floppy-disk.svg'
import imagePlaceholder from '../../renderer/components/RouterComponents/Settings/placeholderImg.svg'

//TODO: modify projects list after slice is finished
enum State {
    Cloned,
    NotCloned,
}

export type Author = {
    name: string;
    role: any;
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
    coauthors: [
      {name:"", role:"", avatar:""}
    ],
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
    coauthors: [
      {name:"", role:"", avatar:""}
    ],
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
    coauthors: [
      {name:"", role:"", avatar:""}
    ],
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
    coauthors: [
      {name:"", role:"", avatar:""}
    ],
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
    coauthors: [
      {name:"", role:"", avatar:""}
    ],
    description: 'Duis fringilla, tellus bibendum tristique sodales, arcu nibh suscipit nunc, eget cursus justo mauris sed urna.',
  },
];

const initialState: Projects = {
    projects: null,
    selectedProject: projects[3],
}

const au: Author = {
  name:"",
  role:"",
  avatar:""
}

let au2 = Object.create(au);
au2 = {
  name:"",
  role:"",
  avatar:""
}

let n=0;

const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
      
        selectProject: (state: Projects, action: PayloadAction<Project>) => {
          console.log('Project old: ', state.selectedProject);
          state.selectedProject = action.payload;
          console.log('Project new: ', state.selectedProject);
        },
        projectUpdatedImage: (state: Projects, action: PayloadAction<string>) => {
          state.selectedProject.image = action.payload;
        },
        projectUpdatedName: (state: Projects, action: PayloadAction<string>) => {
          state.selectedProject.name = action.payload;
        },
        projectUpdatedDescription: (state: Projects, action: PayloadAction<string>) => {
          state.selectedProject.description = action.payload;
        },
        newProjectAdded: () => {
            //Code
        },
        projectCollaboratorsName: (state: Projects, action: PayloadAction<string>) => {
          
          state.selectedProject.coauthors[0+n].name=action.payload; 
      },
      projectCollaboratorsRole: (state: Projects, action: PayloadAction<string>) => {
        state.selectedProject.coauthors[0+n].role=action.payload;  
        state.selectedProject.coauthors.push(au2);
        n = n+1;
        console.log(console.log(JSON.stringify(state, undefined, 2)));
      },
        // projectCollaboratorsAvatar: (state: Projects, action: PayloadAction<string>) => {
        //   state.selectedProject.coauthors.avatar = action.payload;
        // },
    }
});

export const {
    projectUpdatedImage,
    projectUpdatedName,
    projectUpdatedDescription,
    newProjectAdded,
    projectCollaboratorsName,
    projectCollaboratorsRole,
    selectProject,
} = projectsSlice.actions;

export const selectedProject = (state: RootState) => state.projects.selectedProject;

export default projectsSlice.reducer;