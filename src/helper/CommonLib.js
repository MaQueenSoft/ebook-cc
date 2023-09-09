import swal from "sweetalert2";
window.swal = swal;

export const confirmationLib = async (payload) => {
    return new swal({
        title: "Are you sure want to " + payload.Type + "?",
        text: "If you " + payload.Type + " this addres you wont be able to recover it again.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes! " + payload.Type + "",
        closeOnConfirm: false,
    }).then(async (result) => {
        return result;
    });
}