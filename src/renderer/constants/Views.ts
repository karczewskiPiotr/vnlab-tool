/**
 * DO NOT MOVE THIS INTO RouterComponents.ts
 * The app will crash for some reason with
 * ReferenceError: $RefreshSig$ is not defined
 */
export enum Views {
  PROJECT = 'PROJECT',
  FILES = 'FILES',
  CHANGES = 'CHANGES',
  SETTINGS = 'SETTINGS',

  PROJECTS_LIST = 'PROJECTS_LIST',
  APP_SETTINGS = 'APP_SETTINGS',
}


export enum Subviews {
  PROJECT_INFO = 'PROJECT_INFO',
  NONE = 'NONE'
}