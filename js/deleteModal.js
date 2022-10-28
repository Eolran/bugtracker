const DeleteModal = document.getElementById('DeleteModal')
DeleteModal.addEventListener('show.bs.modal', event => {
  const deleteButton = event.relatedTarget
  const recipient = deleteButton.getAttribute('data-bs-whatever')
  const modalButton = document.querySelector('#deleteButton')

  modalButton.setAttribute("onclick", `Delete(${recipient})`)
})