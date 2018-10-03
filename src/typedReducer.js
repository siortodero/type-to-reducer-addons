import update from 'immutability-helper';

const defaultShape = {
  data: 'data',
  fetching: 'fetching',
  fetched: 'fetched',
  error: 'error',
};

export const setCustomShape = (shape) => {
  if (shape.data) {
    defaultShape.data = shape.data;
  }
  if (shape.fetching) {
    defaultShape.fetching = shape.fetching;
  }
  if (shape.fetched) {
    defaultShape.fetched = shape.fetched;
  }
  if (shape.error) {
    defaultShape.error = shape.error;
  }
};

export const pendingAction = (state, action, property) => update(state, {
  [property]: {
    [defaultShape.fetching]: { $set: true },
  },
});

export const rejectedAction = (state, action, property) => {
  const { payload } = action;

  return update(state, {
    [property]: {
      [defaultShape.error]: { $set: payload },
      [defaultShape.fetching]: { $set: false },
    },
  });
};

export const fulfilledAction = (state, action, property) => {
  const { payload } = action;

  return update(state, {
    [property]: {
      [defaultShape.data]: { $set: payload },
      [defaultShape.fetched]: { $set: true },
      [defaultShape.fetching]: { $set: false },
    },
  });
};

export default property => ({
  PENDING: (state, action) => pendingAction(state, action, property),
  REJECTED: (state, action) => rejectedAction(state, action, property),
  FULFILLED: (state, action) => fulfilledAction(state, action, property),
});
