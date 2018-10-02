import typeToReducer from 'type-to-reducer';
import typedReducer, { pendingAction, rejectedAction, fulfilledAction, setCustomShape } from '../src/typedReducer';

describe('typedReducer', () => {
  let reducer = null;
  const initialeState = {
    user: {
      data: null,
      fetching: false,
      fetched: false,
      error: null,
    },
  };

  beforeEach(() => {
    reducer = typeToReducer({
      USER_GET: typedReducer('user'),
    }, initialeState);
  });

  it('should handle pending request', () => {
    expect(reducer(
      initialeState,
      {
        type: 'USER_GET_PENDING',
      },
    )).toEqual(
      {
        user: {
          data: null,
          fetching: true,
          fetched: false,
          error: null,
        },
      },
    );
  });

  it('should handle rejected request', () => {
    expect(reducer(
      initialeState,
      {
        type: 'USER_GET_REJECTED',
        payload: 'Error 404: Not found.',
      },
    )).toEqual(
      {
        user: {
          data: null,
          fetching: false,
          fetched: false,
          error: 'Error 404: Not found.',
        },
      },
    );
  });

  it('should handle fulfilled request', () => {
    expect(reducer(
      initialeState,
      {
        type: 'USER_GET_FULFILLED',
        payload: {
          name: 'John',
          surname: 'Doe',
          age: 35,
        },
      },
    )).toEqual(
      {
        user: {
          data: {
            name: 'John',
            surname: 'Doe',
            age: 35,
          },
          fetching: false,
          fetched: true,
          error: null,
        },
      },
    );
  });
});

describe('typedReducer splitted', () => {
  let reducer = null;
  const initialeState = {
    user: {
      data: null,
      fetching: false,
      fetched: false,
      error: null,
    },
  };

  beforeEach(() => {
    reducer = typeToReducer({
      USER_GET: {
        PENDING: (state, action) => pendingAction(state, action, 'user'),
        REJECTED: (state, action) => rejectedAction(state, action, 'user'),
        FULFILLED: (state, action) => fulfilledAction(state, action, 'user'),
      },
    }, initialeState);
  });

  it('should handle pending request', () => {
    expect(reducer(
      initialeState,
      {
        type: 'USER_GET_PENDING',
      },
    )).toEqual(
      {
        user: {
          data: null,
          fetching: true,
          fetched: false,
          error: null,
        },
      },
    );
  });

  it('should handle rejected request', () => {
    expect(reducer(
      initialeState,
      {
        type: 'USER_GET_REJECTED',
        payload: 'Error 404: Not found.',
      },
    )).toEqual(
      {
        user: {
          data: null,
          fetching: false,
          fetched: false,
          error: 'Error 404: Not found.',
        },
      },
    );
  });

  it('should handle fulfilled request', () => {
    expect(reducer(
      initialeState,
      {
        type: 'USER_GET_FULFILLED',
        payload: {
          name: 'John',
          surname: 'Doe',
          age: 35,
        },
      },
    )).toEqual(
      {
        user: {
          data: {
            name: 'John',
            surname: 'Doe',
            age: 35,
          },
          fetching: false,
          fetched: true,
          error: null,
        },
      },
    );
  });
});

describe('typedReducer custom shape', () => {
  let reducer = null;
  const initialeState = {
    user: {
      payload: null,
      isFetching: false,
      isFetched: false,
      errors: null,
    },
  };

  beforeEach(() => {

    const customShape = {
      data: "payload",
      fetching: "isFetching",
      fetched: "isFetched",
      error: "errors",
    };

    setCustomShape(customShape);

    reducer = typeToReducer({
      USER_GET: typedReducer('user'),
    }, initialeState);
  });

  it('should handle pending request', () => {
    expect(reducer(
      initialeState,
      {
        type: 'USER_GET_PENDING',
      },
    )).toEqual(
      {
        user: {
          payload: null,
          isFetching: true,
          isFetched: false,
          errors: null,
        },
      },
    );
  });

  it('should handle rejected request', () => {
    expect(reducer(
      initialeState,
      {
        type: 'USER_GET_REJECTED',
        payload: 'Error 404: Not found.',
      },
    )).toEqual(
      {
        user: {
          payload: null,
          isFetching: false,
          isFetched: false,
          errors: 'Error 404: Not found.',
        },
      },
    );
  });

  it('should handle fulfilled request', () => {
    expect(reducer(
      initialeState,
      {
        type: 'USER_GET_FULFILLED',
        payload: {
          name: 'John',
          surname: 'Doe',
          age: 35,
        },
      },
    )).toEqual(
      {
        user: {
          payload: {
            name: 'John',
            surname: 'Doe',
            age: 35,
          },
          isFetching: false,
          isFetched: true,
          errors: null,
        },
      },
    );
  });
});