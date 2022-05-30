const reducer = (state, { type, payload: { name, value } }) => {
  let selected = new Set(state[name].selected);
  switch (type) {
    case 'add':
      selected.add(value);
      return {
        ...state,
        [name]: {
          ...state[name],
          selected: selected,
        },
      };
    case 'remove':
      selected.delete(value);
      return {
        ...state,
        [name]: {
          ...state[name],
          selected: selected,
        },
      };
    case 'only':
      return {
        ...state,
        [name]: {
          ...state[name],
          selected: new Set([value]),
        },
      };
    case 'toggleShow':
      return {
        ...state,
        [name]: {
          ...state[name],
          show: !state[name].show,
        },
      };
    default:
      throw new Error('Unknown type ' + type);
  }
};

export default reducer;
