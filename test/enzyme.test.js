import App from '../client/src/App.jsx';

describe('<App /> rendering', () => {
  it('check if <App/> is a <div></div>', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.type()).toEqual('div');
  });
});
