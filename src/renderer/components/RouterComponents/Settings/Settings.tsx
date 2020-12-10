import React from 'react';
import { useDispatch } from 'react-redux';
import './Settings.scss';
import Select from 'react-select';
import userPlaceholder from './user.svg'
import imagePlaceholder from './placeholderImg.svg'

const Settings = () => {
  const dispatch = useDispatch();

  const selectOptions = [
    {value: 'Programmer', label: 'Programmer'},
    {value: 'Writer', label: 'Writer'},
    {value: 'Publisher', label: 'Publisher'},
  ]

  return( 
    <div className="settings__wrapper">
      <h1 className="settings__heading">Project settings</h1>

      <div className="settings__row">
        <div>
          {/* TODO: dynamic image source */}
          <img src={imagePlaceholder} alt="placeholder image" className="settings__placeholder-img"/>
          <input type="file" id="settings__image-file" />
        </div>
        <form id="settings__project-name" className="settings__column">
          <label htmlFor="project-name">Project name</label>
          <input className="text-field" type="text" name="project-name" placeholder="Name"/>
        </form>
      </div>

      <div className="settings__row">
        <form id="settings__project-description" className="settings__column">
          <label htmlFor="project-description">Project description</label>
          <textarea className="text-field" name="project-description" placeholder="Description" rows={8}/>
        </form>
      </div>

      <div className="settings__row">
        <form id="settings__project-collaborators" className="settings__column">
          <label htmlFor="username">Add a collaborator</label>
          <div className="settings__row">
            <input className="text-field" type="text" placeholder="enter username" name="username"/>
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
