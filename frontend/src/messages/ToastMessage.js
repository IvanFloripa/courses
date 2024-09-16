import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
// class ToastMessage  { 
   
//   successMessage (message) {
//     toast.success(message);
//   }

//   errorMessage (message) {
//     toast.error(message);
//   }
  
// } 
  
 const ToastMessage = (action, message) => {
  console.log(message);
  switch (action) {
    case "success":
      console.log(action);
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

export default ToastMessage;
