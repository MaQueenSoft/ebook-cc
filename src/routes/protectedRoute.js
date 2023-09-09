
import { supabase } from '../supabase';
import { Outlet, Navigate } from 'react-router-dom';
import DashboardLayout from "../layout/dashboardLayout";
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {

  const user = localStorage.getItem("auth-token");

  return user ?
  <DashboardLayout>
      <Outlet /> 
  </DashboardLayout> :
  <Navigate to="/login" />;

};

export default ProtectedRoute;
