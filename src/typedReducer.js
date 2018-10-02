import update from 'immutability-helper';

export const pendingAction = (state, action, property) => update(state, {
        [property]: {
            fetching: { $set: true },
        },
    });

export const rejectedAction = (state, action, property) => {
    const { payload } = action;

    return update(state, {
        [property]: {
            error: { $set: payload },
            fetching: { $set: false },
        },
    });
};

export const fulfilledAction = (state, action, property) => {
    const { payload } = action;

    return update(state, {
        [property]: {
            data: { $set: payload },
            fetched: { $set: true },
            fetching: { $set: false },
        },
    });
};

export default property => ({
    PENDING: (state, action) => pendingAction(state, action, property),
    REJECTED: (state, action) => rejectedAction(state, action, property),
    FULFILLED: (state, action) => fulfilledAction(state, action, property),
});
