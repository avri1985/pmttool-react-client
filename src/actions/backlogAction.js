import axios from "axios";
import {
  GET_ERRORS,
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK
} from "./types";
import { async } from "q";

export const addProjectTask = (
  project_iden,
  project_task,
  history
) => async dispatch => {
  try {
    await axios.post(`/api/backlog/${project_iden}`, project_task);
    history.push(`/projectBoard/${project_iden}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getBacklog = project_iden => async dispatch => {
  try {
    const res = await axios.get(`/api/backlog/${project_iden}`);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getProjectTask = (
  project_iden,
  sequence,
  history
) => async dispatch => {
  try {
    const res = await axios.get(`/api/backlog/${project_iden}/${sequence}`);
    dispatch({
      type: GET_PROJECT_TASK,
      payload: res.data
    });
  } catch (err) {
    history.push("/dashboard");
  }
};

export const updateProjectTask = (
  project_iden,
  sequence,
  project_task,
  history
) => async dispatch => {
  try {
    await axios.patch(`/api/backlog/${project_iden}/${sequence}`, project_task);
    history.push(`/projectBoard/${project_iden}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteProjectTask = (project_iden, sequence) => async dispatch => {
  // if (
  //   window.confirm(
  //     `You are deleting Project Task ${sequence}, this action cannot be undone!`
  //   )
  // ) {
  await axios.delete(`/api/backlog/${project_iden}/${sequence}`);
  dispatch({
    type: DELETE_PROJECT_TASK,
    payload: sequence
  });
  // }
};
