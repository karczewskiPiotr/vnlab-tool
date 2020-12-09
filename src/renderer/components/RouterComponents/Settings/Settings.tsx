import React from 'react';
import { useDispatch } from 'react-redux';
import './Settings.scss';
import Select from 'react-select';
import userPlaceholder from './user.svg'

const Settings = () => {
  const dispatch = useDispatch();

  const selectOptions = [
    {value: 'Programmer', label: 'Programmer'},
    {value: 'Writer', label: 'Writer'},
    {value: 'Publisher', label: 'Publisher'},
  ]

  return( 
    <div className="settings__wrapper column">
      <h1 className="settings__heading">Project settings</h1>
      <div className="row">
        <div className="settings__add-image">
          {/* TODO: dynamic image source */}
          <img src="https://placeholder.pics/svg/150" alt="placeholder image" className="settings__placeholder-img"/>
          <input type="file" id="image-file" />
        </div>
        <form>
          <label htmlFor="project-name">Project name</label>
          <input type="text" name="project-name" placeholder="Name"/>
        </form>
      </div>
      <div className="row">
        <form>
          <label htmlFor="project-description">Project description</label>
          <textarea name="project-description" placeholder="Description"/>
        </form>
      </div>
      <div className="row">
        <form>
          <label htmlFor="username">Add a collaborator</label>
          <input type="text" placeholder="enter username" name="username"/>
          <Select options={selectOptions} className="settings__select-colaborator" placeholder="choose a role"/>
        </form>
      </div>
      <div className="row">
        <h2>Collaborators</h2>
        <div className="settings__colaborators-list">
          <ul>
            <li>
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
            </li>
            <li>
              <img src={userPlaceholder} alt="collaborator icon"/>
              <span>Username</span>
              <span>Role</span>
              <button>X</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
