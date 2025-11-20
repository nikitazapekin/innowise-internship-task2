import { Button } from "@mui/material";

import { useAppDispatch } from "@store/redux";
import { clearAll } from "@store/slices/auth";

const CardsPage = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(clearAll());
  };

  return (
    <>
      Cards
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default CardsPage;
