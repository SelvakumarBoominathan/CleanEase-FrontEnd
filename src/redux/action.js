export const UPDATE_VALUE = "UPDATE_VALUE";

export const updateValue = (newvalue) => ({
  type: UPDATE_VALUE,
  payload: newvalue,
});
