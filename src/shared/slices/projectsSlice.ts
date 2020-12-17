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
    description: 'Duis fringilla, tellus bibendum tristique sodales, arcu nibh suscipit nunc, eget cursus justo mauris sed urna.',
  },
];

const initialState: Projects = {
    projects: null,
    selectedProject: projects[3],
}

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
          console.log('Old img : ', state.selectedProject.image);
          state.selectedProject.image = action.payload;
          console.log('New img : ', state.selectedProject.image);
        },
        projectUpdatedName: (state: Projects, action: PayloadAction<string>) => {
          console.log('Old name : ', state.selectedProject.name);
          state.selectedProject.name = action.payload;
          console.log('New name : ', state.selectedProject.name);
        },
        projectUpdatedDescription: (state: Projects, action: PayloadAction<string>) => {
          console.log('Old description : ', state.selectedProject.description);
          state.selectedProject.description = action.payload;
          console.log('New description : ', state.selectedProject.description);
        },
        newProjectAdded: () => {
            //Code
        },
    }
});

export const {
    projectUpdatedImage,
    projectUpdatedName,
    projectUpdatedDescription,
    newProjectAdded,
    selectProject,
} = projectsSlice.actions;

export const selectedProject = (state: RootState) => state.projects.selectedProject;

export default projectsSlice.reducer;