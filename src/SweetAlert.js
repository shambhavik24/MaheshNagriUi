// SweetAlert.js
import Swal from 'sweetalert2';

const SweetAlert = (message, type) => {
  Swal.fire({
    icon: type === 'success' ? 'success' : 'error',
    title: type === 'success' ? 'Success' : 'Error',
    text: message,
    confirmButtonText: 'OK',
  });
};

export default SweetAlert;
