import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. Load the auth user
  const { user, isAuthenticated, isLoading } = useUser();

  //2. If no auth user redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  //3. if there is a user render the app
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. if ther is a user render the app
  if (isAuthenticated) return children;
  return null;
}

export default ProtectedRoute;
