import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Settings.scss';
import Select from 'react-select';
import userPlaceholder from './user.svg'
import editIcon from './edit.svg'
import imagePlaceholder from './placeholderImg.svg'
import { projects } from '../ProjectsList/ProjectsList'
import { selectProject } from '../../../../shared/slices/projectsSlice';

const Settings = () => {
  const dispatch = useDispatch();

  const [imgPreview, setImgPreview] = useState(null);

  const selectOptions = [
    {value: 'Programmer', label: 'Programmer'},
    {value: 'Writer', label: 'Writer'},
    {value: 'Publisher', label: 'Publisher'},
  ]

  //Get random project to display as selected
  var project = projects[Math.floor(Math.random() * projects.length)];
  
  const imageSelect = (e: any) => {
    const selectedImage = e.target.files[0];
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg', 'image/svg+xml'];
    if(selectedImage && ALLOWED_TYPES.includes(selectedImage.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(selectedImage);
      }
      reader.readAsDataURL(selectedImage);
      console.log(e);
    }
    else {
      alert('File not supprted');
    }
  }

  return( 
    <div className="settings__wrapper">
      <button className="settings__button" onClick={() => dispatch(selectProject(project))}>TEST</button>
      <h1 className="settings__heading">Project settings</h1>

      <div className="settings__row">
        <div>
          {/* TODO: fix dynamic image source based on state*/}
          <img src={imgPreview ? imgPreview : imagePlaceholder} alt="placeholder image" className="settings__placeholder-img"/>
          {
            imgPreview
            ? <button className="settings__button" onClick={() => {setImgPreview(null); console.log(imgPreview);}}>Remove</button>
            : <input type="file" id="settings__image-file" onChange={imageSelect}/> //electron way (image)
          }
        </div>
        <form id="settings__project-name" className="settings__column">
          <label htmlFor="project-name">Project name</label>
          <input className="text-field" type="text" name="project-name" placeholder="Name" value={project.name}/>
          <button className="settings__button"><img src={editIcon} className="settings__edit-icon"/></button>
        </form>
      </div>

      <div className="settings__row">
        <form id="settings__project-description" className="settings__column">
          <label htmlFor="project-description">Project description</label>
          <textarea className="text-field" name="project-description" placeholder="Description" rows={8} value={project.description}/>
          <button className="settings__button"><img src={editIcon} className="settings__edit-icon"/></button>
        </form>
      </div>

      <div className="settings__row">
        <form id="settings__project-collaborators" className="settings__column">
          <label htmlFor="username">Add a collaborator</label>
          <div className="settings__row">
            <input className="text-field no-margin" type="text" placeholder="enter username" name="username"/>
            <Select options={selectOptions} className="settings__select-colaborator" placeholder="choose a role"/>
            <button className="settings__button">ADD</button>
          </div>
        </form>
      </div>

      <div className="settings__row">
        <div className="settings__colaborators-list-wrapper settings__column">
          <label>Collaborators</label>
          <ul className="settings__colaborators-list">
            <li>
              <img src={userPlaceholder} alt="collaborator icon"/>
              <span>Username</span>
              <span>Role</span>
              <button className="settings__button">X</button>
            </li>
            <li>
              <img src={userPlaceholder} alt="collaborator icon"/>
              <span>Username</span>
              <span>Role</span>
              <button className="settings__button">X</button>
            </li>
            <li>
              <img src={userPlaceholder} alt="collaborator icon"/>
              <span>Username</span>
              <span>Role</span>
              <button className="settings__button">X</button>
            </li>
            <li>
              <img src={userPlaceholder} alt="collaborator icon"/>
              <span>Username</span>
              <span>Role</span>
              <button className="settings__button">X</button>
            </li>
            <li>
              <img src={userPlaceholder} alt="collaborator icon"/>
              <span>Username</span>
              <span>Role</span>
              <button className="settings__button">X</button>
            </li>
            <li>
              <img src={userPlaceholder} alt="collaborator icon"/>
              <span>Username</span>
              <span>Role</span>
              <button className="settings__button">X</button>
            </li>
            <li>
              <img src={userPlaceholder} alt="collaborator icon"/>
              <span>Username</span>
              <span>Role</span>
              <button className="settings__button">X</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
