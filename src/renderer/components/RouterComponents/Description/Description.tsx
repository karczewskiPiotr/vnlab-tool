import React from 'react';
import './Description.scss';
import { useDispatch, useSelector } from 'react-redux';
import { acUserToken, selectCurrentUser } from '../../../../shared/slices/currentUserSlice';
import { getUserOctokitData } from '../../../../main/git/gitCurrentUser';
import {
  installGatsbyCLI,
  selectGatsbyInstallStatus,
} from '../../../../shared/slices/gatsbyInstallSlice';

const Description = () => {
  const currentUser = useSelector(selectCurrentUser);
  const gatsbyInstallStuff = useSelector(selectGatsbyInstallStatus);

  // log user to showcase state changes if you don't have Redux Tools
  console.log(currentUser);
  console.log(gatsbyInstallStuff);

  const dispatch = useDispatch();
  return (
    <div>
      <h1 className='hello'>Hello World!</h1>
      <p className='description'>Welcome to your Electron application.</p>
      <button onClick={() => dispatch(installGatsbyCLI())}>
        Install gatsby-cli
      </button>
      { <button onClick={() => console.log(getUserOctokitData(acUserToken))}>Display user data</button>}
    </div>
  );
};

export default Description;
