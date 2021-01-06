import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Settings.scss';
import Select from 'react-select';
import userPlaceholder from './user.svg'
import { projectCollaboratorsName, projectCollaboratorsRole, projectUpdatedDescription, projectUpdatedImage, projectUpdatedName, selectedProject } from '../../../../shared/slices/projectsSlice';

const Settings = () => {
  const dispatch = useDispatch();

  const [imgPreview, setImgPreview] = useState(null);
  const [isCollaboratorAdded, setIsCollaboratorAdded] = useState(false);
  const [collaboratorName, setCollaboratorName] = useState(null);
  const [collaboratorRole, setCollaboratorRole] = useState(null);

  const selectOptions = [
    {value: 'Programmer', label: 'Programmer'},
    {value: 'Writer', label: 'Writer'},
    {value: 'Publisher', label: 'Publisher'},
  ]

  const project = useSelector(selectedProject);

  
  const imageSelect = (e: any) => {
    const selectedImage = e.target.files[0];
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg', 'image/svg+xml'];
    if(selectedImage && ALLOWED_TYPES.includes(selectedImage.type)) {
      dispatch(projectUpdatedImage(selectedImage.name))
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(selectedImage);
      }
      reader.readAsDataURL(selectedImage);
    }
    else {
      alert('File not supprted');
    }
  }

  const addColaborator = (name: string, role : string) => {
    dispatch(projectCollaboratorsName(name));
    dispatch(projectCollaboratorsRole(role));
  }

  return(
    <div className="settings__wrapper">
      <div className="settings__row">
        <h1 className="settings__heading">First Publication's Title</h1>
      </div>
      <div className="settings__row">
        <div className="settings__column">
          <h3 className="settings__subheading">Project photo:</h3>
          {/* TODO: fix dynamic image source based on state*/}
          <img src={imgPreview ? imgPreview : 'https://picsum.photos/200'} alt="placeholder image" className="settings__placeholder-img"/>
          {
            imgPreview
            ? <button className="settings__button" onClick={() => {setImgPreview(null); console.log(imgPreview);}}>Remove</button>
            : <input type="file" id="settings__image-file" onChange={imageSelect}/> //electron way (image)
          }
        </div>
        <div className="settings__column">
          <h3 className="settings__subheading">Project name:</h3>
          <form id="settings__project-name">
            <input className="text-field" type="text" name="project-name" placeholder="Name" defaultValue={project.name} onChange={(e) => dispatch(projectUpdatedName(e.target.value))}/>
          </form>
          <h3 className="settings__subheading">Project description:</h3>
          <form id="settings__project-description">
          <textarea className="text-field" name="project-description" placeholder="Description" rows={20} defaultValue={project.description} onChange={(e) => dispatch(projectUpdatedDescription(e.target.value))}/>
        </form>
        </div>
      </div>
      <div className="settings__row">
        <div className="settings__column">
          <h3 className="settings__subheading">Collaborators:</h3>
          <div className="settings__colaborators-list-wrapper">
            <ul className="settings__colaborators-list">
              <li>
                <img src={userPlaceholder} alt="collaborator icon"/>
                <span>Freddy Lichy</span>
                <span>Programmer</span>
                <button className="outlined-button">X</button>
              </li>
            </ul>
            {
              isCollaboratorAdded
              ? (<form id="settings__project-collaborators">
                  <input className="text-field" type="text" placeholder="Username..." name="username" onChange={(e) => setCollaboratorName(e.target.value)}/>
                  <Select options={selectOptions} className="settings__select-colaborator" placeholder="Role:" onChange={(e) => setCollaboratorRole(e.value)}/>
                  <button onClick={(e) => {e.preventDefault; setIsCollaboratorAdded(false); addColaborator(collaboratorName, collaboratorRole)}} className="settings__button">ADD</button>
                </form>)
              : <button onClick={() => setIsCollaboratorAdded(true)} className="settings__button settings__add-colaborator">Add a collaborator</button>
            }
          </div>

            
            {/* <Select options={selectOptions} className="settings__select-colaborator" placeholder="Role:"/> */}
            {/* <li>
              <img src={userPlaceholder} alt="collaborator icon"/>
              <span>Username</span>
              <span>Role</span>
              <button>X</button>
            </li>
            <li>
              <img src={userPlaceholder} alt="collaborator icon"/>
              <span>Username</span>
              <span>Role</span>
              <button>X</button>
            </li> */}
            {/* <li>
              <img src={userPlaceholder} alt="collaborator icon"/>
              <span>Username</span>
              <span>Role</span>
              <button>X</button>
            </li> */}
         
          
        </div>
      </div>
    </div>
   
  );
};

export default Settings;
