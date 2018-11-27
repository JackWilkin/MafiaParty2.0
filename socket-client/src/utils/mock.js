function mockedState(state) {
  var mock = {};
  mock.name = state.name || 'tester';
  mock.owner = state.owner || false;
  mock.game = state.game || "H2XS9G";
  mock.role = state.role || "mafia";
  mock.players = state.players || [
    {
      name: 'jack',
      living: true,
      role: ''
    },
    {
      name: 'chloe',
      living: true,
      role: ''
    },
    {
      name: 'sindhu',
      living: true,
      role: ''
    },
    {
      name: 'zack',
      living: true,
      role: 'mafia'
    }
  ]
  console.log(state);
  console.log(mock);
  return Object.assign(state, mock);
}

export default mockedState;