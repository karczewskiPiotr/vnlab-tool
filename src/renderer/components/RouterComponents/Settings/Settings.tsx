import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Settings.scss';
import Select from 'react-select';
import { newCollaboratorAdded, projectUpdatedDescription, projectUpdatedImage, projectUpdatedName, selectedProject, Author } from '../../../../shared/slices/projectsSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const currentProject = useSelector(selectedProject);

  const [imgPreview, setImgPreview] = useState(null);
  const [isCollaboratorAdded, setIsCollaboratorAdded] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [projectDescription, setProjectDescription] = useState(null);
  const [collaboratorName, setCollaboratorName] = useState(null);
  const [collaboratorRole, setCollaboratorRole] = useState(null);

  const selectOptions = [
    {value: 'Programmer', label: 'Programmer'},
    {value: 'Writer', label: 'Writer'},
    {value: 'Publisher', label: 'Publisher'},
  ]
  
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

  const updateProject = ( projName: string, projDesc : string) => {
    if(projName === null) {
      dispatch(projectUpdatedDescription(projDesc));
    }
    else if(projDesc === null) {
      dispatch(projectUpdatedName(projName));
    }
    else {
      dispatch(projectUpdatedName(projName));
      dispatch(projectUpdatedDescription(projDesc));
    }
  }

  const addColaborator = (collaborator: Author) => {
    dispatch(newCollaboratorAdded(collaborator));
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
            <input className="text-field" type="text" name="project-name" placeholder="Name" defaultValue={currentProject.name} onChange={(e) => setProjectName(e.target.value)}/>
          </form>
          <h3 className="settings__subheading">Project description:</h3>
          <form id="settings__project-description">
          <textarea className="text-field" name="project-description" placeholder="Description" rows={20} defaultValue={currentProject.description} onChange={(e) => setProjectDescription(e.target.value)}/>
        </form>
        </div>
      </div>
      <hr />
      <div className="settings__row">
          <h3 className="settings__subheading">Collaborators:</h3>
          <div className="settings__colaborators-list-wrapper">
            <table className="settings__colaborators-list">
              <tbody>
                <tr>
                  <th></th>
                  <th>Username</th>
                  <th>Role</th>
                  <th></th>
                </tr>
                {
                  currentProject.coauthors.map((collaborator) => (
                    <tr key={collaborator.name}> 
                      <td><img src={collaborator.avatar} alt="collaborator icon"/></td>
                      <td><span>{collaborator.name}</span></td>
                      <td><span>{collaborator.role}</span></td>
                      <td><button className="settings__outlined-button">X</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {
              isCollaboratorAdded
              ? (<form id="settings__project-collaborators">
                  <input className="text-field" type="text" placeholder="Username..." name="username" onChange={(e) => setCollaboratorName(e.target.value)}/>
                  <Select options={selectOptions} className="settings__select-colaborator" placeholder="Role:" onChange={(e) => setCollaboratorRole(e.value)}/>
                  <button onClick={(e) => {e.preventDefault; setIsCollaboratorAdded(false); addColaborator({name: collaboratorName, role: collaboratorRole, avatar: 'https://picsum.photos/300'})}} className="settings__button">ADD</button>
                </form>)
              : <button onClick={() => setIsCollaboratorAdded(true)} className="settings__button settings__add-colaborator">Add a collaborator</button>
            }
        </div>
      </div>
      <hr />
      <div className="settings__row">
        <button onClick={() => {updateProject(projectName, projectDescription)}} className="settings__button settings__button-primary">SAVE CHANGES TO PROJECT SETTINGS</button>
      </div>
    </div>
  );
};

export default Settings;