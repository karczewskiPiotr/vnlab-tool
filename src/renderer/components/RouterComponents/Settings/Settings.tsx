import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Settings.scss';
import Select from 'react-select';
import userPlaceholder from './user.svg'
import editIcon from './edit.svg'
import imagePlaceholder from './placeholderImg.svg'
import { projectCollaboratorsName, projectCollaboratorsRole, projectCollaboratorsAvatar, projectUpdatedDescription, projectUpdatedImage, projectUpdatedName, selectedProject } from '../../../../shared/slices/projectsSlice';

const Settings = () => {
  const dispatch = useDispatch();

  const [imgPreview, setImgPreview] = useState(null);

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
          
          
            <li>
            <img src={userPlaceholder} alt="collaborator icon"/><button>DELETE COLLABORATOR</button> <br />
          <span><input className="text-field" name="author-name" placeholder="Name" defaultValue={"name one"} onChange={(e) => dispatch(projectCollaboratorsName(e.target.value))}/></span>
          <span><input className="text-field" name="author-role" placeholder="Role" defaultValue={"programmer"} onChange={(e) => dispatch(projectCollaboratorsRole(e.target.value))}/></span>
          <span><input className="text-field" name="author-avatar" placeholder="Avatar" defaultValue={"avatar one"} onChange={(e) => dispatch(projectCollaboratorsAvatar(e.target.value))}/></span>
            </li>
            <li>
            <img src={userPlaceholder} alt="collaborator icon"/><button>DELETE COLLABORATOR</button> <br />
          <span><input className="text-field" name="author-name" placeholder="Name" defaultValue={"name two"} onChange={(e) => dispatch(projectCollaboratorsName(e.target.value))}/></span>
          <span><input className="text-field" name="author-role" placeholder="Role" defaultValue={"writer"} onChange={(e) => dispatch(projectCollaboratorsRole(e.target.value))}/></span>
          <span><input className="text-field" name="author-avatar" placeholder="Avatar" defaultValue={"avatar two"} onChange={(e) => dispatch(projectCollaboratorsAvatar(e.target.value))}/></span>
            </li>
            <li>
            <img src={userPlaceholder} alt="collaborator icon"/><button>DELETE COLLABORATOR</button> <br />
          <input className="text-field" name="author-name" placeholder="Name" defaultValue={"empty name"} onChange={(e) => dispatch(projectCollaboratorsName(e.target.value))}/>
          <input className="text-field" name="author-role" placeholder="Role" defaultValue={"empty role"} onChange={(e) => dispatch(projectCollaboratorsRole(e.target.value))}/>
          <input className="text-field" name="author-avatar" placeholder="Avatar" defaultValue={"empty avatar"} onChange={(e) => dispatch(projectCollaboratorsAvatar(e.target.value))}/>
            </li>
            <li>
            <img src={userPlaceholder} alt="collaborator icon"/><button>DELETE COLLABORATOR</button> <br />
          <span><input className="text-field" name="author-name" placeholder="Name" defaultValue={"empty name"} onChange={(e) => dispatch(projectCollaboratorsName(e.target.value))}/></span>
          <span><input className="text-field" name="author-role" placeholder="Role" defaultValue={"empty role"} onChange={(e) => dispatch(projectCollaboratorsRole(e.target.value))}/></span>
          <span><input className="text-field" name="author-avatar" placeholder="Avatar" defaultValue={"empty avatar"} onChange={(e) => dispatch(projectCollaboratorsAvatar(e.target.value))}/></span>
            </li>
            <li>
            <img src={userPlaceholder} alt="collaborator icon"/><button>DELETE COLLABORATOR</button> <br />
          <span><input className="text-field" name="author-name" placeholder="Name" defaultValue={"empty name"} onChange={(e) => dispatch(projectCollaboratorsName(e.target.value))}/></span>
          <span><input className="text-field" name="author-role" placeholder="Role" defaultValue={"empty role"} onChange={(e) => dispatch(projectCollaboratorsRole(e.target.value))}/></span>
          <span><input className="text-field" name="author-avatar" placeholder="Avatar" defaultValue={"empty avatar"} onChange={(e) => dispatch(projectCollaboratorsAvatar(e.target.value))}/></span>
            </li>

            
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
         
          <button className="settings__button">Add a collaborator</button>
        </div>
          {/* <form id="settings__project-collaborators">
            <input className="text-field" type="text" placeholder="Username..." name="username"/>
            <Select options={selectOptions} className="settings__select-colaborator" placeholder="Role:"/>
            <button className="settings__button">ADD</button>
          </form> */}
        </div>
      </div>
   
  );
};

export default Settings;
