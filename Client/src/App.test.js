import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

test('should render app component', () => {
  render(
    <Router>
      <App/>
      </Router>
  );
  const app=screen.getByTestId('app');
  expect(app).toBeTruthy();
})
