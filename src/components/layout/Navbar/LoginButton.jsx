import { NavLink } from 'react-router-dom';
import { Button } from '@heroui/react';
import PATHS from '../../../constants/paths.js';

const LoginButton = () => (
  <Button
    as={NavLink}
    to={PATHS.AUTH.LOGIN}
    radius="lg"
    size="md"
    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 px-8 text-base"
  >
    Login
  </Button>
);
export default LoginButton;
