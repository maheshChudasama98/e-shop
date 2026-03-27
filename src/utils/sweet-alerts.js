import Swal from 'sweetalert2';

export function sweetAlerts(icon, message) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      container: 'custom-swal-container',
    },
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    icon,
    title: message,
  });
}

export const sweetAlertQuestion = (text, title) =>
  Swal.fire({
    title: title || 'Are you sure?',
    text: text || "You won't be able to revert this!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#ff5630',
    confirmButtonColor: '#52c41a',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      return 'Yes';
    }
    return 'No';
  });

// export const sweetAlertSuccess = (message, title) =>
//   Swal.fire({
//     title: title || 'Success',
//     text: message || 'Operation completed successfully',
//     icon: 'success',
//     confirmButtonText: 'Continue',
//     confirmButtonColor: '#00B8D9',
//   }).then((result) => {
//     if (result.isConfirmed) {
//       return 'Yes';
//     }
//   });

export const sweetAlertSuccess = (message, title) =>
  Swal.fire({
    title: title || 'Success',
    text: message || 'Operation completed successfully',
    icon: 'success',
    timer: 2000, // ⏱ 2 second
    showConfirmButton: false, // ❌ remove button
    timerProgressBar: true,
  });
