const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");

let editIndex = -1; // Dùng để xác định nếu đang chỉnh sửa ghi chú

window.onload = () => {
  loadNotes();
};

// Thêm hoặc cập nhật ghi chú
addNoteBtn.addEventListener("click", () => {
  const noteText = noteInput.value.trim();
  if (noteText === "") return;

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (editIndex === -1) {
    // Thêm mới
    notes.push(noteText);
  } else {
    // Cập nhật ghi chú
    notes[editIndex] = noteText;
    addNoteBtn.innerText = "Add Note";
    editIndex = -1;
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  noteInput.value = "";
  loadNotes();
});

// Tải và hiển thị danh sách ghi chú
function loadNotes() {
  notesList.innerHTML = "";
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    const noteText = document.createElement("p");
    noteText.innerText = note;

    const btnGroup = document.createElement("div");
    btnGroup.style.marginTop = "10px";

    // Nút Sửa
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.style.marginRight = "10px";
    editBtn.onclick = () => editNote(index);

    // Nút Xóa
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteNote(index);

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deleteBtn);

    noteDiv.appendChild(noteText);
    noteDiv.appendChild(btnGroup);

    notesList.appendChild(noteDiv);
  });
}

// Chức năng xóa ghi chú
function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();

  noteInput.value = "";
  addNoteBtn.innerText = "Add Note";
  editIndex = -1;
}

// Chức năng sửa ghi chú
function editNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  noteInput.value = notes[index];
  editIndex = index;
  addNoteBtn.innerText = "Update Note";
}
