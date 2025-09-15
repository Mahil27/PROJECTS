let students = JSON.parse(localStorage.getItem('students')) || [];

const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
const searchInput = document.getElementById('search');

function renderStudents(list = students) {
  studentList.innerHTML = '';
  list.forEach(student => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.grade}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editStudent('${student.id}')">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteStudent('${student.id}')">Delete</button>
      </td>
    `;
    studentList.appendChild(tr);
  });
}

function saveStudents() {
  localStorage.setItem('students', JSON.stringify(students));
}

studentForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('studentId').value;
  const name = document.getElementById('name').value.trim();
  const age = document.getElementById('age').value.trim();
  const grade = document.getElementById('grade').value.trim();

  if (!name || !age || !grade) return;

  if (id) {
    // Update existing
    const index = students.findIndex(s => s.id === id);
    students[index] = { id, name, age, grade };
  } else {
    // Add new
    const student = { id: Date.now().toString(), name, age, grade };
    students.push(student);
  }

  saveStudents();
  renderStudents();
  studentForm.reset();
  document.getElementById('studentId').value = '';
});

// Edit function
function editStudent(id) {
  const student = students.find(s => s.id === id);
  document.getElementById('studentId').value = student.id;
  document.getElementById('name').value = student.name;
  document.getElementById('age').value = student.age;
  document.getElementById('grade').value = student.grade;
}

// Delete function
function deleteStudent(id) {
  if (confirm('Are you sure you want to delete this student?')) {
    students = students.filter(s => s.id !== id);
    saveStudents();
    renderStudents();
  }
}

// Search
searchInput.addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(query) ||
    s.grade.toLowerCase().includes(query)
  );
  renderStudents(filtered);
});

// Initial render
renderStudents();
