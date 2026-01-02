import GECSIWAN_LOGO from '../assets/images/logos/gecsiwanlogo.svg';
import GECSIWAN_LOGO_LIGHT from '../assets/images/logos/gecsiwan-logo-light.png';
import { Button } from '@heroui/react';
import { NavLink } from 'react-router-dom';

export default function Error_404() {
  return (
    <div className="flex max-w-screen-xl m-auto items-center justify-center min-h-[80dvh] bg-transparent">
      <div className="flex flex-col animate-pulse items-center gap-3">
        <img
          src={GECSIWAN_LOGO}
          alt="Loader image "
          className="dark:hidden w-56 h-56 m-auto "
          style={{ userSelect: 'none' }}
        />
        <img
          src={GECSIWAN_LOGO_LIGHT}
          alt="Loader image "
          className="hidden dark:inline-flex w-56 h-56 m-auto "
          style={{ userSelect: 'none' }}
        />
        <p className="animate-pulse text-blue-500 text-3xl pb-10 text-center font-bold">
          404 <br /> Page not found!{' '}
        </p>
        <Button as={NavLink} to="/" varient={'solid'} color="primary">
          Go to Home
        </Button>
      </div>
    </div>
  );
}
